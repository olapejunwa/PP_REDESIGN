import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import TaxServices from "./pages/TaxServices";
import BookkeepingServices from "./pages/BookkeepingServices";
import InventoryManagement from "./pages/InventoryManagement";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  const { pathname } = useLocation();

  // FIX: This useEffect hook listens for changes in the URL's pathname.
  // When the pathname changes (i.e., you navigate to a new page),
  // it scrolls the window to the top (0, 0).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const location = useLocation();

  return (
    <div className="bg-primary-light dark:bg-primary-dark">
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<HomePage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/tax-services" element={<TaxServices />} />
          <Route
            path="/bookkeeping-services"
            element={<BookkeepingServices />}
          />
          <Route
            path="/inventory-management"
            element={<InventoryManagement />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
