import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBasket, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/erbjudanden", label: "Veckans erbjudanden" },
  { href: "/sortiment", label: "Sortiment" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 glass-header border-b border-stone-100/50">
      {/* Top bar */}
      <div className="bg-stone-900 text-stone-100 py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Storgatan 45, Malmö</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Mån-Lör: 08-21, Sön: 10-20</span>
            </span>
          </div>
          <div className="text-amber-400 font-medium">
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
            className="flex items-center gap-3 group"
            data-testid="logo-link"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-shadow">
              <ShoppingBasket className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-stone-900 tracking-tight">
                Mathallen
              </h1>
              <p className="text-xs text-stone-500 -mt-1 hidden md:block">MALMÖ</p>
            </div>
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
                    ? "text-orange-600 bg-orange-50"
                    : "text-stone-600 hover:text-orange-600 hover:bg-stone-50"
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
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 shadow-lg shadow-orange-500/20"
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
                    ? "text-orange-600 bg-orange-50"
                    : "text-stone-700 hover:bg-stone-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
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
