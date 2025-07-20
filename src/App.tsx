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
    // 1. Added overflow-x-hidden to prevent scrollbars during animation.
    // 2. Made it a flex container to create a robust layout that doesn't collapse.
    <div className="bg-gray-900 text-white min-h-screen font-sans relative overflow-x-hidden flex flex-col">
      <LavaLampBackground />
      {/* This wrapper ensures the footer stays at the bottom by allowing the main content to grow. */}
      <div className="relative z-10 flex flex-col flex-grow">
        <Navigation />
        {/* 3. Made main container grow to fill space and relative for positioning context. */}
        <main className="pt-20 relative flex-grow">
          <AnimatePresence mode="wait">
            {/* 4. The key on Routes triggers the animation when the page (location) changes. */}
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
        </main>
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
