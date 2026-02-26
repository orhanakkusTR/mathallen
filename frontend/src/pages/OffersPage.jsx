import { useState, useEffect, useMemo } from "react";
import { Tag, Calendar, ShoppingBasket, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// All available categories for filtering
const allCategories = [
  "Bröd & Bakverk",
  "Tobak",
  "Bröd - Eget",
  "Vegetariskt",
  "Blommor",
  "Special",
  "Drycker",
  "Konfektyr",
  "Fisk",
  "Frukt & Grönt",
  "Snacks",
  "Djur",
  "Chark",
  "Ost",
  "Kött",
  "Kött - Eget i disk",
  "Mejeri",
  "Kroppsvård",
  "Grov-kem",
  "Djupfryst",
  "Läkemedel",
  "Specerier",
];

// Convert image URLs - handles both uploaded files and external URLs
function getImageUrl(url) {
  if (!url) return null;
  
  // If it starts with /uploads or /api/uploads, prepend the base URL
  if (url.startsWith('/uploads')) {
    return `${BASE_URL}/api${url}`;
  }
  if (url.startsWith('/api/uploads')) {
    return `${BASE_URL}${url}`;
  }
  
  // Already a direct link or other URL
  return url;
}

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentWeek = new Date().toLocaleDateString("sv-SE", {
    year: "numeric",
  }).split("-")[0] + " v." + getWeekNumber(new Date());

  function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  }

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${API}/offers/current`);
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="page-transition">
      {/* Hero - Split Layout */}
      <section className="relative bg-stone-900 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
          {/* Left - Content */}
          <div className="flex flex-col justify-center px-6 md:px-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16 py-12 md:py-16 order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-red-400 font-medium text-sm mb-4 bg-red-500/10 px-4 py-2 rounded-full w-fit">
              <Tag className="w-4 h-4" />
              Veckans bästa priser
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4 md:mb-6">
              Veckans <span className="text-red-500">erbjudanden</span>
            </h1>
            <p className="text-base md:text-lg text-stone-300 leading-relaxed max-w-lg mb-6">
              Ta del av våra senaste kampanjer och spara pengar på dina favoritprodukter.
            </p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-3 w-fit">
              <Calendar className="w-5 h-5 text-red-400" />
              <span className="font-semibold text-white">Gäller {currentWeek}</span>
            </div>
          </div>
          
          {/* Right - Image (full bleed) */}
          <div className="relative h-56 sm:h-64 md:h-auto order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1632175771754-4c413217669f?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200"
              alt="Veckans erbjudanden"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-stone-900/60 via-transparent to-transparent md:from-stone-900 md:via-transparent md:to-transparent" />
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-12 md:py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="w-full aspect-square bg-stone-200 rounded-xl mb-4" />
                  <div className="h-4 bg-stone-200 rounded w-3/4 mb-2" />
                  <div className="h-6 bg-stone-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : offers.length > 0 ? (
            <>
              {/* Grid cards - Both mobile and desktop */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {offers.map((offer, index) => (
                  <div
                    key={offer.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-stone-100"
                    data-testid={`offer-item-${index}`}
                  >
                    {/* Product Image - Full width, fills container */}
                    <div className="aspect-square overflow-hidden">
                      {offer.image_url ? (
                        <img
                          src={getImageUrl(offer.image_url)}
                          alt={offer.product_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                          <ShoppingBasket className="w-16 h-16 text-stone-300" />
                        </div>
                      )}
                    </div>
                    
                    {/* Price Tag - Below image, full width */}
                    <div className="bg-yellow-400 px-4 py-3 md:py-4 text-center">
                      <span className="text-red-700 font-bold text-xs md:text-sm block leading-tight">Kampanj</span>
                      <div className="flex items-start justify-center">
                        <span className="text-red-700 font-black text-3xl md:text-4xl leading-none">
                          {Math.floor(offer.offer_price)}
                        </span>
                        <span className="text-red-700 font-bold text-lg md:text-xl mt-0.5">
                          {String(offer.offer_price).includes('.') ? String(offer.offer_price).split('.')[1].padEnd(2, '0').substring(0, 2) : '00'}
                        </span>
                        <span className="text-red-700 font-semibold text-sm md:text-base self-end mb-1 ml-0.5">/{offer.unit}</span>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4 text-center">
                      <h3 className="font-bold text-stone-900 text-sm md:text-base leading-tight mb-1">
                        {offer.product_name}
                      </h3>
                      <p className="text-stone-500 text-xs md:text-sm uppercase tracking-wide mb-3">
                        {offer.category}
                      </p>
                      {offer.original_price && (
                        <div className="bg-stone-100 rounded-lg py-2 px-3">
                          <span className="text-stone-600 text-xs md:text-sm font-medium">Ord pris </span>
                          <span className="text-red-600 text-sm md:text-base font-bold line-through whitespace-nowrap">{offer.original_price} kr/{offer.unit}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl">
              <ShoppingBasket className="w-20 h-20 text-stone-200 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-stone-900 mb-2">
                Inga erbjudanden just nu
              </h3>
              <p className="text-stone-500 mb-6">
                Vi uppdaterar våra erbjudanden varje vecka. Kom tillbaka snart!
              </p>
              <Button
                onClick={() => setSelectedCategory("all")}
                variant="outline"
                className="rounded-full"
                data-testid="reset-filter-button"
              >
                Visa alla kategorier
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-12 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">
                Nya erbjudanden varje vecka
              </h2>
              <p className="text-stone-400">
                Besök oss ofta för att inte missa de bästa kampanjerna!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-6 py-4 bg-stone-800 rounded-xl">
                <p className="text-3xl font-bold text-red-500">30.000+</p>
                <p className="text-stone-400 text-sm">Produkter i sortimentet</p>
              </div>
              <div className="text-center px-6 py-4 bg-stone-800 rounded-xl">
                <p className="text-3xl font-bold text-red-500">10+</p>
                <p className="text-stone-400 text-sm">År av erfarenhet</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
