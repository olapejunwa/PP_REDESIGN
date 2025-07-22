import React from 'react';
import AnimatedSection from './AnimatedSection';
import AnimatedStarIcon from './AnimatedStarIcon';
import AnimatedTargetIcon from './AnimatedTargetIcon';
import AnimatedEyeIcon from './AnimatedEyeIcon';

const About: React.FC = () => {
  return (
    <AnimatedSection>
      {/* --- CHANGE: Added `relative` and removed background color class. --- */}
      <section id="about" className="relative py-20 overflow-hidden">
        {/* --- CHANGE: Added div for the gradient background. --- */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff, #27abed)',
            opacity: 0.3,
            zIndex: -1,
          }}
        />
        {/* --- CHANGE: Added `relative` to the content container to ensure it sits above the background. --- */}
        <div className="relative container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-100 mb-12">About Our Company</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="p-6">
              <div className="flex justify-center items-center mb-4">
                <AnimatedStarIcon className="w-12 h-12 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Our Mission</h3>
              <p className="text-gray-300">
                To empower businesses with innovative and intelligent software solutions that drive growth, efficiency, and success in a rapidly evolving digital landscape.
              </p>
            </div>

            <div className="p-6">
              <div className="flex justify-center items-center mb-4">
                <AnimatedEyeIcon className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Our Vision</h3>
              <p className="text-gray-300">
                To be the leading provider of AI-powered business management tools, recognized for our commitment to quality, customer satisfaction, and technological advancement.
              </p>
            </div>

            <div className="p-6">
              <div className="flex justify-center items-center mb-4">
                <AnimatedTargetIcon className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">Our Values</h3>
              <p className="text-gray-300">
                We are guided by principles of integrity, innovation, and collaboration, ensuring we deliver exceptional value and build lasting relationships with our clients.
              </p>
            </div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default About;
