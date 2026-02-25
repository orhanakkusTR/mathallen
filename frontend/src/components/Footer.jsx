import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/3458r0m2_logo-mat.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
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
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Din lokala stormarknad i Malmö. Kvalitet, prisvärdhet och attraktiva 
              veckokampanjer under ett och samma tak.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-600 transition-colors"
                data-testid="social-facebook"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-red-600 transition-colors"
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
                <Link to="/om-oss" className="hover:text-red-400 transition-colors text-sm" data-testid="footer-about">
                  Om Mathallen
                </Link>
              </li>
              <li>
                <Link to="/erbjudanden" className="hover:text-red-400 transition-colors text-sm" data-testid="footer-offers">
                  Veckans erbjudanden
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="hover:text-red-400 transition-colors text-sm" data-testid="footer-contact">
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
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Lantmannagatan 59,<br />
                  214 48 Malmö
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="tel:+46409244220" className="text-sm hover:text-red-400 transition-colors">
                  040-92 44 20
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
                <a href="mailto:info@mathallen.se" className="text-sm hover:text-red-400 transition-colors">
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
              <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm space-y-2">
                <div className="flex justify-between gap-4">
                  <span>Alla dagar</span>
                  <span className="text-white">07:00 - 22:00</span>
                </div>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-xs font-medium">
                Välkommen in!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            © {currentYear} Mathallen Malmö. Alla rättigheter förbehållna.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/admin" className="text-stone-500 hover:text-stone-300 transition-colors" data-testid="footer-admin-link">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
