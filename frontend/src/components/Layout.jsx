import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NewsletterPopup from "./NewsletterPopup";

export default function Layout() {
  const location = useLocation();
  const isAboutPage = location.pathname === "/om-oss";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* pt accounts for fixed header height */}
      <main className="flex-1 pt-[93px] md:pt-[117px]">
        <Outlet />
      </main>
      <Footer variant={isAboutPage ? "red" : "default"} />
      <NewsletterPopup />
    </div>
  );
}
