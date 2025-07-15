import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import BookkeepingServices from './pages/BookkeepingServices';
import TaxServices from './pages/TaxServices';
import InventoryManagement from './pages/InventoryManagement';
import Products from './pages/Products';

const HomePage = () => (
  <div className="min-h-screen">
    <Navigation />
    <Hero />
    <Services />
    <About />
    <CTA />
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/bookkeeping-services" element={<BookkeepingServices />} />
        <Route path="/tax-services" element={<TaxServices />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;