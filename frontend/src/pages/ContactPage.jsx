import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success("Tack för ditt meddelande! Vi återkommer så snart vi kan.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Något gick fel. Försök igen senare.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="bg-gradient-to-br from-stone-100 to-red-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-red-600 font-medium text-sm mb-4 bg-red-100 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              Kontakta oss
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.1] mb-6">
              Hitta till <span className="text-red-600">Mathallen</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
              Vi finns i centrala Malmö och välkomnar dig varje dag. 
              Har du frågor? Tveka inte att höra av dig!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-8">
                Besöksinformation
              </h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl" data-testid="contact-address">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Adress</h3>
                    <p className="text-stone-600">
                      Lantmannagatan 59,<br />
                      Lugna gatan 2,<br />
                      214 48 Malmö
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl" data-testid="contact-phone">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Telefon</h3>
                    <a href="tel:+46409244220" className="text-red-600 hover:text-red-700 font-medium">
                      040-92 44 20
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl" data-testid="contact-email">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">E-post</h3>
                    <a href="mailto:info@mathallen.se" className="text-red-600 hover:text-red-700 font-medium">
                      info@mathallen.se
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl" data-testid="contact-hours">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Öppettider</h3>
                    <div className="text-stone-600 space-y-1">
                      <p>Alla dagar: 07:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-200" data-testid="contact-map">
                <iframe
                  title="Mathallen Malmö Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.5!2d13.0182!3d55.5872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a3f1c9d3d3d3%3A0x0!2sLantmannagatan%2059%2C%20214%2048%20Malm%C3%B6!5e0!3m2!1ssv!2sse!4v1700000000000!5m2!1ssv!2sse"
                  width="100%"
                  height="300"
                  style={{ border: 0, filter: "saturate(0.9) contrast(1.05)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-8">
                Skicka ett meddelande
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center" data-testid="contact-success">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    Tack för ditt meddelande!
                  </h3>
                  <p className="text-green-700 mb-6">
                    Vi har tagit emot din förfrågan och återkommer så snart vi kan.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-full border-green-300 text-green-700 hover:bg-green-100"
                    data-testid="send-another-button"
                  >
                    Skicka ett nytt meddelande
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-stone-700 font-medium">
                      Namn *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ditt namn"
                      className="rounded-xl border-stone-200 focus:border-red-500 focus:ring-red-500"
                      data-testid="contact-name-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-stone-700 font-medium">
                      E-post *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="din@email.se"
                      className="rounded-xl border-stone-200 focus:border-red-500 focus:ring-red-500"
                      data-testid="contact-email-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-stone-700 font-medium">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="070-123 45 67"
                      className="rounded-xl border-stone-200 focus:border-red-500 focus:ring-red-500"
                      data-testid="contact-phone-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-stone-700 font-medium">
                      Meddelande *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Hur kan vi hjälpa dig?"
                      rows={5}
                      className="rounded-xl border-stone-200 focus:border-red-500 focus:ring-red-500 resize-none"
                      data-testid="contact-message-input"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full py-6 text-lg font-semibold shadow-lg shadow-red-500/20"
                    data-testid="contact-submit-button"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="spinner" />
                        Skickar...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Skicka meddelande
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
