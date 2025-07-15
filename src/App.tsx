import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import BookkeepingServices from './pages/BookkeepingServices';
import TaxServices from './pages/TaxServices';
import InventoryManagement from './pages/InventoryManagement';
import Contact from './pages/Contact';
import Careers from './pages/Careers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/bookkeeping-services" element={<BookkeepingServices />} />
        <Route path="/tax-services" element={<TaxServices />} />
        <Route path="/inventory-management" element={<InventoryManagement />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </Router>
  );
}

export default App;