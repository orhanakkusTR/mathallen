import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* pt accounts for fixed header height: mobile ~97px, desktop ~121px */}
      <main className="flex-1 pt-[97px] md:pt-[121px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
