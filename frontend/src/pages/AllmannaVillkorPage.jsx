import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

export default function AllmannaVillkorPage() {
  return (
    <div className="page-transition">
      <SEO 
        title="Allmänna Villkor"
        description="Läs Mathallen Malmös allmänna villkor och köpvillkor."
        url="/allmanna-villkor"
        noindex={true}
      />
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
            Allmänna villkor
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
            <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Inledning</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Dessa allmänna villkor gäller för alla köp som görs i Mathallen Malmö, 
              beläget på Lantmannagatan 59, 214 48 Malmö. Genom att handla hos oss 
              godkänner du dessa villkor.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Priser och betalning</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Alla priser i butiken anges i svenska kronor (SEK) och inkluderar moms. 
              Vi accepterar kontant betalning, kortbetalning (Visa, Mastercard), 
              Apple Pay och Swish. Priserna kan ändras utan föregående meddelande.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Kampanjer och erbjudanden</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Veckans erbjudanden gäller under angiven period och så länge lagret räcker. 
              Vi reserverar oss för slutförsäljning och eventuella tryckfel. Kampanjer 
              kan inte kombineras med andra rabatter om inget annat anges.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Reklamation och returer</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Enligt konsumentköplagen har du rätt att reklamera en vara som är felaktig 
              eller skadad. Reklamation ska göras inom skälig tid efter att felet upptäckts. 
              Spara alltid kvittot som bevis på köpet. För livsmedel gäller särskilda regler 
              och returer accepteras endast om varan är felaktig.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Öppettider</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Mathallen Malmö har öppet alla dagar 07:00–22:00. Avvikande öppettider kan 
              förekomma vid helgdagar och meddelas i butiken samt på vår webbplats.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">6. Ansvarsbegränsning</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Mathallen Malmö ansvarar inte för indirekta skador eller följdskador som 
              kan uppstå i samband med köp. Vårt ansvar är begränsat till det belopp 
              kunden har betalat för den aktuella varan.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">7. Ändringar av villkoren</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi förbehåller oss rätten att när som helst ändra dessa villkor. 
              De senaste villkoren finns alltid tillgängliga på vår webbplats.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">8. Kontaktuppgifter</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              För frågor om dessa villkor, vänligen kontakta oss:<br /><br />
              <strong>Mathallen Malmö</strong><br />
              Lantmannagatan 59, 214 48 Malmö<br />
              Telefon: 040-92 44 20<br />
              E-post: info@mathallen.nu
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
