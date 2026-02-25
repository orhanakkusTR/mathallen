import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Apple, ShoppingBasket, Beef, Milk, Sparkles, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const iconMap = {
  Apple: Apple,
  ShoppingBasket: ShoppingBasket,
  Beef: Beef,
  Milk: Milk,
  Sparkles: Sparkles,
  Package: Package,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-100 to-red-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-red-600 font-medium text-sm mb-4 bg-red-100 px-4 py-2 rounded-full">
              <ShoppingBasket className="w-4 h-4" />
              Vårt sortiment
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
              Allt du behöver, <span className="text-red-600">under ett tak</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
              Upptäck vårt breda utbud av färska produkter, dagligvaror och specialiteter. 
              Från lokala favoriter till internationella smaker.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-stone-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const IconComponent = iconMap[category.icon] || Package;
                return (
                  <div
                    key={category.id}
                    className="category-card group relative rounded-2xl overflow-hidden bg-white border border-stone-100 hover:border-red-200 shadow-sm hover:shadow-xl transition-all duration-300"
                    data-testid={`category-card-${index}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      {category.image_url ? (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="category-card-image w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                          <IconComponent className="w-20 h-20 text-red-300" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-stone-900 mb-2 group-hover:text-red-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-stone-600 text-sm leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 transition-colors">
                          <IconComponent className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-stone-100">
                        <span className="inline-flex items-center text-sm font-medium text-red-600 group-hover:text-red-700">
                          Finns i butik
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-stone-100" data-testid="feature-freshness">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                <Apple className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Dagliga leveranser
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Våra färskvaror levereras varje dag för att garantera bästa kvalitet. 
                Du får alltid det färskaste hos oss.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-stone-100" data-testid="feature-local">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Lokala produkter
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Vi samarbetar med lokala producenter för att erbjuda dig det bästa 
                från Skåne och Sverige.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-stone-100" data-testid="feature-variety">
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                <Package className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">
                Brett sortiment
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Från vardagsvaror till exotiska specialiteter – vi har allt du 
                behöver för ditt kök.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Redo att handla?
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Besök oss på Storgatan 45 i Malmö och upptäck hela vårt sortiment. 
            Glöm inte att kolla veckans erbjudanden!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-stone-100 rounded-full px-8"
              data-testid="categories-cta-offers"
            >
              <Link to="/erbjudanden">
                Se erbjudanden
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-full px-8"
              data-testid="categories-cta-contact"
            >
              <Link to="/kontakt">Hitta till oss</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
