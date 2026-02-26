import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/3458r0m2_logo-mat.png";

export default function Footer({ variant = "default" }) {
  const currentYear = new Date().getFullYear();
  
  const isRed = variant === "red";

  return (
    <footer className={isRed ? "bg-red-600 text-white" : "bg-stone-900 text-stone-300"}>
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-6" data-testid="footer-logo">
              <img 
                src={LOGO_URL} 
                alt="Mathallen Malmö" 
                className="h-14 w-auto"
              />
            </Link>
            <p className={`text-sm leading-relaxed mb-6 ${isRed ? "text-red-100" : "text-stone-400"}`}>
              Din lokala stormarknad i Malmö. Kvalitet, prisvärdhet och attraktiva 
              veckokampanjer under ett och samma tak.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isRed ? "bg-red-700 hover:bg-red-800" : "bg-stone-800 hover:bg-red-600"}`}
                data-testid="social-facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isRed ? "bg-red-700 hover:bg-red-800" : "bg-stone-800 hover:bg-red-600"}`}
                data-testid="social-instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Snabblänkar
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/om-oss" className={`transition-colors text-sm ${isRed ? "hover:text-red-200" : "hover:text-red-400"}`} data-testid="footer-about">
                  Om Mathallen
                </Link>
              </li>
              <li>
                <Link to="/erbjudanden" className={`transition-colors text-sm ${isRed ? "hover:text-red-200" : "hover:text-red-400"}`} data-testid="footer-offers">
                  Veckans erbjudanden
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className={`transition-colors text-sm ${isRed ? "hover:text-red-200" : "hover:text-red-400"}`} data-testid="footer-contact">
                  Kontakta oss
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Kontakt
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isRed ? "text-white" : "text-red-500"}`} />
                <span className="text-sm">
                  Lantmannagatan 59,<br />
                  214 48 Malmö
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className={`w-5 h-5 flex-shrink-0 ${isRed ? "text-white" : "text-red-500"}`} />
                <a href="tel:+46409244220" className={`text-sm transition-colors ${isRed ? "hover:text-red-200" : "hover:text-red-400"}`}>
                  040-92 44 20
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className={`w-5 h-5 flex-shrink-0 ${isRed ? "text-white" : "text-red-500"}`} />
                <a href="mailto:info@mathallen.se" className={`text-sm transition-colors ${isRed ? "hover:text-red-200" : "hover:text-red-400"}`}>
                  info@mathallen.se
                </a>
              </li>
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Öppettider
            </h3>
            <div className="flex items-start gap-3 mb-4">
              <Clock className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isRed ? "text-white" : "text-red-500"}`} />
              <div className="text-sm space-y-2">
                <div className="flex justify-between gap-4">
                  <span>Alla dagar</span>
                  <span className="text-white">07:00 - 22:00</span>
                </div>
              </div>
            </div>
            
            {/* Payment methods */}
            <div className="mt-6">
              <p className={`text-xs font-medium mb-3 ${isRed ? "text-red-200" : "text-stone-400"}`}>Handla på Mathallen</p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <img src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/o4qaqrp1_visa.svg" alt="Visa" className="h-5 w-auto" />
                </div>
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <img src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/7pkbx55j_mastercard.svg" alt="Mastercard" className="h-5 w-auto" />
                </div>
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <img src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/bs4qg3b5_apple-pay.svg" alt="Apple Pay" className="h-5 w-auto" />
                </div>
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <img src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/iyykfk7z_swish.svg" alt="Swish" className="h-5 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t ${isRed ? "border-red-700" : "border-stone-800"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-sm ${isRed ? "text-red-200" : "text-stone-500"}`}>
            © {currentYear} Mathallen Malmö. Alla rättigheter förbehållna.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/admin" className={`transition-colors ${isRed ? "text-red-200 hover:text-white" : "text-stone-500 hover:text-stone-300"}`} data-testid="footer-admin-link">
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Developer credit bar */}
      <div className={isRed ? "bg-red-700" : "bg-stone-950"}>
        <div className={`max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-xs ${isRed ? "text-red-200" : "text-stone-500"}`}>
          <span>Webbplats utvecklad av <a href="https://orvedo.com" target="_blank" rel="noopener noreferrer" className={`font-medium transition-colors ${isRed ? "text-white hover:text-red-100" : "text-red-400 hover:text-red-300"}`}>Orvedo Co.</a></span>
          <span className={`hidden md:inline ${isRed ? "text-red-500" : "text-stone-700"}`}>|</span>
          <a href="mailto:info@orvedo.com" className={`transition-colors ${isRed ? "hover:text-white" : "hover:text-stone-300"}`}>info@orvedo.com</a>
          <span className={`hidden md:inline ${isRed ? "text-red-500" : "text-stone-700"}`}>|</span>
          <a href="tel:+46723735555" className={`transition-colors ${isRed ? "hover:text-white" : "hover:text-stone-300"}`}>072 373 55 55</a>
          <span className={`hidden md:inline ${isRed ? "text-red-500" : "text-stone-700"}`}>|</span>
          <a href="tel:+46722822866" className={`transition-colors ${isRed ? "hover:text-white" : "hover:text-stone-300"}`}>072 282 28 66</a>
        </div>
      </div>
    </footer>
  );
}
