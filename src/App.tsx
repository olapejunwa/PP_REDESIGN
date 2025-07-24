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

  // Enhanced scroll-to-top implementation
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is fully rendered
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Immediate scroll, no smooth animation
      });
    };

    // Multiple approaches to ensure scroll works
    scrollToTop(); // Immediate scroll
    
    // Backup scroll after a short delay for slow-loading content
    const timeoutId = setTimeout(scrollToTop, 100);
    
    // Additional scroll after animation frame for React rendering
    const rafId = requestAnimationFrame(scrollToTop);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
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
