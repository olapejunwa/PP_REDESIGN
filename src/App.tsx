import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import BookkeepingServices from './pages/BookkeepingServices';
import TaxServices from './pages/TaxServices';
import InventoryManagement from './pages/InventoryManagement';
import LavaLampBackground from './components/LavaLampBackground';
import PageTransition from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans relative">
      <LavaLampBackground />
      {/* Navigation is fixed and sits on top of everything, outside the main layout flow */}
      <Navigation />

      {/* This container uses flexbox to arrange main content and footer vertically and ensures it takes up the full screen height. */}
      <div className="flex flex-col min-h-screen">
        {/* 1. The main content area grows to fill available space, pushing the footer down. */}
        {/* 2. No pt-20 here since each page handles its own top spacing. */}
        <main className="flex-grow">
          {/* 3. This relative container is the positioning context for the absolutely positioned pages during transition. */}
          <div className="relative h-full w-full">
            <AnimatePresence mode="wait">
              {/* The key on Routes triggers the animation when the page (location) changes. */}
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                <Route path="/about" element={<PageTransition><AboutUs /></PageTransition>} />
                <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
                <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/services/bookkeeping" element={<PageTransition><BookkeepingServices /></PageTransition>} />
                <Route path="/services/tax" element={<PageTransition><TaxServices /></PageTransition>} />
                <Route path="/services/inventory" element={<PageTransition><InventoryManagement /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>
        {/* Footer is the last flex item, it will be at the bottom */}
        <Footer />
      </div>
    </div>
  );
}

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;
