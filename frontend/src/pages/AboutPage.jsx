import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Award, Users, Leaf, ArrowRight, ShoppingBasket, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Customer reviews data
const customerReviews = [
  {
    id: 1,
    name: "Anna Karlsson",
    initials: "AK",
    color: "red",
    rating: 5,
    text: "Fantastisk butik med ett brett sortiment! Personalen är alltid hjälpsam och veckans erbjudanden är verkligen prisvärda. Vår familjs favoritbutik!",
    time: "2 veckor sedan",
    platform: "google"
  },
  {
    id: 2,
    name: "Magnus Lindqvist",
    initials: "ML",
    color: "blue",
    rating: 5,
    text: "Bästa stormarknaden i Malmö! Fräscha grönsaker, bra kött och alltid trevlig service. Har handlat här i över 5 år och kommer fortsätta.",
    time: "1 månad sedan",
    platform: "google"
  },
  {
    id: 3,
    name: "Sofia Nilsson",
    initials: "SN",
    color: "green",
    rating: 5,
    text: "Gillar verkligen deras färskvaror och charkuteriavdelning. Priserna är rimliga och kampanjerna är alltid värda att kolla in. Rekommenderas!",
    time: "3 veckor sedan",
    platform: "facebook"
  },
  {
    id: 4,
    name: "Erik Johansson",
    initials: "EJ",
    color: "purple",
    rating: 5,
    text: "Alltid fräscha produkter och bra priser. Personalen är vänlig och butiken är välorganiserad. Min favoritbutik för veckans matinköp!",
    time: "1 vecka sedan",
    platform: "google"
  },
  {
    id: 5,
    name: "Linda Andersson",
    initials: "LA",
    color: "orange",
    rating: 4,
    text: "Stort utbud av internationella produkter. Perfekt för oss som gillar att laga mat från olika kulturer. Kommer definitivt tillbaka!",
    time: "2 månader sedan",
    platform: "google"
  },
  {
    id: 6,
    name: "Oscar Pettersson",
    initials: "OP",
    color: "teal",
    rating: 5,
    text: "Supernöjd med servicen! Köttdisken har alltid färska produkter och personalen hjälper gärna till med tips. Rekommenderar starkt!",
    time: "3 veckor sedan",
    platform: "facebook"
  }
];

const colorClasses = {
  red: { bg: "bg-red-100", text: "text-red-600" },
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  teal: { bg: "bg-teal-100", text: "text-teal-600" }
};

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

  return (
    <div className="page-transition">
      {/* Hero - Split Layout */}
      <section className="relative bg-stone-900 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
          {/* Left - Content */}
          <div className="flex flex-col justify-center px-6 md:px-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16 py-12 md:py-16 order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-red-400 font-medium text-sm mb-4 bg-red-500/10 px-4 py-2 rounded-full w-fit">
              <Heart className="w-4 h-4" />
              Om oss
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4 md:mb-6">
              Din lokala stormarknad sedan <span className="text-red-500">2020</span>
            </h1>
            <p className="text-base md:text-lg text-stone-300 leading-relaxed max-w-lg">
              Mathallen Malmö är en uppskattad och välbesökt matbutik som förenar mångfald, kvalitet och bra priser – med ett brett sortiment och attraktiva veckokampanjer under ett tak.
            </p>
          </div>
          
          {/* Right - Image (full bleed) */}
          <div className="relative h-56 sm:h-64 md:h-auto order-1 md:order-2">
            <img
              src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Mathallen butik"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-stone-900/60 via-transparent to-transparent md:from-stone-900 md:via-transparent md:to-transparent" />
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
                  Mathallen grundades 2020 med en tydlig ambition – att skapa en matbutik där Malmöbor och kunder från hela Skåne kan handla bra produkter till bra priser. Vi ville bygga en plats som speglar mångfalden i regionen och samla vardagens favoriter tillsammans med smaker från världens alla hörn under ett och samma tak.
                </p>
                <p>
                  Sedan starten har vi vuxit tillsammans med våra kunder. Genom ett brett sortiment, dagliga leveranser och personlig service har vi skapat en butik där kvalitet och prisvärdhet går hand i hand.
                </p>
                <p>
                  Vårt mål är enkelt: att vara en trygg och självklar matdestination för både Malmö och Skåne – en plats där du alltid hittar det du söker och känner dig välkommen varje gång du besöker oss.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/10360444/pexels-photo-10360444.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Mathallen interiör"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Färska produkter"
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Visual Cards */}
      <section className="py-12 md:py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Våra värderingar
            </h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              Fyra pelare som guidar oss i allt vi gör
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Kvalitet */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
              <img
                src="https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Kvalitet"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Kvalitet</h3>
                <p className="text-white/90 text-sm leading-relaxed hidden md:block">
                  Vi väljer endast de bästa produkterna från pålitliga leverantörer.
                </p>
              </div>
            </div>

            {/* Prisvärdhet */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
              <img
                src="https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Prisvärdhet"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Prisvärdhet</h3>
                <p className="text-white/90 text-sm leading-relaxed hidden md:block">
                  Bra priser utan att kompromissa med kvaliteten.
                </p>
              </div>
            </div>

            {/* Kundfokus */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
              <img
                src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Kundfokus"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Kundfokus</h3>
                <p className="text-white/90 text-sm leading-relaxed hidden md:block">
                  Din shoppingupplevelse är vår prioritet.
                </p>
              </div>
            </div>

            {/* Lokalt engagemang */}
            <div className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
              <img
                src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Lokalt engagemang"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                  <Leaf className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Lokalt</h3>
                <p className="text-white/90 text-sm leading-relaxed hidden md:block">
                  Vi stödjer lokala producenter i Malmö.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produktgalleri */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">
              Från våra hyllor
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Upptäck vårt breda sortiment av färska produkter och kvalitetsvaror
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="group relative overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Färska frukter"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold text-lg">Färska frukter</p>
                <p className="text-white/80 text-sm">Dagliga leveranser</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Grönsaker"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold text-lg">Grönsaker</p>
                <p className="text-white/80 text-sm">Alltid färskt</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Kött & chark"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold text-lg">Kött & chark</p>
                <p className="text-white/80 text-sm">Kvalitetsprodukter</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Mejeri"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold text-lg">Mejeri</p>
                <p className="text-white/80 text-sm">Fräscht varje dag</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-12 md:py-16 bg-stone-50">
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
            <div className="bg-white rounded-2xl p-6 border border-stone-100" data-testid="review-1">
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
            <div className="bg-white rounded-2xl p-6 border border-stone-100" data-testid="review-2">
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
            <div className="bg-white rounded-2xl p-6 border border-stone-100" data-testid="review-3">
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
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-3 border border-stone-200">
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
