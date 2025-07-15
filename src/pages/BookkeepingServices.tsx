import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';

const BookkeepingServices = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const packages = [
    {
      name: "Basic Package for Micro Businesses",
      price: billingCycle === 'monthly' ? '₦10,000' : '₦100,000',
      features: [
        "Financial Summary",
        "Cash flow statement",
        "Profit +Loss Statement",
        "Balance sheet",
        "Bookkeeping including ledger",
        "Virtual Accountant support",
        "Bank Reconciliation for 1 bank Only"
      ],
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      popular: false
    },
    {
      name: "Basic Package for Medium Businesses",
      price: billingCycle === 'monthly' ? '₦50,000' : '₦500,000',
      features: [
        "Financial Summary",
        "Cash flow statement",
        "Profit +Loss Statement",
        "Balance sheet",
        "Bookkeeping including ledger",
        "Virtual Accountant support",
        "Bank Reconciliation up to 3 banks Only",
        "5 Hours of Financial Advisory per month",
        "Monthly VAT & WHT Filings"
      ],
      buttonColor: "bg-pink-500 hover:bg-pink-600",
      popular: false,
      bgColor: "bg-gray-900",
      textColor: "text-white"
    },
    {
      name: "Standard Package",
      price: billingCycle === 'monthly' ? '₦75,000' : '₦750,000',
      features: [
        "Financial Summary",
        "Cash flow statement",
        "Profit +Loss Statement",
        "Balance sheet",
        "Bookkeeping including ledger",
        "Virtual Accountant support",
        "Bank Reconciliation up to 10 banks Only",
        "10 Hours of Financial Advisory per month",
        "Monthly VAT & WHT Filings"
      ],
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      popular: true,
      bgColor: "bg-pink-500",
      textColor: "text-white"
    },
    {
      name: "Premium Package",
      price: billingCycle === 'monthly' ? '₦95,000' : '₦950,000',
      features: [
        "Financial Summary",
        "Cash flow statement",
        "Profit +Loss Statement",
        "Balance sheet",
        "Bookkeeping including ledger",
        "Virtual Accountant support",
        "Bank Reconciliation up to 10 banks Only",
        "Yearly Annual Filings plus State Revenue Service Plus Dedicated",
        "30 Hours of Financial Advisory per month",
        "Virtual Senior Accountant support"
      ],
      buttonColor: "bg-pink-500 hover:bg-pink-600",
      popular: false,
      bgColor: "bg-gray-900",
      textColor: "text-white"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold mb-4">Product & Services</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Bookkeeping Services subscriptions
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Our bookkeeping services are tailored to meet the unique needs of SMEs and medium-sized businesses. Whether you need assistance with day-to-day bookkeeping tasks, or financial reporting, our team is here to help. We ensure accuracy, compliance, and efficiency, allowing you to focus on growing your business.
          </p>
        </div>
      </section>

      {/* Custom Package Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Ultimate Package -Tailored Pricing
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              For unique or complex projects and large customer accounts/profiles, we offer custom packages based on your specific requirements, business size, and goals. Includes a comprehensive consultation to understand your vision, objectives, challenges, requirements and goals.
            </p>
            <p className="text-sm text-gray-600 mb-8">
              Our team will create a bespoke proposal with a detailed breakdown of services, tools, timelines, and pricing.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                Yearly
              </span>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-8 relative ${
                    pkg.bgColor || 'bg-white border-2 border-gray-200'
                  } ${pkg.popular ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className={`mb-8 ${pkg.textColor || 'text-gray-900'}`}>
                    <h3 className="text-xl font-bold mb-4">{pkg.name}</h3>
                    <div className="text-3xl font-bold">{pkg.price}</div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm opacity-75 mt-1">per year</div>
                    )}
                  </div>
                  
                  <ul className={`space-y-4 mb-8 ${pkg.textColor || 'text-gray-600'}`}>
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${pkg.buttonColor} text-white`}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookkeepingServices;