import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Transform Your Financial Management?
        </h2>
        <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
          Join thousands of businesses that trust Ploutos Page for their bookkeeping and financial management needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Get Started Today
          </Link>
          <Link 
            to="/about-us" 
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;