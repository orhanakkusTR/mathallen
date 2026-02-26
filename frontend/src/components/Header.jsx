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

const LOGO_URL = "https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/3458r0m2_logo-mat.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar - Red */}
      <div className="bg-red-600 text-white py-2.5 text-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Desktop */}
          <div className="hidden sm:flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/kontakt" className="flex items-center gap-2 hover:text-red-100 transition-colors">
                <MapPin className="w-4 h-4 text-red-200" />
                <span>Lantmannagatan 59, Malmö</span>
              </Link>
              <span className="w-px h-4 bg-red-400" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-200" />
                <span>Öppet: 07–22</span>
              </span>
              <span className="w-px h-4 bg-red-400" />
              <a href="tel:+46409244 20" className="flex items-center gap-2 hover:text-red-100 transition-colors">
                <Phone className="w-4 h-4 text-red-200" />
                <span>040-92 44 20</span>
              </a>
            </div>
            <div className="text-red-100 font-medium">
              Nya erbjudanden varje vecka!
            </div>
          </div>
          
          {/* Mobile */}
          <div className="sm:hidden flex items-center justify-center gap-3 text-xs">
            <Link to="/kontakt" className="flex items-center gap-1.5 hover:text-red-100">
              <MapPin className="w-3.5 h-3.5 text-red-200" />
              <span>Malmö</span>
            </Link>
            <span className="w-px h-3.5 bg-red-400" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-200" />
              <span>07–22</span>
            </span>
            <span className="w-px h-3.5 bg-red-400" />
            <a href="tel:+4640924420" className="flex items-center gap-1.5 hover:text-red-100">
              <Phone className="w-3.5 h-3.5 text-red-200" />
              <span>040-92 44 20</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header - White */}
      <div className="bg-white shadow-sm border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with red background extension */}
            <Link 
              to="/" 
              className="flex items-center group relative"
              data-testid="logo-link"
            >
              {/* Red background behind logo */}
              <div className="absolute -left-4 md:-left-8 -top-0 -bottom-0 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)] bg-red-600 -z-10 hidden md:block" style={{height: 'calc(100% + 2.5rem)', top: '-1.25rem'}}></div>
              <img 
                src={LOGO_URL} 
                alt="Mathallen Malmö" 
                className="h-12 md:h-16 w-auto relative z-10"
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
                    ? "text-red-600 bg-red-50"
                    : "text-stone-700 hover:text-red-600 hover:bg-stone-50"
                }`}
              >
                {link.href === "/erbjudanden" && (
                  <span className="absolute -top-4 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
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
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 shadow-lg shadow-red-500/20"
              data-testid="header-cta-button"
            >
              <Link to="/erbjudanden">Se erbjudanden</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-stone-700" />
            ) : (
              <Menu className="w-6 h-6 text-stone-700" />
            )}
          </button>
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
