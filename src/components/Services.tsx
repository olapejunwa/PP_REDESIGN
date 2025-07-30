import React from 'react';
import AnimatedSection from './AnimatedSection';
import AnimatedCalculatorIcon from './AnimatedCalculatorIcon';
import AnimatedFileText from './AnimatedFileText';
import AnimatedTrendingUp from './AnimatedTrendingUp';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: AnimatedCalculatorIcon,
    title: "Bookkeeping Services",
    description: "We handle your day-to-day financial recording and management, so you can focus on your business.",
    link: "/bookkeeping-services"
  },
  {
    icon: AnimatedFileText,
    title: "Tax Services",
    description: "Our experts ensure your taxes are filed accurately and on time, maximizing your returns.",
    link: "/tax-services"
  },
  {
    icon: AnimatedTrendingUp,
    title: "Inventory Management",
    description: "Optimize your stock levels and supply chain with our advanced inventory solutions.",
    link: "/inventory-management"
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-unified-5xl md:text-unified-4xl font-primary font-unified-bold text-gray-900 text-center mb-4">What do we Offer?</h2>
        <p className="text-unified-xl font-primary font-unified-normal text-gray-700 max-w-3xl mx-auto leading-unified-relaxed text-center mb-12">
          We provide cutting-edge solutions to streamline your business operations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <AnimatedSection key={index} animationType="fadeUp" delay={index * 200}>
              <Link to={service.link} className="block p-8 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center">
                    <service.icon />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">{service.title}</h3>
                <p className="text-base text-center text-gray-700">{service.description}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
