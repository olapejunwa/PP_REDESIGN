import React from 'react';
import { Link } from 'react-router-dom';
import LavaLampBackground from './LavaLampBackground';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Lava Lamp Background */}
      <LavaLampBackground />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          YOUR PARTNER IN
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-2 leading-tight">
          BOOKKEEPING SUCCESS
        </h2>
        
        <p className="mt-8 text-lg md:text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          Empowering businesses with simplified financial management solutions and expert guidance for sustainable growth.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-base hover:bg-gray-200 transition-colors duration-200 shadow-lg"
          >
            Get Started
          </Link>
          <Link 
            to="/about-us" 
            className="border-2 border-gray-800 text-gray-900 px-8 py-3 rounded-lg font-semibold text-base hover:bg-gray-900 hover:text-white transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
