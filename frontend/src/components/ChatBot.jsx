import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, MapPin, Clock, Phone, User, Mail, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STORES = [
  {
    name: "Mathallen Malmö",
    address: "Lantmannagatan 59, 214 48 Malmö",
    phone: "040-92 44 20"
  },
  {
    name: "Mathallen Lugnet",
    address: "Lugna gatan 2, 211 60 Malmö",
    phone: "040-92 44 20"
  }
];

const QUICK_ACTIONS = [
  { id: "hours", label: "Öppettider", icon: Clock },
  { id: "location", label: "Hitta oss", icon: MapPin },
  { id: "contact", label: "Kontakt", icon: Phone },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("welcome"); // welcome, chat, form, success
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  const handleQuickAction = (actionId) => {
    setView(actionId);
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitting(true);
    try {
      await axios.post(`${API}/chat/lead`, formData);
      setView("success");
      setFormData({ name: "", email: "" });
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderWelcome = () => (
    <div className="p-5 space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Bot className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="font-bold text-stone-900 text-lg">Välkommen! 👋</h3>
        <p className="text-stone-500 text-sm mt-1">Hur kan vi hjälpa dig idag?</p>
      </div>

      <div className="space-y-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            onClick={() => handleQuickAction(action.id)}
            className="w-full flex items-center gap-3 p-3 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors text-left group"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow">
              <action.icon className="w-5 h-5 text-red-600" />
            </div>
            <span className="font-medium text-stone-700 flex-1">{action.label}</span>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-red-600" />
          </button>
        ))}
      </div>

      <div className="pt-4 border-t border-stone-100">
        <button
          onClick={() => setView("form")}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          Lämna dina uppgifter
        </button>
        <p className="text-center text-xs text-stone-400 mt-2">
          Så kontaktar vi dig
        </p>
      </div>
    </div>
  );

  const renderHours = () => (
    <div className="p-5 space-y-4">
      <button onClick={() => setView("welcome")} className="text-red-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
        ← Tillbaka
      </button>
      
      <div className="bg-red-50 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900">Öppettider</h3>
            <p className="text-stone-500 text-sm">Alla våra butiker</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-stone-600">Alla dagar</span>
            <span className="font-bold text-stone-900 text-lg">07:00 - 22:00</span>
          </div>
        </div>
      </div>

      <p className="text-center text-stone-500 text-sm">
        Välkommen in! Vi ser fram emot ditt besök.
      </p>
    </div>
  );

  const renderLocation = () => (
    <div className="p-5 space-y-4">
      <button onClick={() => setView("welcome")} className="text-red-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
        ← Tillbaka
      </button>
      
      <h3 className="font-bold text-stone-900 text-lg">Våra butiker</h3>
      
      <div className="space-y-3">
        {STORES.map((store, index) => (
          <div key={index} className="bg-stone-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-stone-900">{store.name}</h4>
                <p className="text-stone-500 text-sm mt-1">{store.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="p-5 space-y-4">
      <button onClick={() => setView("welcome")} className="text-red-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
        ← Tillbaka
      </button>
      
      <h3 className="font-bold text-stone-900 text-lg">Kontakta oss</h3>
      
      <div className="space-y-3">
        {STORES.map((store, index) => (
          <div key={index} className="bg-stone-50 rounded-xl p-4">
            <h4 className="font-semibold text-stone-900 mb-2">{store.name}</h4>
            <a 
              href={`tel:${store.phone.replace(/-/g, '')}`}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <Phone className="w-4 h-4" />
              {store.phone}
            </a>
            <p className="text-stone-500 text-sm mt-1">{store.address}</p>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button
          onClick={() => setView("form")}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          Eller lämna dina uppgifter
        </button>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="p-5 space-y-4">
      <button onClick={() => setView("welcome")} className="text-red-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
        ← Tillbaka
      </button>
      
      <div className="text-center mb-2">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail className="w-7 h-7 text-red-600" />
        </div>
        <h3 className="font-bold text-stone-900 text-lg">Lämna dina uppgifter</h3>
        <p className="text-stone-500 text-sm mt-1">Så hör vi av oss till dig</p>
      </div>

      <form onSubmit={handleSubmitLead} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Namn</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ditt namn"
              className="pl-10 rounded-xl"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">E-post</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="din@email.se"
              className="pl-10 rounded-xl"
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6 mt-2"
        >
          {submitting ? "Skickar..." : "Skicka"}
        </Button>
      </form>

      <p className="text-center text-xs text-stone-400">
        Vi respekterar din integritet och spammar aldrig.
      </p>
    </div>
  );

  const renderSuccess = () => (
    <div className="p-5 text-center space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="font-bold text-stone-900 text-lg">Tack!</h3>
      <p className="text-stone-500">
        Vi har tagit emot dina uppgifter och hör av oss snart.
      </p>
      <Button
        onClick={() => setView("welcome")}
        variant="outline"
        className="rounded-xl"
      >
        Tillbaka till start
      </Button>
    </div>
  );

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-stone-800 hover:bg-stone-700 rotate-0"
            : "bg-red-600 hover:bg-red-700 hover:scale-110"
        }`}
        data-testid="chatbot-toggle"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Notification badge */}
      {!isOpen && (
        <div className="fixed bottom-[72px] left-6 z-50 animate-bounce">
          <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-sm font-medium text-stone-700">
            Hej! Behöver du hjälp? 👋
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 z-50 w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
          data-testid="chatbot-window"
        >
          {/* Header */}
          <div className="bg-red-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Mathallens Assistent</h3>
                <p className="text-red-100 text-xs">Vi svarar direkt</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[420px] overflow-y-auto">
            {view === "welcome" && renderWelcome()}
            {view === "hours" && renderHours()}
            {view === "location" && renderLocation()}
            {view === "contact" && renderContact()}
            {view === "form" && renderForm()}
            {view === "success" && renderSuccess()}
          </div>
        </div>
      )}
    </>
  );
}
