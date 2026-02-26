import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import OffersPage from "@/pages/OffersPage";
import ShopPage from "@/pages/ShopPage";
import ContactPage from "@/pages/ContactPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AllmannaVillkorPage from "@/pages/AllmannaVillkorPage";
import DataskyddPage from "@/pages/DataskyddPage";
import TillganglighetPage from "@/pages/TillganglighetPage";
import IntegritetspolicyPage from "@/pages/IntegritetspolicyPage";

// Layout & Utils
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/om-oss" element={<AboutPage />} />
            <Route path="/erbjudanden" element={<OffersPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/allmanna-villkor" element={<AllmannaVillkorPage />} />
            <Route path="/dataskydd" element={<DataskyddPage />} />
            <Route path="/tillganglighet" element={<TillganglighetPage />} />
            <Route path="/integritetspolicy" element={<IntegritetspolicyPage />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
