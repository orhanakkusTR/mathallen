import { useState, useEffect } from "react";
import { Tag, Calendar, ShoppingBasket, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const categories = ["all", ...new Set(offers.map((o) => o.category))];
  
  const filteredOffers = selectedCategory === "all" 
    ? offers 
    : offers.filter((o) => o.category === selectedCategory);

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-stone-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-red-700 font-medium text-sm mb-4 bg-red-100 px-4 py-2 rounded-full">
                <Tag className="w-4 h-4" />
                Veckans bästa priser
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-4">
                Veckans <span className="text-red-600">erbjudanden</span>
              </h1>
              <p className="text-lg text-stone-600 max-w-xl">
                Ta del av våra senaste kampanjer och spara pengar på dina favoritprodukter.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-5 py-3 shadow-sm border border-stone-100">
              <Calendar className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-stone-900">Gäller {currentWeek}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-stone-100 sticky top-[132px] z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-stone-400" />
            <span className="text-sm text-stone-600 hidden sm:inline">Filtrera:</span>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 rounded-full" data-testid="category-filter">
                <SelectValue placeholder="Alla kategorier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla kategorier</SelectItem>
                {categories.filter(c => c !== "all").map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="ml-auto text-sm text-stone-500">
              {filteredOffers.length} erbjudanden
            </span>
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
          ) : filteredOffers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredOffers.map((offer, index) => (
                <div
                  key={offer.id}
                  className="offer-card bg-white rounded-2xl p-4 md:p-6 border-2 border-dashed border-red-200 hover-lift group"
                  data-testid={`offer-item-${index}`}
                >
                  <div className="relative mb-4">
                    {offer.image_url ? (
                      <img
                        src={offer.image_url}
                        alt={offer.product_name}
                        className="w-full aspect-square object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full aspect-square bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center">
                        <ShoppingBasket className="w-12 h-12 text-red-300" />
                      </div>
                    )}
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm offer-tag">
                      ERBJUDANDE
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                      {offer.category}
                    </span>
                    <h3 className="font-semibold text-stone-900 text-lg leading-tight">
                      {offer.product_name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-red-600">
                        {offer.offer_price}:-
                      </span>
                      <span className="text-sm text-stone-500">/{offer.unit}</span>
                    </div>
                    {offer.original_price && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-stone-400 line-through">
                          Ord. {offer.original_price}:-
                        </span>
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          Spara {Math.round(((offer.original_price - offer.offer_price) / offer.original_price) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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
                <p className="text-3xl font-bold text-red-500">100+</p>
                <p className="text-stone-400 text-sm">Produkter i sortimentet</p>
              </div>
              <div className="text-center px-6 py-4 bg-stone-800 rounded-xl">
                <p className="text-3xl font-bold text-red-500">35+</p>
                <p className="text-stone-400 text-sm">År av erfarenhet</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
