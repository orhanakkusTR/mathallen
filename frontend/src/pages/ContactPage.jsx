import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Tag } from "lucide-react";
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
      {/* Hero - Split Layout */}
      <section className="relative bg-stone-900 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
          {/* Left - Content */}
          <div className="flex flex-col justify-center px-6 md:px-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16 py-12 md:py-16 order-2 md:order-1">
            <span className="inline-flex items-center gap-2 text-red-400 font-medium text-sm mb-4 bg-red-500/10 px-4 py-2 rounded-full w-fit">
              <MapPin className="w-4 h-4" />
              Kontakta oss
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 md:mb-8">
              Har du <span className="text-red-500">frågor?</span>
            </h1>
            <div className="flex flex-wrap gap-3">
              <a 
                href="tel:+46409244220" 
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <Phone className="w-4 h-4" />
                Ring till oss
              </a>
              <a 
                href="#stores" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-colors backdrop-blur-sm"
              >
                <MapPin className="w-4 h-4" />
                Hitta butik
              </a>
            </div>
          </div>
          
          {/* Right - Video (full bleed) */}
          <div className="relative h-56 sm:h-64 md:h-auto order-1 md:order-2">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1753354868473-94c8ac971269?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200"
            >
              <source src="https://customer-assets.emergentagent.com/job_stormarknad-malmo/artifacts/djuy8tlu_video-3.mov" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-stone-900/60 via-transparent to-transparent md:from-stone-900 md:via-transparent md:to-transparent" />
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
                Kontaktinformation
              </h2>
              
              <div className="space-y-6">
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
                    <a href="mailto:info@mathallen.nu" className="text-red-600 hover:text-red-700 font-medium">
                      info@mathallen.nu
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

                {/* Veckans erbjudanden box */}
                <Link 
                  to="/erbjudanden"
                  className="block mt-2 p-6 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl text-white hover:from-red-700 hover:to-red-800 transition-all group"
                  data-testid="contact-offers-box"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-200 text-sm font-medium mb-1">Missa inte</p>
                      <h3 className="text-2xl font-bold mb-2">Veckans erbjudanden</h3>
                      <p className="text-red-100 text-sm">Se våra bästa priser just nu →</p>
                    </div>
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Tag className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </Link>
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

      {/* Two Stores Section */}
      <section id="stores" className="bg-stone-100">
        <div className="grid md:grid-cols-2">
          {/* Store 1 - Mathallen Malmö */}
          <div className="bg-stone-900 text-white p-8 md:p-12" data-testid="store-malmo">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Mathallen Malmö</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-stone-300">
                  Lantmannagatan 59,<br />
                  214 48 Malmö
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <a href="tel:+46409244220" className="text-stone-300 hover:text-white transition-colors">
                  040-92 44 20
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-stone-300">Alla dagar: 07:00 - 22:00</p>
              </div>
            </div>
          </div>

          {/* Store 2 - Mathallen Lugnet */}
          <div className="bg-red-600 text-white p-8 md:p-12" data-testid="store-lugnet">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Mathallen Lugnet</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
                <p className="text-red-100">
                  Lugna gatan 2,<br />
                  211 60 Malmö
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-200 flex-shrink-0" />
                <a href="tel:+46409244220" className="text-red-100 hover:text-white transition-colors">
                  040-92 44 20
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-200 flex-shrink-0" />
                <p className="text-red-100">Alla dagar: 07:00 - 22:00</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Single Full Width Map */}
        <div className="h-[350px] md:h-[400px]">
          <iframe
            title="Mathallen Malmö Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.5!2d13.0182!3d55.5872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a3f1c9d3d3d3%3A0x0!2sLantmannagatan%2059%2C%20214%2048%20Malm%C3%B6!5e0!3m2!1ssv!2sse!4v1700000000000!5m2!1ssv!2sse"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
