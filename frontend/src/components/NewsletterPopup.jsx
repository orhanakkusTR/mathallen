import { useState, useEffect } from "react";
import { X, Mail, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // Check if user has already subscribed
    const hasSubscribed = localStorage.getItem("newsletter_subscribed");
    
    if (hasSubscribed) {
      return; // Don't show if already subscribed
    }
    
    // Check if user has dismissed the popup before
    const lastDismissed = localStorage.getItem("newsletter_popup_dismissed");
    
    if (lastDismissed) {
      // Show minimized version immediately
      setIsVisible(true);
      setIsMinimized(true);
      return;
    }

    // Show full popup after 7 seconds for first-time visitors
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Instead of hiding completely, minimize to the side
    setIsMinimized(true);
    localStorage.setItem("newsletter_popup_dismissed", Date.now().toString());
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      setSubscribed(true);
      localStorage.setItem("newsletter_subscribed", "true");
      toast.success("Tack för din prenumeration!");
      
      // Auto close after success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      if (error.response?.status === 400) {
        toast.info("Du är redan prenumerant!");
      } else {
        toast.error("Något gick fel. Försök igen.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  // Minimized state - small floating button on right side
  if (isMinimized) {
    return (
      <div 
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 animate-slide-in-from-right"
        data-testid="newsletter-popup-minimized"
      >
        <button
          onClick={handleExpand}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-4 rounded-l-xl shadow-2xl flex flex-col items-center gap-2 transition-all hover:px-4 group"
          data-testid="newsletter-expand-button"
        >
          <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <Mail className="w-5 h-5" />
          <span className="writing-vertical text-xs font-medium tracking-wider">ERBJUDANDEN</span>
        </button>
      </div>
    );
  }

  // Full popup state
  return (
    <div 
      className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 animate-popup-appear"
      data-testid="newsletter-popup"
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-[320px] md:w-[380px] border border-stone-200">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-4 relative">
          <button
            onClick={handleMinimize}
            className="absolute right-12 top-4 text-white/80 hover:text-white transition-colors"
            title="Minimera"
            data-testid="newsletter-minimize-button"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            title="Stäng"
            data-testid="newsletter-close-button"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">
                Missa aldrig ett erbjudande!
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {subscribed ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-stone-900 text-lg mb-2">Tack!</h4>
              <p className="text-stone-600 text-sm">
                Du kommer nu få våra bästa erbjudanden direkt i din inkorg.
              </p>
            </div>
          ) : (
            <>
              <p className="text-stone-600 text-sm mb-5 leading-relaxed">
                Prenumerera på vårt nyhetsbrev och få veckans bästa kampanjer direkt i din inkorg. 
                <span className="font-semibold text-red-600"> Helt gratis!</span>
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type="email"
                    placeholder="Din e-postadress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-11 h-12 rounded-xl border-stone-300 focus:border-red-500 focus:ring-red-500"
                    data-testid="newsletter-popup-email"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg"
                  data-testid="newsletter-popup-submit"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Skickar...
                    </span>
                  ) : (
                    "Prenumerera nu"
                  )}
                </Button>
              </form>
              
              <p className="text-xs text-stone-400 mt-4 text-center">
                Vi respekterar din integritet. Avsluta när du vill.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
