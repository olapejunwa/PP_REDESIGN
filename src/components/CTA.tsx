import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to Transform Your Financial Management?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of businesses that trust Ploutos Page for their bookkeeping and financial management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold text-base hover:bg-gray-50 transition-colors duration-200 shadow-lg flex items-center justify-center space-x-2">
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;