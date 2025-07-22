import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Send } from 'lucide-react';

const InventoryManagement = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold mb-4">Product & Services</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Inventory Management
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Simplify inventory tracking, manage stock levels, and optimize inventory turnover with our advanced inventory management solutions. Stay on top of stock levels, reduce costs, and improve efficiency.
          </p>
        </div>
      </section>

      {/* Assessment Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Get Your Custom Inventory Management Quote
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                Help us understand your inventory needs to provide you with the most suitable management solution and pricing.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your business name"
                  />
                </div>

                <div>
                  <label htmlFor="inventorySize" className="block text-sm font-medium text-gray-700 mb-2">
                    Inventory Size *
                  </label>
                  <select
                    id="inventorySize"
                    name="inventorySize"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select inventory size</option>
                    <option value="under-50">Under 50 items</option>
                    <option value="50-200">50-200 items</option>
                    <option value="200-500">200-500 items</option>
                    <option value="500-1000">500-1000 items</option>
                    <option value="over-1000">Over 1000 items</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="turnoverRate" className="block text-sm font-medium text-gray-700 mb-2">
                    Inventory Turnover Rate *
                  </label>
                  <select
                    id="turnoverRate"
                    name="turnoverRate"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select turnover rate</option>
                    <option value="low">Low (Quarterly/Yearly)</option>
                    <option value="moderate">Moderate (Monthly)</option>
                    <option value="high">High (Weekly)</option>
                    <option value="very-high">Very High (Daily)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    id="businessType"
                    name="businessType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select business type</option>
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="restaurant">Restaurant/Food Service</option>
                    <option value="e-commerce">E-commerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="trackingNeeds" className="block text-sm font-medium text-gray-700 mb-2">
                    Tracking Requirements
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" name="tracking" value="real-time" className="mr-2" />
                      <span className="text-sm">Real-time tracking</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="tracking" value="automated-reordering" className="mr-2" />
                      <span className="text-sm">Automated reordering</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="tracking" value="integration" className="mr-2" />
                      <span className="text-sm">Integration with accounting software</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="tracking" value="analytics" className="mr-2" />
                      <span className="text-sm">Advanced analytics & forecasting</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Get Custom Quote</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InventoryManagement;