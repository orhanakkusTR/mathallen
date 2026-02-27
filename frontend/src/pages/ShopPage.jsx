import { ShoppingCart, Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import SEO from "@/components/SEO";

export default function ShopPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      toast.success("Tack! Vi meddelar dig när shoppen öppnar.");
      setEmail("");
    }
  };

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center py-16">
          {/* Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Bell className="w-4 h-4" />
            KOMMER SNART
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Online Shop
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-8">
            Snart kan du handla dina favoritprodukter online!
          </p>

          {/* Description */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-lg mx-auto">
            <p className="text-stone-200 leading-relaxed">
              Vi arbetar hårt för att ge dig möjligheten att handla bekvämt hemifrån. 
              Samma kvalitet, samma priser, samma fantastiska erbjudanden – 
              direkt till din dörr i Malmö.
            </p>
          </div>

          {/* Email Signup */}
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-3 justify-center">
              <Mail className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-bold text-stone-900">
                Bli först att få veta!
              </h3>
            </div>
            <p className="text-stone-600 text-sm mb-4">
              Lämna din e-post så meddelar vi dig när shoppen öppnar.
            </p>
            
            {submitted ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg font-medium">
                ✓ Tack! Du kommer få ett mail när vi lanserar.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Din e-postadress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap">
                  Meddela mig
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-900 mb-12">
            Vad kan du förvänta dig?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-stone-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-stone-900 text-lg text-center mb-3">Samma kvalitet</h3>
              <p className="text-stone-600 text-sm text-center">
                Alla produkter du älskar från våra butiker, nu tillgängliga online.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-stone-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-stone-900 text-lg text-center mb-3">Bra priser</h3>
              <p className="text-stone-600 text-sm text-center">
                Samma förmånliga priser och veckans erbjudanden som i butik.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-stone-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h3 className="font-bold text-stone-900 text-lg text-center mb-3">Hemleverans</h3>
              <p className="text-stone-600 text-sm text-center">
                Bekväm leverans direkt till din dörr i Malmö-området.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
