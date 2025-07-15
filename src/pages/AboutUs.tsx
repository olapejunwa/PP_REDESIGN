import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Target, Eye, Star, Users, Award, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  const founders = [
    {
      name: "Olapiwa Nwanganga",
      role: "Co-Founder & CEO",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Olapiwa Nwanganga, who brings the CEO and has 8 years track record in financial management, accounting, and business operations. She has worked at various organizations, including banks, fintech companies, and consulting firms. She has a wealth of experience in financial management and is passionate about helping businesses achieve their financial goals."
    },
    {
      name: "Genevieve Olatunii",
      role: "Co-Founder & CTO",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Technical Product Manager at Decentrahub who was 3 years of industry experience in product management, software development, and project management. She is an expert in Data Science and Machine Learning, leveraging her technical knowledge to drive innovation and growth."
    }
  ];

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
    },
    {
      icon: Users,
      title: "Scalability and Flexibility",
      description: "Whether our customers are sole proprietors, small businesses, or large enterprises, our software and services are designed to scale with their needs. We provide flexible solutions that can adapt to changing business requirements."
    },
    {
      icon: Award,
      title: "Customer Support and Education",
      description: "We believe in providing exceptional customer support and educational resources to help our customers maximize the benefits of our products. From onboarding assistance to ongoing training and support, we are dedicated to ensuring our customers' success."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Make better accounting decisions with Ploutos
              </h1>
              <p className="text-base text-gray-600 mb-8">
                At Ploutos Page we are passionate about helping businesses succeed by providing them with the tools and support they need to manage their finances effectively. We believe that every business, regardless of its size, deserves access to high-quality financial services and innovative solutions to drive growth.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                Get Started
              </button>
            </div>
            <div className="relative">
              <div className="bg-gray-200 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full"></div>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="w-32 h-32 bg-white rounded-lg shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-16">
            We're empowering you for financial excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At Ploutos, we are on a mission to empower businesses of all sizes to manage their finances with ease and confidence through innovative bookkeeping solutions and creative software experiences, tools they, and world-class education.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-blue-400 font-semibold mb-4">Our Mission</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              At the core of our mission is the commitment to delivering value to our customers by:
            </h2>
          </div>
          
          <div className="space-y-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 bg-gray-800 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 icon-pulse-glow">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              The founders
            </h2>
            <p className="text-lg text-gray-600">
              Building the future of financial management, one business at a time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <div key={index} className="text-center">
                <div className="w-64 h-80 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src={founder.image} 
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{founder.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{founder.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;