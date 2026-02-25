import { Link } from "react-router-dom";
import { Heart, Award, Users, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
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

  const milestones = [
    { year: "1985", event: "Mathallen grundas i centrala Malmö" },
    { year: "1995", event: "Expansion med nytt bageri och charkdisk" },
    { year: "2005", event: "Renovering och modernisering av butiken" },
    { year: "2015", event: "Lansering av veckokampanjer" },
    { year: "2024", event: "Digital närvaro och ny webbplats" },
  ];

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-orange-600 font-medium text-sm mb-4 bg-orange-100 px-4 py-2 rounded-full">
              <Heart className="w-4 h-4" />
              Om oss
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
              Din lokala stormarknad sedan <span className="text-orange-500">1985</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
              Mathallen Malmö är en uppskattad och välbesökt stormarknad i Malmö som 
              kombinerar hög kvalitet, rimliga priser och attraktiva veckokampanjer 
              under ett och samma tak.
            </p>
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
                className="bg-white rounded-2xl p-8 border border-stone-100 hover:border-orange-200 transition-colors group"
                data-testid={`about-value-${index}`}
              >
                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  <value.icon className="w-7 h-7 text-orange-500 group-hover:text-white transition-colors" />
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

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Vår resa
            </h2>
            <p className="text-stone-600 text-lg">
              Från liten lokal butik till Malmös favorit
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-orange-200 transform md:-translate-x-1/2" />
              
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center mb-8 last:mb-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  data-testid={`milestone-${index}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full transform -translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-stone-50 rounded-xl p-6">
                      <span className="text-orange-500 font-bold text-lg">{milestone.year}</span>
                      <p className="text-stone-700 mt-1">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              ))}
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
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8"
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
