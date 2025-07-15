import React from 'react';
import { Calculator, TrendingUp, FileText } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: "/images/pepcode-logo.svg",
      title: "PEPCODE",
      description: "Advanced bookkeeping software designed to simplify your financial management processes.",
      color: "bg-blue-600"
    },
    {
      icon: "/images/owa-logo.svg",
      title: "OWA by PEPCODE",
      description: "Comprehensive financial analysis and reporting tools for better business insights.",
      color: "bg-green-600"
    },
    {
      icon: "/images/auditme.webp",
      title: "AUDITME",
      description: "Fast-tracked audited accounts platform for streamlined compliance and reporting.",
      color: "bg-purple-600"
    },
    {
      icon: Calculator,
      title: "Tax Services",
      description: "Expert tax preparation and planning services to optimize your financial position.",
      color: "bg-orange-600"
    },
    {
      icon: FileText,
      title: "Book-keeping Services",
      description: "Professional bookkeeping services to maintain accurate financial records.",
      color: "bg-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Inventory Management",
      description: "Efficient inventory tracking and management solutions for your business.",
      color: "bg-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From cutting-edge software solutions to expert professional services, we provide everything you need for financial success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-8">
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-6 icon-hover-lift group-hover:icon-scale-pulse`}>
                  {typeof service.icon === 'string' ? (
                    <img 
                      src={service.icon} 
                      alt={`${service.title} logo`}
                      className="w-8 h-8 object-contain transition-transform duration-300"
                      onError={(e) => {
                        console.error(`Failed to load image: ${service.icon}`);
                        // Fallback to a default icon or hide the image
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        // Show a fallback div with the first letter of the title
                        const fallback = document.createElement('div');
                        fallback.className = 'w-8 h-8 flex items-center justify-center text-white font-bold text-lg';
                        fallback.textContent = service.title.charAt(0);
                        target.parentNode?.appendChild(fallback);
                      }}
                      onLoad={() => {
                        console.log(`Successfully loaded: ${service.icon}`);
                      }}
                    />
                  ) : (
                    <service.icon className="w-6 h-6 text-white transition-transform duration-300" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-6">
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;