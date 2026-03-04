import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after a small delay for better UX
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(false);
    navigate("/erbjudanden");
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
      data-testid="promo-popup-overlay"
    >
      <div 
        className="relative max-w-lg w-full animate-scale-in cursor-pointer"
        onClick={(e) => e.stopPropagation()}
        data-testid="promo-popup-container"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          data-testid="promo-popup-close"
          aria-label="Stäng"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Popup Image */}
        <div 
          onClick={handleClick}
          className="rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-300"
        >
          <img
            src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/mg8le9jb_Giris%CC%A7%20Tasar%C4%B1m%C4%B1.png"
            alt="Veckans erbjudanden på Mathallen Malmö"
            className="w-full h-auto"
            data-testid="promo-popup-image"
          />
        </div>

        {/* Click hint for mobile */}
        <p className="text-center text-white/80 text-sm mt-3 md:hidden">
          Tryck på bilden för att se erbjudanden
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
