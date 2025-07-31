import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Send } from 'lucide-react';

const BookkeepingServices = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const servicesNeeded = formData.getAll('services');
    
    const data = {
      service_type: 'bookkeeping_services',
      business_name: formData.get('businessName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      business_size: formData.get('businessSize'),
      monthly_transactions: formData.get('monthlyTransactions'),
      bank_accounts: formData.get('bankAccounts'),
      services_needed: servicesNeeded,
      submitted_at: new Date().toISOString()
    };
    
    // TODO: Submit to Supabase
    console.log('Bookkeeping Services Form Data:', data);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold mb-4">Product & Services</p>
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            Bookkeeping Services subscriptions
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto">
            Our bookkeeping services are tailored to meet the unique needs of SMEs and medium-sized businesses. Whether you need assistance with day-to-day bookkeeping tasks, or financial reporting, our team is here to help. We ensure accuracy, compliance, and efficiency, allowing you to focus on growing your business.
          </p>
        </div>
      </section>

      {/* Assessment Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Get Your Custom Bookkeeping Services Quote
              </h2>
              <p className="text-sm md:text-lg text-gray-600 mb-8 text-center">
                Tell us about your business to receive a tailored bookkeeping package that fits your specific needs and budget.
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
                  <label htmlFor="businessSize" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Size *
                  </label>
                  <select
                    id="businessSize"
                    name="businessSize"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your business size</option>
                    <option value="micro">Micro Business (1-5 employees)</option>
                    <option value="small">Small Business (6-20 employees)</option>
                    <option value="medium">Medium Business (21-100 employees)</option>
                    <option value="large">Large Business (100+ employees)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="monthlyTransactions" className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Transaction Volume *
                  </label>
                  <select
                    id="monthlyTransactions"
                    name="monthlyTransactions"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select transaction volume</option>
                    <option value="under-50">Under 50 transactions</option>
                    <option value="50-200">50-200 transactions</option>
                    <option value="200-500">200-500 transactions</option>
                    <option value="500-1000">500-1000 transactions</option>
                    <option value="over-1000">Over 1000 transactions</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bankAccounts" className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Bank Accounts *
                  </label>
                  <select
                    id="bankAccounts"
                    name="bankAccounts"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select number of accounts</option>
                    <option value="1">1 account</option>
                    <option value="2-3">2-3 accounts</option>
                    <option value="4-5">4-5 accounts</option>
                    <option value="6-10">6-10 accounts</option>
                    <option value="over-10">Over 10 accounts</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="servicesNeeded" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Services Needed
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" name="services" value="vat-filing" className="mr-2" />
                      <span className="text-sm">VAT & WHT Filings</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="services" value="financial-advisory" className="mr-2" />
                      <span className="text-sm">Financial Advisory</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="services" value="annual-filings" className="mr-2" />
                      <span className="text-sm">Annual Filings</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="services" value="dedicated-accountant" className="mr-2" />
                      <span className="text-sm">Dedicated Accountant</span>
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

export default BookkeepingServices;