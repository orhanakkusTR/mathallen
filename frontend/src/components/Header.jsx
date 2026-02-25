import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/erbjudanden", label: "Veckans erbjudanden" },
  { href: "/sortiment", label: "Sortiment" },
  { href: "/kontakt", label: "Kontakt" },
];

const LOGO_URL = "https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/3458r0m2_logo-mat.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-stone-100/50">
      {/* Top bar */}
      <div className="bg-red-600 text-white py-2 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/kontakt" className="flex items-center gap-2 sm:gap-6 hover:text-red-100 transition-colors">
            <span className="flex items-center gap-1 sm:gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-red-200 flex-shrink-0" />
              <span className="hidden sm:inline">Lantmannagatan 59, Malmö</span>
              <span className="sm:hidden">Lantmannagatan 59, Malmö</span>
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-red-200 flex-shrink-0" />
              <span className="hidden sm:inline">Öppet: 07–22</span>
              <span className="sm:hidden">07–22</span>
            </span>
          </Link>
          <div className="text-red-100 font-medium flex-shrink-0 hidden sm:block">
            Nya erbjudanden varje vecka!
          </div>
        </div>
      </div>

      {/* Main header */}
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
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-red-600 bg-red-50"
                    : "text-stone-600 hover:text-red-600 hover:bg-stone-50"
                }`}
              >
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
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  location.pathname === link.href
                    ? "text-red-600 bg-red-50"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
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
