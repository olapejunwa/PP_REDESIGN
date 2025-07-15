import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';

const TaxServices = () => {
  const services = [
    {
      title: "Monthly Tax Services: – ₦20,000",
      features: [
        "Offer ongoing tax advisory and compliance services on a monthly basis",
        "Provide regular consultations, tax planning, and assistance with tax filings throughout the year",
        "Include features such as quarterly tax reviews, financial statement analysis, and tax strategy adjustments"
      ],
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Yearly Tax Services: ₦100,000",
      features: [
        "Provide comprehensive tax preparation and filing services for annual tax returns",
        "Offer detailed tax reviews, deductions and credits optimization, and compliance assurance",
        "Include assistance with year-end financial statements, tax planning for the upcoming year, and tax strategy recommendations"
      ],
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      bgColor: "bg-pink-500",
      textColor: "text-white"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-600 font-semibold mb-4">Services</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Tax Services
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Navigate the complexities of tax compliance with ease. Our tax experts offer comprehensive tax planning, preparation, and filing services to ensure compliance with tax regulations and maximize tax savings.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  service.bgColor || 'bg-gray-50'
                }`}
              >
                <h2 className={`text-2xl font-bold mb-8 ${service.textColor || 'text-gray-900'}`}>
                  {service.title}
                </h2>
                
                <ul className={`space-y-4 mb-12 ${service.textColor || 'text-gray-600'}`}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-4">
                      <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-6 rounded-lg font-semibold text-base transition-colors duration-200 ${service.buttonColor} text-white`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TaxServices;