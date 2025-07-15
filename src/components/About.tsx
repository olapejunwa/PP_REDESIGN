import React from 'react';
import { Target, Eye, Star } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Simplified Financial Management",
      description: "We aim to demystify the complexities of bookkeeping and financial management, making it accessible and understandable for everyone, regardless of their level of financial expertise."
    },
    {
      icon: Eye,
      title: "Efficiency and Accuracy",
      description: "Our team is dedicated to the utilization of automated, repetitive tasks, reduce manual errors, and improve the accuracy of financial data. By automating routine bookkeeping processes, we help our customers save time and focus on growing their businesses."
    },
    {
      icon: Star,
      title: "Insightful Reporting",
      description: "Our bookkeeping software provides real-time insights and business finances through customizable reports and dashboards. By offering valuable financial insights, we empower our customers to make informed business decisions."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            We're empowering you for financial excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Ploutos, we are on a mission to empower businesses of all sizes to manage their finances with ease and confidence through innovative bookkeeping solutions and creative software experiences, tools they, and world-class education.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 icon-pulse-glow group-hover:icon-float">
                <value.icon className="w-8 h-8 text-blue-600 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;