import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hej och välkommen till Mathallen! 👋\n\nJag kan hjälpa dig med:\n• Öppettider\n• Adresser till våra butiker\n• Kontaktuppgifter\n\nSkriv din fråga så hjälper jag dig!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { type: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, { query: userMessage });
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: response.data.message, found: response.data.found },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Ursäkta, något gick fel. Försök igen senare eller kontakta oss direkt!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-stone-800 hover:bg-stone-700"
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

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 left-6 z-50 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
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
                <p className="text-red-100 text-xs">Fråga om våra produkter</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-red-600" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.type === "user"
                      ? "bg-red-600 text-white rounded-br-md"
                      : msg.found
                      ? "bg-green-100 text-green-900 rounded-bl-md"
                      : "bg-white text-stone-800 shadow-sm rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                {msg.type === "user" && (
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-stone-600" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-red-600" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-stone-100">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Sök efter en produkt..."
                className="flex-1 rounded-full border-stone-200 focus:border-red-500"
                disabled={loading}
                data-testid="chatbot-input"
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="rounded-full bg-red-600 hover:bg-red-700 w-10 h-10"
                data-testid="chatbot-send"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
