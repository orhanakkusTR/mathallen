import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Tag, Users, ShoppingBasket, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function HomePage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${API}/offers/current`);
        setOffers(response.data.slice(0, 4));
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
      {/* Hero Section - Bento Grid */}
      <section className="bg-gradient-to-br from-red-50 to-stone-50 py-8 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Main hero text */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center gap-2 text-red-600 font-medium text-sm mb-4 bg-red-100 px-4 py-2 rounded-full">
                  <Leaf className="w-4 h-4" />
                  Din lokala stormarknad
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
                  Välkommen till{" "}
                  <span className="text-red-600">Mathallen</span> Malmö
                </h1>
                <p className="text-lg md:text-xl text-stone-600 mb-8 leading-relaxed">
                  Kvalitet, prisvärdhet och attraktiva veckokampanjer – allt under samma tak. 
                  Upptäck veckans bästa erbjudanden hos oss.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-red-500/20"
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
                    className="border-stone-200 bg-white hover:bg-stone-50 rounded-full px-8 py-6 text-lg font-medium"
                    data-testid="hero-contact-button"
                  >
                    <Link to="/kontakt">Hitta till oss</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero image - main */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 animate-fade-in-up stagger-1">
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-2xl">
                    <img
                      src="https://images.pexels.com/photos/3985093/pexels-photo-3985093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      alt="Familj handlar i Mathallen"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium opacity-90">Varmt välkommen!</p>
                    </div>
                  </div>
                </div>
                <div className="animate-fade-in-up stagger-2">
                  <div className="relative rounded-2xl overflow-hidden aspect-square shadow-xl">
                    <img
                      src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      alt="Färska frukter"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="animate-fade-in-up stagger-3">
                  <div className="relative rounded-2xl overflow-hidden aspect-square shadow-xl bg-red-600 flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-white font-bold text-2xl md:text-3xl">Nya</p>
                      <p className="text-red-100 font-semibold">erbjudanden</p>
                      <p className="text-white font-bold text-lg mt-1">varje vecka!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {offers.map((offer, index) => (
                <div
                  key={offer.id}
                  className={`bg-white rounded-2xl p-4 md:p-6 border-2 border-dashed border-red-200 hover-lift animate-fade-in-up stagger-${index + 1}`}
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
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl">
              <ShoppingBasket className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500">Inga aktiva erbjudanden just nu. Kom tillbaka snart!</p>
            </div>
          )}
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
                Med över 35 års erfarenhet har vi byggt upp ett förtroende hos 
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
              <div className="absolute -bottom-6 -left-6 bg-red-600 text-white rounded-2xl p-6 shadow-xl hidden md:block">
                <p className="text-4xl font-bold">35+</p>
                <p className="text-red-100">års erfarenhet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Besök oss idag!
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            Vi finns på Storgatan 45 i centrala Malmö. Välkommen in för att 
            upptäcka veckans bästa erbjudanden och färska produkter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-stone-100 rounded-full px-8"
              data-testid="cta-contact-button"
            >
              <Link to="/kontakt">Hitta till oss</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-full px-8"
              data-testid="cta-offers-button"
            >
              <Link to="/erbjudanden">Se erbjudanden</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
