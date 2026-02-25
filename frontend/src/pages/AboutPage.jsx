import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Award, Users, Leaf, ArrowRight, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AboutPage() {
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

  const values = [
    {
      icon: Award,
      title: "Kvalitet",
      description: "Vi väljer endast de bästa produkterna från pålitliga leverantörer. Kvalitet är grunden i allt vi gör.",
    },
    {
      icon: Heart,
      title: "Prisvärdhet",
      description: "Bra priser utan att kompromissa med kvaliteten. Vi tror att alla förtjänar tillgång till bra mat.",
    },
    {
      icon: Users,
      title: "Kundfokus",
      description: "Din shoppingupplevelse är vår prioritet. Vi lyssnar, anpassar och förbättrar ständigt.",
    },
    {
      icon: Leaf,
      title: "Lokalt engagemang",
      description: "Vi stödjer lokala producenter och är stolta över att vara en del av Malmö-samhället.",
    },
  ];

  return (
    <div className="page-transition">
      {/* Hero - Split Layout */}
      <section className="relative bg-stone-900 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[400px] lg:min-h-[500px]">
          {/* Left - Content */}
          <div className="flex flex-col justify-center px-6 md:px-12 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16 py-16 lg:py-20 order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 text-red-400 font-medium text-sm mb-4 bg-red-500/10 px-4 py-2 rounded-full w-fit">
              <Heart className="w-4 h-4" />
              Om oss
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Din lokala stormarknad sedan <span className="text-red-500">1985</span>
            </h1>
            <p className="text-lg text-stone-300 leading-relaxed max-w-lg">
              Mathallen Malmö är en uppskattad och välbesökt stormarknad i Malmö som 
              kombinerar hög kvalitet, rimliga priser och attraktiva veckokampanjer 
              under ett och samma tak.
            </p>
          </div>
          
          {/* Right - Image (full bleed) */}
          <div className="relative h-64 lg:h-auto order-1 lg:order-2">
            <img
              src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Mathallen butik"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/50 to-transparent lg:bg-gradient-to-r lg:from-stone-900 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
                Vår historia
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Det började 1985 med en enkel vision: att skapa en plats där 
                  Malmöborna kunde hitta kvalitetsprodukter till rimliga priser. 
                  Idag, nästan fyra decennier senare, är den visionen fortfarande 
                  kärnan i allt vi gör.
                </p>
                <p>
                  Genom åren har vi vuxit och utvecklats, men vi har aldrig glömt 
                  våra rötter. Vi är fortfarande samma familjevänliga butik som 
                  öppnade sina dörrar för första gången – bara större och bättre.
                </p>
                <p>
                  Vårt engagemang för lokala producenter och hållbarhet har gjort 
                  oss till en favorit bland medvetna konsumenter. Vi tror på att 
                  stödja vårt samhälle och erbjuda produkter som man kan känna sig 
                  trygg med.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/10360444/pexels-photo-10360444.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Mathallen interiör"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg mt-8">
                  <img
                    src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Färska produkter"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/1927383/pexels-photo-1927383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Kött och chark"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg mt-8">
                  <img
                    src="https://images.pexels.com/photos/3985093/pexels-photo-3985093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Familj handlar"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Våra värderingar
            </h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              Fyra pelare som guidar oss i allt vi gör
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 border border-stone-100 hover:border-red-200 transition-colors group"
                data-testid={`about-value-${index}`}
              >
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                  <value.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Veckans erbjudanden */}
      <section className="py-12 md:py-16 bg-white">
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
                <div key={i} className="bg-stone-50 rounded-2xl p-6 animate-pulse">
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
                  className="bg-stone-50 rounded-2xl p-4 md:p-6 border-2 border-dashed border-red-200 hover:shadow-lg transition-shadow"
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
            <div className="text-center py-12 bg-stone-50 rounded-2xl">
              <ShoppingBasket className="w-16 h-16 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500">Inga aktiva erbjudanden just nu. Kom tillbaka snart!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Välkommen till oss!
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Vi ser fram emot att välkomna dig i butiken. Kom förbi och upplev 
            Mathallen-skillnaden själv.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
              data-testid="about-cta-contact"
            >
              <Link to="/kontakt">
                Hitta till oss
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-stone-700 text-white hover:bg-stone-800 rounded-full px-8"
              data-testid="about-cta-offers"
            >
              <Link to="/erbjudanden">Se veckans erbjudanden</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
