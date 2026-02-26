import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/erbjudanden", label: "Veckans erbjudanden" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/shop", label: "Shop" },
];

const LOGO_URL = "https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/rjew2rjo_logo-beyaz2.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar - White with red text */}
      <div className="bg-white text-red-600 py-2.5 text-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Desktop */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/kontakt" className="flex items-center gap-2 hover:text-red-700 transition-colors">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Lantmannagatan 59, Malmö</span>
              </Link>
              <span className="w-px h-4 bg-red-200" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>Öppet: 07–22</span>
              </span>
              <span className="w-px h-4 bg-red-200" />
              <a href="tel:+46409244 20" className="flex items-center gap-2 hover:text-red-700 transition-colors">
                <Phone className="w-4 h-4 text-red-500" />
                <span>040-92 44 20</span>
              </a>
            </div>
            <div className="text-red-500 font-medium">
              Nya erbjudanden varje vecka!
            </div>
          </div>
          
          {/* Mobile */}
          <div className="sm:hidden flex items-center justify-center gap-3 text-xs">
            <Link to="/kontakt" className="flex items-center gap-1.5 hover:text-red-700">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Malmö</span>
            </Link>
            <span className="w-px h-3.5 bg-red-200" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>07–22</span>
            </span>
            <span className="w-px h-3.5 bg-red-200" />
            <a href="tel:+4640924420" className="flex items-center gap-1.5 hover:text-red-700">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>040-92 44 20</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header - Red */}
      <div className="bg-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center group"
              data-testid="logo-link"
            >
              <img 
                src={LOGO_URL} 
                alt="Mathallen Malmö" 
                className="h-12 md:h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-testid={`nav-${link.href.replace("/", "") || "home"}`}
                  className={`relative px-4 py-2 rounded-full text-base font-semibold transition-colors ${
                    location.pathname === link.href
                      ? "text-white bg-red-700"
                      : "text-white/90 hover:text-white hover:bg-red-700/50"
                  }`}
                >
                  {link.href === "/erbjudanden" && (
                    <span className="absolute -top-4 -right-1 bg-yellow-400 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
                      REA
                    </span>
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                asChild
                className="bg-white hover:bg-stone-100 text-red-600 rounded-full px-6 shadow-lg font-semibold"
                data-testid="header-cta-button"
              >
                <Link to="/erbjudanden">Se erbjudanden</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-red-700 transition-colors"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 mobile-menu-enter">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-nav-${link.href.replace("/", "") || "home"}`}
                className={`relative px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-red-600 bg-red-50"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                {link.href === "/erbjudanden" && (
                  <span className="absolute top-2 right-3 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                    REA
                  </span>
                )}
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
              data-testid="mobile-cta-button"
            >
              <Link to="/erbjudanden" onClick={() => setMobileMenuOpen(false)}>
                Se veckans erbjudanden
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
