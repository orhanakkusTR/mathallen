import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function DataskyddPage() {
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
            Dataskydd
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
            <h2 className="text-2xl font-bold text-stone-900 mb-4">1. Personuppgiftsansvarig</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Mathallen Malmö är personuppgiftsansvarig för behandlingen av dina 
              personuppgifter enligt EU:s dataskyddsförordning (GDPR). Vi värnar om 
              din integritet och säkerställer att dina uppgifter behandlas på ett 
              lagligt, korrekt och transparent sätt.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">2. Vilka uppgifter samlar vi in?</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi samlar in följande typer av personuppgifter:
            </p>
            <ul className="list-disc pl-6 text-stone-600 mb-6 space-y-2">
              <li>Kontaktuppgifter (namn, e-postadress, telefonnummer) när du kontaktar oss</li>
              <li>E-postadress vid prenumeration på vårt nyhetsbrev</li>
              <li>Teknisk information (IP-adress, webbläsartyp) via cookies</li>
            </ul>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">3. Varför behandlar vi dina uppgifter?</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi behandlar dina personuppgifter för följande ändamål:
            </p>
            <ul className="list-disc pl-6 text-stone-600 mb-6 space-y-2">
              <li>För att besvara dina frågor och ärenden</li>
              <li>För att skicka nyhetsbrev med erbjudanden (om du samtyckt)</li>
              <li>För att förbättra vår webbplats och tjänster</li>
              <li>För att uppfylla rättsliga skyldigheter</li>
            </ul>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">4. Rättslig grund</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi behandlar dina uppgifter baserat på:
            </p>
            <ul className="list-disc pl-6 text-stone-600 mb-6 space-y-2">
              <li><strong>Samtycke:</strong> För nyhetsbrev och marknadsföring</li>
              <li><strong>Berättigat intresse:</strong> För att förbättra våra tjänster</li>
              <li><strong>Avtal:</strong> För att hantera kundärenden</li>
            </ul>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">5. Hur länge sparar vi uppgifterna?</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi sparar dina personuppgifter endast så länge det är nödvändigt för 
              det ändamål de samlades in för. Kontaktförfrågningar sparas i upp till 
              12 månader. Nyhetsbrevsprenumerationer sparas tills du avslutar din 
              prenumeration.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">6. Dina rättigheter</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Enligt GDPR har du följande rättigheter:
            </p>
            <ul className="list-disc pl-6 text-stone-600 mb-6 space-y-2">
              <li><strong>Rätt till tillgång:</strong> Du kan begära information om vilka uppgifter vi har om dig</li>
              <li><strong>Rätt till rättelse:</strong> Du kan begära att felaktiga uppgifter korrigeras</li>
              <li><strong>Rätt till radering:</strong> Du kan begära att dina uppgifter raderas</li>
              <li><strong>Rätt till dataportabilitet:</strong> Du kan få ut dina uppgifter i ett strukturerat format</li>
              <li><strong>Rätt att invända:</strong> Du kan invända mot viss behandling</li>
            </ul>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">7. Kontakt</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Om du har frågor om hur vi behandlar dina personuppgifter eller vill 
              utöva dina rättigheter, kontakta oss på:<br /><br />
              E-post: info@mathallen.nu<br />
              Telefon: 040-92 44 20<br /><br />
              Du har också rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
