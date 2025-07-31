import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Send } from 'lucide-react';

const TaxServices = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      service_type: 'tax_services',
      business_name: formData.get('businessName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      business_type: formData.get('businessType'),
      annual_revenue: formData.get('annualRevenue'),
      years_in_operation: formData.get('yearsInOperation'),
      tax_complexity: formData.get('taxComplexity'),
      submitted_at: new Date().toISOString()
    };
    
    // TODO: Submit to Supabase
    console.log('Tax Services Form Data:', data);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold mb-4">Services</p>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Tax Services
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto">
            Navigate the complexities of tax compliance with ease. Our tax experts offer comprehensive tax planning, preparation, and filing services to ensure compliance with tax regulations and maximize tax savings.
          </p>
        </div>
      </section>

      {/* Assessment Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Get Your Custom Tax Services Quote
              </h2>
              <p className="text-sm md:text-lg text-gray-600 mb-8 text-center">
                Help us understand your business needs to provide you with the most suitable tax service package and pricing.
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
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
                    <option value="">Select your business type</option>
                    <option value="sole-proprietorship">Sole Proprietorship</option>
                    <option value="partnership">Partnership</option>
                    <option value="limited-company">Limited Company</option>
                    <option value="corporation">Corporation</option>
                    <option value="non-profit">Non-Profit Organization</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Revenue Range *
                  </label>
                  <select
                    id="annualRevenue"
                    name="annualRevenue"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select revenue range</option>
                    <option value="under-1m">Under ₦1 Million</option>
                    <option value="1m-5m">₦1 Million - ₦5 Million</option>
                    <option value="5m-20m">₦5 Million - ₦20 Million</option>
                    <option value="20m-100m">₦20 Million - ₦100 Million</option>
                    <option value="over-100m">Over ₦100 Million</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="yearsInOperation" className="block text-sm font-medium text-gray-700 mb-2">
                    Years in Operation *
                  </label>
                  <select
                    id="yearsInOperation"
                    name="yearsInOperation"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select years in operation</option>
                    <option value="startup">Startup (Less than 1 year)</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="over-10">Over 10 years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="taxComplexity" className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Complexity Level
                  </label>
                  <select
                    id="taxComplexity"
                    name="taxComplexity"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select complexity level</option>
                    <option value="simple">Simple (Basic income tax filing)</option>
                    <option value="moderate">Moderate (Multiple income sources, VAT)</option>
                    <option value="complex">Complex (Multiple entities, international transactions)</option>
                  </select>
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

export default TaxServices;