import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function TillganglighetPage() {
  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="bg-stone-900 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Tillbaka till startsidan
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Tillgänglighet
          </h1>
          <p className="text-stone-400 mt-4">
            Senast uppdaterad: Februari 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="prose prose-stone max-w-none">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Vårt tillgänglighetsarbete</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Mathallen Malmö strävar efter att vår webbplats ska vara tillgänglig för 
              alla, oavsett funktionsnedsättning. Vi arbetar kontinuerligt med att 
              förbättra webbplatsens tillgänglighet enligt riktlinjerna för tillgängligt 
              webbinnehåll (WCAG 2.1, nivå AA).
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Vad vi gör för tillgänglighet</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi har implementerat följande åtgärder för att förbättra tillgängligheten:
            </p>
            <ul className="list-disc pl-6 text-stone-600 mb-6 space-y-2">
              <li>Tydlig och konsekvent navigering</li>
              <li>Beskrivande alternativtexter för bilder</li>
              <li>Tillräcklig kontrast mellan text och bakgrund</li>
              <li>Responsiv design som fungerar på olika enheter</li>
              <li>Möjlighet att navigera med tangentbord</li>
              <li>Tydliga rubriker och strukturerad layout</li>
            </ul>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Tillgänglighet i butiken</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vår fysiska butik på Lantmannagatan 59 erbjuder:
            </p>
            <ul className="list-disc pl-6 text-stone-600 mb-6 space-y-2">
              <li>Tillgänglig entré för rullstolsburna</li>
              <li>Breda gångar för enkel framkomlighet</li>
              <li>Hjälpsam personal som gärna assisterar</li>
              <li>Tydlig skyltning och prisinformation</li>
            </ul>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Kända begränsningar</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Trots våra ansträngningar kan vissa delar av webbplatsen ha begränsad 
              tillgänglighet. Vi arbetar kontinuerligt med att identifiera och åtgärda 
              eventuella problem.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Rapportera tillgänglighetsproblem</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Om du upptäcker tillgänglighetsproblem på vår webbplats eller har förslag 
              på förbättringar, vänligen kontakta oss. Vi tar alla synpunkter på allvar 
              och strävar efter att lösa problem så snabbt som möjligt.<br /><br />
              E-post: info@mathallen.nu<br />
              Telefon: 040-92 44 20
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Tillsynsmyndighet</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Om du inte är nöjd med hur vi hanterar dina synpunkter på tillgänglighet 
              kan du kontakta Myndigheten för digital förvaltning (DIGG) som är 
              tillsynsmyndighet för digital tillgänglighet.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
