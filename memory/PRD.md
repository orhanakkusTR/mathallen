# Mathallen Malmö - Product Requirements Document

## Project Overview
Corporate yet warm, accessible, and campaign-focused website for "Mathallen Malmö" - a reliable, modern, and customer-centric supermarket in Malmö, Sweden.

**Primary Goals:**
- Position the brand
- Highlight weekly campaigns
- Provide simple and trustworthy user experience
- Motivate customers to visit the physical store
- NOT for e-commerce

**User Language:** Turkish (communication), Swedish (website content)

---

## Core Features (Implemented)

### 1. Homepage ✅
- Hero area with video background
- CTA for weekly offers
- Customer reviews carousel (6 reviews - 4 Google, 2 Facebook)
- Newsletter signup popup (floating, minimizable)
- Product category highlights

### 2. About Us (Om Oss) ✅
- Company story and values
- Image gallery
- Customer reviews carousel

### 3. Weekly Campaigns (Veckans Erbjudanden) ✅
- Product offers with category filtering ("Filtrera efter kategori")
- "Bästa Pris" red corner ribbon (admin-controllable)
- Multi-buy display ("X För" in price box)
- Price format: `XX:-` for whole numbers

### 4. Store Information & Contact ✅
- Address, hours, contact form
- Two-column layout (store info + social media)
- Full-width Google Maps embed
- Email: info@mathallen.nu

### 5. Admin Panel ✅
- Secure authentication (JWT)
- CRUD operations for offers
- Image upload (now stored in MongoDB for persistence)
- "Bästa Pris" toggle
- View newsletter subscribers
- View contact messages
- Drag-and-drop offer reordering

### 6. Legal Pages ✅
- Allmänna Villkor (Terms)
- Dataskydd (Data Protection)
- Tillgänglighet (Accessibility)
- Integritetspolicy (Privacy Policy)

### 7. Shop Page ✅
- Placeholder page

---

## Technical Architecture

```
/app/
├── backend/
│   ├── server.py          # FastAPI, MongoDB, JWT auth, image storage
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── Header.jsx (sticky)
│   │   │   ├── Footer.jsx (social links, legal links)
│   │   │   ├── Layout.jsx
│   │   │   └── NewsletterPopup.jsx
│   │   └── pages/
│   │       ├── HomePage.jsx
│   │       ├── AboutPage.jsx
│   │       ├── OffersPage.jsx
│   │       ├── ContactPage.jsx
│   │       ├── ShopPage.jsx
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       └── [Legal Pages].jsx
│   └── .env
└── memory/
    └── PRD.md
```

**Tech Stack:**
- Frontend: React, Tailwind CSS, Shadcn UI
- Backend: FastAPI, Python
- Database: MongoDB
- Image Storage: MongoDB (base64 encoded) - persistent across deployments

**Key API Endpoints:**
- `POST /api/auth/login` - Admin authentication
- `GET/POST/PUT/DELETE /api/offers` - Offer CRUD
- `POST /api/upload` - Image upload (saves to MongoDB)
- `GET /api/images/{id}` - Serve images from MongoDB
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter/subscribe` - Newsletter signup

---

## Database Schema

### offers collection
```json
{
  "id": "uuid",
  "product_name": "string",
  "original_price": "float|null",
  "offer_price": "float",
  "unit": "string",
  "image_url": "string",
  "category": "string",
  "week_number": "int",
  "year": "int",
  "is_active": "bool",
  "sort_order": "int",
  "multi_buy": "int|null",
  "is_best_price": "bool",
  "created_at": "datetime"
}
```

### images collection (NEW)
```json
{
  "id": "filename",
  "filename": "original_filename",
  "content_type": "mime_type",
  "data": "base64_encoded_string",
  "size": "int",
  "created_at": "datetime"
}
```

---

## Pending Issues

### P1 - High Priority
1. **Email functionality not active** - Requires `RESEND_API_KEY` from user
2. **"Write a Review" link placeholder** - Requires Google Maps review URL from user

### P2 - Medium Priority
3. **Hero video compatibility** - `.mov` file has limited browser support, recommend `.mp4` or `.webm`

---

## Future Tasks

### Upcoming
- Enhanced Google Maps integration (interactive map vs iframe)

### Backlog
- Online shop functionality (full e-commerce)
- Email notification system for new offers

---

## Session Log

### 2026-02-27
- Fixed production deployment issues
- Migrated image storage from local filesystem to MongoDB for persistence
- Verified "Filtrera efter kategori" working in production
- Verified "2 För" badge displaying correctly in price box
- Issue was browser cache showing old version

### Previous Sessions
- Implemented newsletter popup
- Implemented customer reviews carousel
- Implemented "Bästa Pris" feature
- Created legal pages
- Redesigned contact page layout
- Updated email to info@mathallen.nu
- Added TikTok to footer social links

---

## Admin Credentials
Stored in `backend/.env`:
- Username: admin
- Password: mathallen2024
