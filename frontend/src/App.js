import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import OffersPage from "@/pages/OffersPage";
import ContactPage from "@/pages/ContactPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

// Layout
import Layout from "@/components/Layout";

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/om-oss" element={<AboutPage />} />
            <Route path="/erbjudanden" element={<OffersPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
