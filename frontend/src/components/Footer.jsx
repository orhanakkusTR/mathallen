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
            
            {/* Payment methods */}
            <div className="mt-6">
              <p className="text-stone-400 text-xs font-medium mb-3">Handla på Mathallen</p>
              <div className="flex items-center gap-2 flex-wrap">
                {/* Visa */}
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <svg viewBox="0 0 48 48" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 10H4V38H44V10Z" fill="#1565C0"/>
                    <path d="M18.7 28.2L20.2 19.8H23L21.5 28.2H18.7Z" fill="white"/>
                    <path d="M31.4 20C30.8 19.8 29.9 19.5 28.8 19.5C25.9 19.5 23.9 21 23.9 23.1C23.9 24.7 25.3 25.5 26.4 26C27.5 26.5 27.9 26.9 27.9 27.4C27.9 28.2 26.9 28.5 26 28.5C24.8 28.5 24.1 28.3 23.1 27.9L22.7 27.7L22.2 30.4C22.9 30.7 24.3 31 25.7 31C28.8 31 30.7 29.5 30.7 27.2C30.7 25.9 29.9 24.9 28.2 24.1C27.2 23.6 26.5 23.2 26.5 22.6C26.5 22.1 27 21.5 28.3 21.5C29.4 21.5 30.1 21.7 30.7 22L31 22.1L31.4 20Z" fill="white"/>
                    <path d="M36.1 19.8C35.6 19.8 35.2 19.9 34.9 20.5L30.5 28.2H33.6L34.2 26.6H37.9L38.3 28.2H41L38.6 19.8H36.1ZM35.1 24.5C35.3 24 36.2 21.6 36.2 21.6C36.2 21.6 36.4 21 36.6 20.6L36.8 21.5C36.8 21.5 37.4 24 37.5 24.5H35.1Z" fill="white"/>
                    <path d="M16.5 19.8L13.7 25.5L13.4 24C12.9 22.4 11.4 20.7 9.69995 19.8L12.3 28.2H15.5L19.7 19.8H16.5Z" fill="white"/>
                    <path d="M11.8 19.8H7.09998L7 20.1C10.7 21 13.2 23.3 14.1 26L13.1 20.5C12.9 19.9 12.4 19.8 11.8 19.8Z" fill="#FFC107"/>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <svg viewBox="0 0 48 48" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17" cy="24" r="12" fill="#EB001B"/>
                    <circle cx="31" cy="24" r="12" fill="#F79E1B"/>
                    <path d="M24 14.6C26.7 16.8 28.5 20.2 28.5 24C28.5 27.8 26.7 31.2 24 33.4C21.3 31.2 19.5 27.8 19.5 24C19.5 20.2 21.3 16.8 24 14.6Z" fill="#FF5F00"/>
                  </svg>
                </div>
                {/* Amex */}
                <div className="bg-[#006FCF] rounded px-2 py-1.5 h-8 flex items-center">
                  <span className="text-white text-[10px] font-bold tracking-tight">AMEX</span>
                </div>
                {/* Swish */}
                <div className="bg-white rounded px-2 py-1.5 h-8 flex items-center">
                  <svg viewBox="0 0 60 20" className="h-4 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 2C4 2 2 4.5 2 7.5C2 10.5 4 13 7.5 13C9 13 10 12.5 11 12L9.5 10C9 10.5 8.5 11 7.5 11C5.5 11 4.5 9.5 4.5 7.5C4.5 5.5 5.5 4 7.5 4C8.5 4 9 4.5 9.5 5L11 3C10 2.5 9 2 7.5 2Z" fill="#E30078"/>
                    <text x="14" y="12" fill="#E30078" fontSize="10" fontWeight="bold" fontFamily="Arial">swish</text>
                  </svg>
                </div>
              </div>
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
