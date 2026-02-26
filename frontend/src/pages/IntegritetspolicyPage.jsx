import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function IntegritetspolicyPage() {
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
            Integritetspolicy
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
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Om denna policy</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Denna integritetspolicy beskriver hur Mathallen Malmö samlar in, 
              använder och skyddar din personliga information när du besöker vår 
              webbplats eller använder våra tjänster. Vi respekterar din integritet 
              och är engagerade i att skydda dina personuppgifter.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Cookies och spårning</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vår webbplats använder cookies för att förbättra din upplevelse. 
              Cookies är små textfiler som lagras på din enhet. Vi använder:
            </p>
            <ul className="list-disc pl-6 text-stone-600 mb-6 space-y-2">
              <li><strong>Nödvändiga cookies:</strong> Krävs för att webbplatsen ska fungera korrekt</li>
              <li><strong>Funktionella cookies:</strong> Sparar dina preferenser</li>
              <li><strong>Analytiska cookies:</strong> Hjälper oss förstå hur webbplatsen används</li>
            </ul>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Du kan hantera cookies genom din webbläsares inställningar. Observera 
              att blockering av vissa cookies kan påverka webbplatsens funktionalitet.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Nyhetsbrev</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Om du prenumererar på vårt nyhetsbrev samlar vi in din e-postadress. 
              Vi använder denna endast för att skicka information om erbjudanden och 
              kampanjer. Du kan när som helst avsluta prenumerationen genom länken i 
              varje utskick eller genom att kontakta oss.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Kontaktformulär</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              När du använder vårt kontaktformulär samlar vi in ditt namn, 
              e-postadress, telefonnummer och ditt meddelande. Denna information 
              används endast för att besvara din förfrågan och sparas inte längre 
              än nödvändigt.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Tredjepartsleverantörer</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi kan dela information med betrodda tredjepartsleverantörer som 
              hjälper oss att driva webbplatsen och våra tjänster. Dessa parter 
              har endast tillgång till information som krävs för att utföra sina 
              uppgifter och får inte använda den för andra ändamål.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Dataskydd</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi implementerar lämpliga tekniska och organisatoriska åtgärder för 
              att skydda dina personuppgifter mot obehörig åtkomst, förlust eller 
              förstörelse. Alla dataöverföringar sker via säkra, krypterade anslutningar.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Ändringar i policyn</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Vi kan uppdatera denna integritetspolicy från tid till annan. 
              Eventuella ändringar publiceras på denna sida med ett uppdaterat datum. 
              Vi rekommenderar att du regelbundet granskar denna policy.
            </p>

            <h2 className="text-2xl font-bold text-stone-900 mb-4">Kontakta oss</h2>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Om du har frågor om denna integritetspolicy eller vår hantering av 
              dina personuppgifter, kontakta oss gärna:<br /><br />
              <strong>Mathallen Malmö</strong><br />
              Lantmannagatan 59, 214 48 Malmö<br />
              E-post: info@mathallen.nu<br />
              Telefon: 040-92 44 20
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
