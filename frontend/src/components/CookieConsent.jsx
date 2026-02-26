import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("mathallen_cookie_consent");
    if (!cookieChoice) {
      // Small delay before showing popup
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mathallen_cookie_consent", "accepted");
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem("mathallen_cookie_consent", "rejected");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100] animate-fade-in"
        onClick={handleAccept}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cookie Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <Cookie className="w-10 h-10 text-amber-600" />
            </div>
          </div>

          {/* Title */}
          <p className="text-red-600 text-center font-medium mb-2">
            Välkommen till Mathallen
          </p>
          <h2 className="text-2xl font-bold text-stone-900 text-center mb-4">
            Vi jobbar med kakor
          </h2>

          {/* Description */}
          <p className="text-stone-600 text-center text-sm leading-relaxed mb-6">
            Vi använder kakor (cookies) och liknande tekniker för att göra våra 
            tjänster mer relevanta, och ge dig en bättre upplevelse. De används 
            också som hjälp i vår marknadsföring.
          </p>

          {/* Link */}
          <div className="mb-6">
            <a 
              href="/om-oss" 
              className="block text-center text-red-600 hover:text-red-700 font-medium py-3 border border-stone-200 rounded-full hover:bg-stone-50 transition-colors"
            >
              Läs mer om kakor på Mathallen
            </a>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAccept}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-6 text-base font-semibold"
              data-testid="cookie-accept-button"
            >
              Godkänn kakor
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="w-full border-red-600 text-red-600 hover:bg-red-50 rounded-full py-6 text-base font-semibold"
              data-testid="cookie-reject-button"
            >
              Avvisa alla
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
