import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* pt accounts for fixed header height: top bar (~41px) + main nav (~80px) = ~121px */}
      <main className="flex-1 pt-[121px] md:pt-[121px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
