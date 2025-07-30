import React from 'react';
import { Link } from 'react-router-dom';
import LavaLampBackground from './LavaLampBackground';
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Lava Lamp Background */}
      <LavaLampBackground />
      
      {/* Content - Properly centered both horizontally and vertically */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animationType="fadeUp" delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-primary font-unified-bold text-gray-900 leading-unified-tight">
             Simplifying Finance for  
            
            </h1>
          </AnimatedSection>
          
          <AnimatedSection animationType="fadeUp" delay={400}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-unified-bold text-gray-900 mt-2 leading-unified-tight">
              Businesses at Any Level.
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animationType="fadeUp" delay={600}>
            <p className="mt-8 text-unified-lg md:text-unified-xl font-primary font-unified-bold text-gray-800 max-w-3xl mx-auto leading-unified-relaxed">
              Empowering businesses with simplified financial management solutions and expert guidance for sustainable growth.
            </p>
          </AnimatedSection>
          
          <AnimatedSection animationType="fadeUp" delay={800}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-primary font-unified-semibold text-unified-base hover:bg-gray-200 transition-colors duration-200 shadow-lg"
              >
                Get Started
              </Link>
              <Link 
                to="/about-us" 
                className="border-2 border-gray-800 text-gray-900 px-8 py-3 rounded-lg font-primary font-unified-semibold text-unified-base hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;