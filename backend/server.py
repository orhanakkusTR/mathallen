from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
STORE_EMAIL = os.environ.get('STORE_EMAIL', 'info@mathallen.se')

# JWT settings
JWT_SECRET = os.environ.get('JWT_SECRET', 'mathallen-secret-key-2024')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

security = HTTPBearer()

# Create the main app
app = FastAPI(title="Mathallen Malmö API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============== MODELS ==============

class AdminUser(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminLogin(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class Offer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_name: str
    original_price: Optional[float] = None
    offer_price: float
    unit: str = "st"
    image_url: Optional[str] = None
    category: str
    week_number: int
    year: int
    is_active: bool = True
    sort_order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class OfferCreate(BaseModel):
    product_name: str
    original_price: Optional[float] = None
    offer_price: float
    unit: str = "st"
    image_url: Optional[str] = None
    category: str
    week_number: int
    year: int
    is_active: bool = True
    sort_order: int = 0

class OfferUpdate(BaseModel):
    product_name: Optional[str] = None
    original_price: Optional[float] = None
    offer_price: Optional[float] = None
    unit: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None
    week_number: Optional[int] = None
    year: Optional[int] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None

class Category(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    image_url: Optional[str] = None
    icon: str = "Package"

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_read: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True

class NewsletterSubscribe(BaseModel):
    email: EmailStr

# Product model for inventory
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    category: Optional[str] = None

class ProductBulkCreate(BaseModel):
    products: List[str]  # List of product names
    category: Optional[str] = None

class ChatQuery(BaseModel):
    query: str

# ============== AUTH HELPERS ==============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, password_hash: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))

def create_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        admin = await db.admins.find_one({"id": user_id}, {"_id": 0})
        if admin is None:
            raise HTTPException(status_code=401, detail="Admin not found")
        return admin
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============== ROUTES ==============

@api_router.get("/")
async def root():
    return {"message": "Välkommen till Mathallen Malmö API"}

# ---- AUTH ----

@api_router.post("/auth/login", response_model=TokenResponse)
async def admin_login(login_data: AdminLogin):
    admin = await db.admins.find_one({"username": login_data.username}, {"_id": 0})
    if not admin or not verify_password(login_data.password, admin["password_hash"]):
        raise HTTPException(status_code=401, detail="Ogiltigt användarnamn eller lösenord")
    token = create_token(admin["id"])
    return TokenResponse(access_token=token)

@api_router.get("/auth/me")
async def get_current_user(admin = Depends(get_current_admin)):
    return {"id": admin["id"], "username": admin["username"]}

# ---- OFFERS ----

@api_router.get("/offers", response_model=List[Offer])
async def get_offers(week: Optional[int] = None, year: Optional[int] = None, active_only: bool = True):
    query = {}
    if week:
        query["week_number"] = week
    if year:
        query["year"] = year
    if active_only:
        query["is_active"] = True
    
    offers = await db.offers.find(query, {"_id": 0}).sort("sort_order", 1).to_list(100)
    for offer in offers:
        if isinstance(offer.get('created_at'), str):
            offer['created_at'] = datetime.fromisoformat(offer['created_at'])
    return offers

@api_router.get("/offers/current", response_model=List[Offer])
async def get_current_offers():
    now = datetime.now(timezone.utc)
    current_week = now.isocalendar()[1]
    current_year = now.year
    
    offers = await db.offers.find(
        {"week_number": current_week, "year": current_year, "is_active": True},
        {"_id": 0}
    ).sort("sort_order", 1).to_list(100)
    
    for offer in offers:
        if isinstance(offer.get('created_at'), str):
            offer['created_at'] = datetime.fromisoformat(offer['created_at'])
    return offers

@api_router.post("/offers", response_model=Offer)
async def create_offer(offer_data: OfferCreate, admin = Depends(get_current_admin)):
    offer = Offer(**offer_data.model_dump())
    doc = offer.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.offers.insert_one(doc)
    return offer

@api_router.put("/offers/{offer_id}", response_model=Offer)
async def update_offer(offer_id: str, offer_data: OfferUpdate, admin = Depends(get_current_admin)):
    update_dict = {k: v for k, v in offer_data.model_dump().items() if v is not None}
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db.offers.update_one({"id": offer_id}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    updated = await db.offers.find_one({"id": offer_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return updated

@api_router.delete("/offers/{offer_id}")
async def delete_offer(offer_id: str, admin = Depends(get_current_admin)):
    result = await db.offers.delete_one({"id": offer_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Offer not found")
    return {"message": "Offer deleted"}

# ---- CATEGORIES ----

@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    categories = await db.categories.find({}, {"_id": 0}).to_list(20)
    if not categories:
        # Return default categories if none exist
        return [
            Category(id="1", name="Färska frukter & grönsaker", description="Handplockade frukter och grönsaker varje dag", image_url="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="Apple"),
            Category(id="2", name="Dagligvaror", description="Allt du behöver för vardagen", image_url="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="ShoppingBasket"),
            Category(id="3", name="Kött & chark", description="Färskt kött och kvalitetschark", image_url="https://images.pexels.com/photos/1927383/pexels-photo-1927383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="Beef"),
            Category(id="4", name="Mejeri", description="Mjölk, ost och andra mejeriprodukter", image_url="https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="Milk"),
            Category(id="5", name="Specialprodukter", description="Unika produkter från hela världen", image_url="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", icon="Sparkles"),
        ]
    return categories

# ---- CONTACT ----

@api_router.post("/contact")
async def submit_contact(contact_data: ContactMessageCreate):
    contact = ContactMessage(**contact_data.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    
    # Send email notification
    if resend.api_key:
        try:
            html_content = f"""
            <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #F97316;">Nytt meddelande från Mathallen webbsida</h2>
                <p><strong>Från:</strong> {contact.name}</p>
                <p><strong>E-post:</strong> {contact.email}</p>
                <p><strong>Telefon:</strong> {contact.phone or 'Ej angiven'}</p>
                <hr style="border: 1px solid #E7E5E4;">
                <p><strong>Meddelande:</strong></p>
                <p style="background: #FAFAF9; padding: 15px; border-radius: 8px;">{contact.message}</p>
                <hr style="border: 1px solid #E7E5E4;">
                <p style="color: #78716C; font-size: 12px;">Skickat: {contact.created_at.strftime('%Y-%m-%d %H:%M')}</p>
            </body>
            </html>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [STORE_EMAIL],
                "subject": f"Kontaktformulär: {contact.name}",
                "html": html_content
            }
            
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(f"Contact email sent for {contact.email}")
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
    
    return {"message": "Tack för ditt meddelande! Vi återkommer så snart vi kan."}

@api_router.get("/contact/messages", response_model=List[ContactMessage])
async def get_contact_messages(admin = Depends(get_current_admin)):
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for msg in messages:
        if isinstance(msg.get('created_at'), str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    return messages

# ---- NEWSLETTER ----

@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(subscription: NewsletterSubscribe):
    """Subscribe to newsletter"""
    # Check if already subscribed
    existing = await db.newsletter.find_one({"email": subscription.email})
    if existing:
        if existing.get('is_active'):
            return {"message": "Du är redan prenumerant på vårt nyhetsbrev!"}
        else:
            # Reactivate subscription
            await db.newsletter.update_one(
                {"email": subscription.email},
                {"$set": {"is_active": True, "subscribed_at": datetime.now(timezone.utc).isoformat()}}
            )
            return {"message": "Välkommen tillbaka! Din prenumeration är nu aktiv igen."}
    
    # Create new subscription
    new_sub = NewsletterSubscription(email=subscription.email)
    doc = new_sub.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    await db.newsletter.insert_one(doc)
    
    logger.info(f"New newsletter subscription: {subscription.email}")
    return {"message": "Tack! Du kommer nu få våra veckokampanjer via e-post."}

@api_router.get("/newsletter/subscribers", response_model=List[NewsletterSubscription])
async def get_newsletter_subscribers(admin = Depends(get_current_admin)):
    """Get all newsletter subscribers (admin only)"""
    subscribers = await db.newsletter.find({"is_active": True}, {"_id": 0}).sort("subscribed_at", -1).to_list(1000)
    for sub in subscribers:
        if isinstance(sub.get('subscribed_at'), str):
            sub['subscribed_at'] = datetime.fromisoformat(sub['subscribed_at'])
    return subscribers

# ---- PRODUCTS (Inventory) ----

@api_router.get("/products")
async def get_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    limit: int = 100,
    skip: int = 0
):
    """Get all products with optional search/filter"""
    query = {}
    if search:
        query["name"] = {"$regex": search, "$options": "i"}
    if category:
        query["category"] = category
    
    products = await db.products.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(limit)
    total = await db.products.count_documents(query)
    
    return {"products": products, "total": total}

@api_router.post("/products")
async def create_product(product: ProductCreate, admin = Depends(get_current_admin)):
    """Create a single product (admin only)"""
    new_product = Product(name=product.name, category=product.category)
    doc = new_product.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.products.insert_one(doc)
    return {"message": "Produkt skapad", "product": doc}

@api_router.post("/products/bulk")
async def create_products_bulk(data: ProductBulkCreate, admin = Depends(get_current_admin)):
    """Bulk create products from a list of names (admin only)"""
    products = []
    for name in data.products:
        name = name.strip()
        if name:
            product = Product(name=name, category=data.category)
            doc = product.model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            products.append(doc)
    
    if products:
        await db.products.insert_many(products)
    
    return {"message": f"{len(products)} produkter skapade", "count": len(products)}

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin = Depends(get_current_admin)):
    """Delete a product (admin only)"""
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Produkt hittades inte")
    return {"message": "Produkt borttagen"}

@api_router.delete("/products")
async def delete_all_products(admin = Depends(get_current_admin)):
    """Delete all products (admin only)"""
    result = await db.products.delete_many({})
    return {"message": f"{result.deleted_count} produkter borttagna"}

@api_router.get("/products/categories")
async def get_product_categories():
    """Get unique product categories"""
    categories = await db.products.distinct("category")
    return [c for c in categories if c]

# ---- CHATBOT ----

STORE_INFO = """
📍 **Mathallen Malmö**
Lantmannagatan 59, 214 48 Malmö
Tel: 040-92 44 20

📍 **Mathallen Lugnet**
Lugna gatan 2, 211 60 Malmö
Tel: 040-92 44 20

🕐 **Öppettider:** Alla dagar 07:00 - 22:00
"""

WELCOME_RESPONSES = {
    "greeting": "Hej och välkommen till Mathallen! 👋 Jag är din virtuella assistent. Hur kan jag hjälpa dig idag?",
    "hours": f"Vi har öppet alla dagar mellan 07:00 och 22:00. Välkommen in!\n{STORE_INFO}",
    "location": f"Du hittar oss på två platser i Malmö:\n{STORE_INFO}",
    "contact": f"Du kan nå oss på telefon 040-92 44 20. Här är våra butiker:\n{STORE_INFO}",
    "default": f"Tack för din fråga! Välkommen till Mathallen - din lokala stormarknad i Malmö med färska produkter, bra priser och veckans bästa erbjudanden.\n{STORE_INFO}"
}

# Keywords for different response types
GREETING_KEYWORDS = ["hej", "hallå", "tjena", "hejsan", "god dag", "hello", "hi", "morsning"]
HOURS_KEYWORDS = ["öppet", "öppna", "stänger", "öppettider", "tider", "timmar", "när"]
LOCATION_KEYWORDS = ["var", "hitta", "adress", "ligger", "vägen", "karta", "plats"]
CONTACT_KEYWORDS = ["kontakt", "telefon", "ring", "nummer", "nå", "mail", "mejl"]

def get_chat_response(query: str) -> str:
    """Get appropriate response based on query"""
    query_lower = query.lower().strip()
    
    # Check for greetings
    if any(word in query_lower for word in GREETING_KEYWORDS):
        return WELCOME_RESPONSES["greeting"]
    
    # Check for opening hours
    if any(word in query_lower for word in HOURS_KEYWORDS):
        return WELCOME_RESPONSES["hours"]
    
    # Check for location
    if any(word in query_lower for word in LOCATION_KEYWORDS):
        return WELCOME_RESPONSES["location"]
    
    # Check for contact
    if any(word in query_lower for word in CONTACT_KEYWORDS):
        return WELCOME_RESPONSES["contact"]
    
    # Default response
    return WELCOME_RESPONSES["default"]

@api_router.post("/chat")
async def chat_search(query: ChatQuery):
    """Virtual assistant chatbot"""
    search_term = query.query.strip()
    
    if len(search_term) < 2:
        return {
            "found": True,
            "message": WELCOME_RESPONSES["greeting"],
        }
    
    response = get_chat_response(search_term)
    
    return {
        "found": True,
        "message": response,
    }

# ---- ADMIN SETUP ----

@api_router.post("/setup/admin")
async def setup_admin():
    """Create initial admin user if none exists"""
    existing = await db.admins.find_one({})
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    admin = AdminUser(
        username="admin",
        password_hash=hash_password("mathallen2024")
    )
    doc = admin.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.admins.insert_one(doc)
    return {"message": "Admin created", "username": "admin", "password": "mathallen2024"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
