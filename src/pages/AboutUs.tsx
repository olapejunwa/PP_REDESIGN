import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// === MODIFIED ICONS ===
import { Users, LifeBuoy, ShieldCheck, ThumbsUp } from 'lucide-react';

const AboutUs = () => {
  const founders = [
    {
      name: "Olapeju Nwanganga",
      role: "Co-Founder & CEO",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      description: "Olapiwa Nwanganga, who brings the CEO and has 8 years track record in financial management, accounting, and business operations. She has worked at various organizations, including banks, fintech companies, and consulting firms. She has a wealth of experience in financial management and is passionate about helping businesses achieve their financial goals."
    },
  ];

  // === REPLACED 'values' ARRAY WITH 'whyPloutos' ===
  const whyPloutos = [
    {
      icon: Users,
      text: "Built for real people, not just accountants"
    },
    {
      icon: LifeBuoy,
      text: "Human + digital support for every user level"
    },
    {
      icon: ShieldCheck,
      text: "Proven tools for compliance, funding, and scale"
    },
    {
      icon: ThumbsUp,
      text: "Trusted by over multiple businesses across Nigeria."
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
              <Link to="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                Get Started
              </Link>
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            We're empowering you for financial excellence
          </h2>
          <p className="text-base text-gray-600 mb-8">
            Ploutos Page Limited is a fintech and professional services company helping MSMEs and market traders grow with smart, simple, and human‑centered bookkeeping and financial tools.
Whether you're a startup, a small business, or a woman selling in the open market — we’ve got you covered.
          </p>
        </div>
      </section>

      {/* === REPLACED SECTION === */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
              🧾 WHY PLOUTOS PAGE
            </h2>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {whyPloutos.map((item, index) => (
              <div key={index} className="flex items-center space-x-6 p-6 bg-gray-800 rounded-xl">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 icon-pulse-glow">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg text-gray-200">{item.text}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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