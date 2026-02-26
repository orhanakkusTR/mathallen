import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Tag, Users, ShoppingBasket, CheckCircle, Star, ExternalLink, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Convert Google Drive links to direct image URLs
function convertToDirectImageUrl(url) {
  if (!url) return null;
  
  // Google Drive file link: https://drive.google.com/file/d/FILE_ID/view
  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([^\/]+)/);
  if (driveFileMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveFileMatch[1]}`;
  }
  
  // Google Drive open link: https://drive.google.com/open?id=FILE_ID
  const driveOpenMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (driveOpenMatch) {
    return `https://drive.google.com/uc?export=view&id=${driveOpenMatch[1]}`;
  }
  
  // Already a direct link or other URL
  return url;
}

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 604800000;
  return Math.ceil((diff + start.getDay() * 86400000) / oneWeek);
}

export default function HomePage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${API}/offers/current`);
        // Always show max 4 offers on homepage
        setOffers(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribing(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      toast.success("Tack! Du kommer nu få våra veckokampanjer via e-post.");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Något gick fel. Försök igen senare.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <div className="page-transition">
      {/* Hero Section - Full Width */}
      <section className="relative h-[calc(100vh-112px)] min-h-[500px] overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.pexels.com/photos/3985093/pexels-photo-3985093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920"
            className="w-full h-full object-cover"
          >
            <source src="/mat-video.mov" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-center">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 text-white/90 font-medium text-sm mb-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Leaf className="w-4 h-4" />
              Din lokala stormarknad i Malmö
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Välkommen till{" "}
              <span className="text-red-500">Mathallen</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              Kvalitet, prisvärdhet och attraktiva veckokampanjer – allt under samma tak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
                data-testid="hero-offers-button"
              >
                <Link to="/erbjudanden">
                  Se veckans erbjudanden
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full px-8 py-6 text-lg font-medium"
                data-testid="hero-contact-button"
              >
                <Link to="/kontakt">Hitta till oss</Link>
              </Button>
            </div>
          </div>

          {/* Weekly Offer Card - Floating */}
          <Link 
            to="/erbjudanden"
            className="hidden lg:flex absolute right-8 xl:right-16 bottom-16 flex-col items-center justify-center w-44 h-44 bg-red-600 hover:bg-red-700 transition-colors rounded-2xl shadow-2xl text-white group"
            data-testid="hero-weekly-offer-box"
          >
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">Erbjudanden</p>
            <p className="text-white font-bold text-3xl">VECKA {getWeekNumber()}</p>
            <div className="mt-2 flex items-center gap-1 text-white/90 text-xs font-medium group-hover:text-white transition-colors">
              <span>Se alla</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Mobile Weekly Offer - Only shown on mobile/tablet */}
      <div className="lg:hidden px-4 -mt-8 relative z-10 mb-8">
        <Link 
          to="/erbjudanden"
          className="flex items-center justify-between bg-red-600 hover:bg-red-700 transition-colors rounded-2xl p-5 shadow-xl text-white"
          data-testid="hero-weekly-offer-mobile"
        >
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Erbjudanden</p>
            <p className="text-white font-bold text-2xl">VECKA {getWeekNumber()}</p>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
            <span>Se veckans erbjudanden</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Values Section - Visual Cards */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">
              Våra löften till dig
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              Varför välja Mathallen?
            </h2>
            <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto">
              Vi kombinerar kvalitet och prisvärdhet för att ge dig den bästa shoppingupplevelsen i Malmö.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {/* Färskhet */}
            <div 
              className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[3/4] cursor-pointer"
              data-testid="value-card-0"
            >
              <img
                src="https://images.unsplash.com/photo-1552825896-8059df63a1fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTJ8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtYXJrZXQlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3NzIwNTQ4NTJ8MA&ixlib=rb-4.1.0&q=85"
                alt="Färska produkter"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-white">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 md:mb-3">
                  <Leaf className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">Färskhet</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-3">
                  Dagliga leveranser garanterar färska produkter varje dag.
                </p>
              </div>
            </div>

            {/* Prisvärdhet */}
            <div 
              className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[3/4] cursor-pointer"
              data-testid="value-card-1"
            >
              <img
                src="https://images.unsplash.com/photo-1693505628207-dbeb3d882c92?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzN8MHwxfHNlYXJjaHwyfHxncm9jZXJ5JTIwc2hvcHBpbmclMjBiYXNrZXQlMjBkaXNjb3VudCUyMHNhbGV8ZW58MHx8fHwxNzcyMDU0ODUyfDA&ixlib=rb-4.1.0&q=85"
                alt="Bra priser"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-white">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 md:mb-3">
                  <Tag className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">Prisvärdhet</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-3">
                  Bra priser och veckans erbjudanden ger mer värde.
                </p>
              </div>
            </div>

            {/* Lokal service */}
            <div 
              className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[3/4] cursor-pointer"
              data-testid="value-card-2"
            >
              <img
                src="https://images.pexels.com/photos/3985093/pexels-photo-3985093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Personlig service"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-white">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 md:mb-3">
                  <Users className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">Lokal service</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-3">
                  Personlig service med ett leende varje gång.
                </p>
              </div>
            </div>

            {/* Brett sortiment */}
            <div 
              className="group relative overflow-hidden rounded-xl md:rounded-2xl aspect-[3/4] cursor-pointer"
              data-testid="value-card-3"
            >
              <img
                src="https://images.unsplash.com/photo-1760463921690-9bec0cc7d434?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwyfHxzdXBlcm1hcmtldCUyMGFpc2xlJTIwcHJvZHVjdHMlMjB2YXJpZXR5fGVufDB8fHx8MTc3MjA1NDg1NXww&ixlib=rb-4.1.0&q=85"
                alt="Brett sortiment"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 text-white">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 md:mb-3">
                  <ShoppingBasket className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-1">Brett sortiment</h3>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-3">
                  Allt du behöver finns under vårt tak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Offers Preview */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">
                Veckans erbjudanden
              </h2>
              <p className="text-stone-600">
                Ta del av våra bästa priser just nu
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-red-200 hover:bg-red-50"
              data-testid="view-all-offers-button"
            >
              <Link to="/erbjudanden">
                Se alla erbjudanden
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="w-full aspect-square bg-stone-200 rounded-xl mb-4" />
                  <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
                  <div className="h-6 bg-stone-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : offers.length > 0 ? (
            <>
              {/* Mobile: Horizontal cards */}
              <div className="md:hidden">
                {offers.map((offer, index) => (
                  <div
                    key={offer.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-stone-100 mb-5"
                    data-testid={`offer-card-mobile-${index}`}
                  >
                    <div className="flex">
                      {/* Image */}
                      <div className="relative w-36 flex-shrink-0">
                        {offer.image_url ? (
                          <img
                            src={convertToDirectImageUrl(offer.image_url)}
                            alt={offer.product_name}
                            className="w-full h-full object-cover min-h-[140px]"
                          />
                        ) : (
                          <div className="w-full h-full min-h-[140px] bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                            <ShoppingBasket className="w-12 h-12 text-red-300" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                        <h3 className="font-bold text-stone-900 text-lg leading-tight mb-3">
                          {offer.product_name}
                        </h3>
                        
                        {/* Price section */}
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-red-600">
                              {offer.offer_price}:-
                            </span>
                            <span className="text-sm text-stone-400">/{offer.unit}</span>
                          </div>
                          {offer.original_price && (
                            <div className="text-stone-500 text-sm">
                              Ord. pris <span className="line-through">{offer.original_price}:-</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom discount bar */}
                    {offer.original_price && (
                      <div className="bg-red-600 text-white px-4 py-2.5 flex items-center justify-between">
                        <span className="text-sm font-semibold">Spara {offer.original_price - offer.offer_price}:-</span>
                        <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                          -{Math.round(((offer.original_price - offer.offer_price) / offer.original_price) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Desktop: Grid cards */}
              <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {offers.map((offer, index) => (
                  <div
                    key={offer.id}
                    className={`bg-white rounded-2xl p-6 border-2 border-dashed border-red-200 hover-lift animate-fade-in-up stagger-${index + 1}`}
                    data-testid={`offer-card-${index}`}
                  >
                    <div className="relative mb-4">
                      {offer.image_url ? (
                        <img
                          src={offer.image_url}
                          alt={offer.product_name}
                          className="w-full aspect-square object-cover rounded-xl"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-red-100 rounded-xl flex items-center justify-center">
                          <ShoppingBasket className="w-12 h-12 text-red-300" />
                        </div>
                      )}
                      <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        ERBJUDANDE
                      </span>
                    </div>
                    <h3 className="font-semibold text-stone-900 mb-1">{offer.product_name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-red-600">
                        {offer.offer_price} kr
                      </span>
                      <span className="text-sm text-stone-500">/{offer.unit}</span>
                    </div>
                    {offer.original_price && (
                      <p className="text-sm text-stone-400 line-through">
                        Ord. pris {offer.original_price} kr
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl">
              <ShoppingBasket className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500">Inga aktiva erbjudanden just nu. Kom tillbaka snart!</p>
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-stone-600 font-medium">4.8 / 5</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                Vad våra kunder tycker
              </h2>
            </div>
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
              data-testid="write-review-button"
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                Skriv ett omdöme
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100" data-testid="review-1">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-stone-700 mb-4 leading-relaxed">
                "Fantastisk butik med ett brett sortiment! Personalen är alltid hjälpsam och 
                veckans erbjudanden är verkligen prisvärda. Vår familjs favoritbutik!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 font-semibold">AK</span>
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Anna Karlsson</p>
                  <p className="text-stone-500 text-xs">2 veckor sedan</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100" data-testid="review-2">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-stone-700 mb-4 leading-relaxed">
                "Bästa stormarknaden i Malmö! Fräscha grönsaker, bra kött och alltid 
                trevlig service. Har handlat här i över 10 år och kommer fortsätta."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">ML</span>
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Magnus Lindqvist</p>
                  <p className="text-stone-500 text-xs">1 månad sedan</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100" data-testid="review-3">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-stone-200 text-stone-200'}`} />
                ))}
              </div>
              <p className="text-stone-700 mb-4 leading-relaxed">
                "Gillar verkligen deras färskvaror och charkuteriavdelning. Priserna är 
                rimliga och kampanjerna är alltid värda att kolla in. Rekommenderas!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-semibold">SN</span>
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Sofia Nilsson</p>
                  <p className="text-stone-500 text-xs">3 veckor sedan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Reviews Badge */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-stone-100 rounded-full px-5 py-3">
              <img 
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                alt="Google" 
                className="h-5 w-auto"
              />
              <span className="text-stone-600 text-sm font-medium">Omdömen från Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-12 md:py-16 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Malmös favoritbutik sedan{" "}
                <span className="text-red-500">1985</span>
              </h2>
              <p className="text-stone-300 text-lg mb-8 leading-relaxed">
                Med över 10 års erfarenhet har vi byggt upp ett förtroende hos 
                Malmöborna. Vår passion för kvalitet och service gör oss till 
                mer än bara en butik – vi är en del av samhället.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Dagliga leveranser av färska produkter",
                  "Lokala och internationella specialiteter",
                  "Personlig service av kunnig personal",
                  "Attraktiva veckokampanjer",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-stone-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
                data-testid="about-cta-button"
              >
                <Link to="/om-oss">Läs mer om oss</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/10360444/pexels-photo-10360444.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Mathallen butik"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              {/* Desktop: Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-red-600 text-white rounded-2xl p-6 shadow-xl hidden md:block">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-red-100">års erfarenhet</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-white text-stone-900 rounded-2xl p-6 shadow-xl hidden md:block">
                <p className="text-4xl font-bold text-red-600">30.000+</p>
                <p className="text-stone-500">Produkter i sortimentet</p>
              </div>
              {/* Mobile: Stats cards below image */}
              <div className="grid grid-cols-2 gap-3 mt-4 md:hidden">
                <div className="bg-red-600 text-white rounded-xl p-4 text-center shadow-lg">
                  <p className="text-3xl font-bold">10+</p>
                  <p className="text-red-100 text-sm">års erfarenhet</p>
                </div>
                <div className="bg-white text-stone-900 rounded-xl p-4 text-center shadow-lg border border-stone-100">
                  <p className="text-3xl font-bold text-red-600">30.000+</p>
                  <p className="text-stone-500 text-sm">Produkter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-red-600 to-red-700">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-white/80 font-medium text-sm mb-3 bg-white/10 px-4 py-2 rounded-full">
                <Mail className="w-4 h-4" />
                Nyhetsbrev
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Missa aldrig ett erbjudande!
              </h2>
              <p className="text-red-100 text-lg max-w-xl">
                Prenumerera på vårt nyhetsbrev och få veckans bästa kampanjer 
                direkt i din inkorg. Helt gratis!
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type="email"
                    placeholder="Din e-postadress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 pr-4 py-6 rounded-full bg-white border-0 text-stone-900 placeholder:text-stone-400 w-full sm:w-80 text-base"
                    data-testid="newsletter-email-input"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={subscribing}
                  className="bg-stone-900 hover:bg-stone-800 text-white rounded-full px-8 py-6"
                  data-testid="newsletter-submit-button"
                >
                  {subscribing ? (
                    "Skickar..."
                  ) : (
                    <>
                      Prenumerera
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
              <p className="text-red-200 text-sm mt-3 text-center sm:text-left">
                Vi skickar max ett mail per vecka. Avsluta när du vill.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
