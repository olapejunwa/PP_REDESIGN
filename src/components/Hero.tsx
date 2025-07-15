import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      {/* Linear gradient overlay with 28% transparency */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.28) 0%, rgba(39, 171, 237, 0.28) 100%)'
        }}
      ></div>
      
      {/* Base blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"></div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-20"></div>
      
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              YOUR PARTNER IN
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
              BOOKKEEPING SUCCESS
            </h2>
          </div>
          
          <div className="mt-12">
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Empowering businesses with simplified financial management solutions and expert guidance for sustainable growth.
            </p>
          </div>
          
          <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors duration-200 shadow-lg text-center">
              Get Started
            </Link>
            <Link to="/about-us" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-600 transition-colors duration-200 text-center">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl z-20"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl z-20"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl z-20"></div>
    </section>
  );
};

export default Hero;