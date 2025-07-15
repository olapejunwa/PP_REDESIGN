import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';

const InventoryManagement = () => {
  const plans = [
    {
      name: "Essential plan",
      price: "₦70,000/Month",
      description: "This tier includes weekly inventory counts suitable for businesses with moderate inventory turnover rates and frequent monitoring of their inventory levels.",
      features: [
        "Up to 50 items",
        "Essential inventory tracking",
        "Monthly inventory reports",
        "Email support",
        "Basic analytics dashboard"
      ],
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Basic Plan:",
      price: "₦100,000/month",
      description: "This tier provides monthly inventory counts suitable for businesses with moderate inventory turnover rates.",
      features: [
        "Up to 100 items",
        "Basic inventory tracking",
        "Monthly inventory reports",
        "Email support",
        "Basic analytics dashboard"
      ],
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      bgColor: "bg-pink-500",
      textColor: "text-white"
    },
    {
      name: "Standard Plan:",
      price: "₦250,000/month",
      description: "This tier provides yearly or quarterly inventory counts for businesses with lower inventory turnover rates or less frequent monitoring needs.",
      features: [
        "Up to 500 items",
        "Advanced inventory tracking",
        "Weekly inventory reports",
        "Advanced analytics dashboard",
        "Integration with accounting software",
        "Automated reordering"
      ],
      buttonColor: "bg-pink-500 hover:bg-pink-600",
      bgColor: "bg-gray-900",
      textColor: "text-white"
    },
    {
      name: "Premium Plan:",
      price: "₦500,000/month",
      description: "This tier provides yearly or quarterly inventory counts for businesses with lower inventory turnover rates or less frequent monitoring needs.",
      features: [
        "Unlimited items",
        "Real-time inventory tracking",
        "Daily inventory reports",
        "Priority support",
        "Comprehensive analytics dashboard",
        "Integration with multiple systems (accounting, CRM, etc.)",
        "Automated reordering and forecasting",
        "Customizable reporting",
        "Dedicated account manager"
      ],
      buttonColor: "bg-pink-500 hover:bg-pink-600",
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
            Inventory Management
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Simplify inventory tracking, manage stock levels, and optimize inventory turnover with our advanced inventory management solutions. Stay on top of stock levels, reduce costs, and improve efficiency.
          </p>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.bgColor || 'bg-gray-50'
                } transition-transform duration-300 hover:scale-105`}
              >
                <div className={`mb-6 ${plan.textColor || 'text-gray-900'}`}>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-2xl font-bold mb-4">{plan.price}</div>
                  <p className={`text-xs leading-relaxed ${plan.textColor ? 'opacity-90' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>
                
                <ul className={`space-y-2 mb-8 ${plan.textColor || 'text-gray-600'}`}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${plan.buttonColor} text-white`}>
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

export default InventoryManagement;