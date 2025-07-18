import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-matte-black">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Footer />
    </div>
  );
};

export default HomePage;
