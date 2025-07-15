import React from 'react';
import { Calculator } from 'lucide-react';
import AnimatedFileText from './AnimatedFileText'; // Make sure the path is correct
import AnimatedTrendingUp from './AnimatedTrendingUp'; // Make sure the path is correct

const Services = () => {
  const services = [
    {
      icon: "/images/pepcode logo.webp",
      title: "PEPCODE",
      description: "Advanced bookkeeping software designed to simplify your financial management processes.",
      link: "https://pepcodeinc.com/"
    },
    {
      icon: "/images/7.png",
      title: "OWA by PEPCODE",
      description: "Comprehensive financial analysis and reporting tools for better business insights.",
      link: "https://owabypepcode.com.ng/"
    },
    {
      icon: "/images/auditme.webp",
      title: "AUDITME",
      description: "Fast-tracked audited accounts platform for streamlined compliance and reporting.",
      link: "https://auditme.com.ng/"
    },
    {
      icon: Calculator,
      title: "Tax Services",
      description: "Expert tax preparation and planning services to optimize your financial position.",
      color: "bg-orange-600",
      animationClass: "animate-bounce-custom",
      link: "#" // Placeholder link
    },
    {
      icon: AnimatedFileText,
      title: "Book-keeping Services",
      description: "Professional bookkeeping services to maintain accurate financial records.",
      color: "bg-teal-600",
      animationClass: "",
      link: "#" // Placeholder link
    },
    {
      icon: AnimatedTrendingUp,
      title: "Inventory Management",
      description: "Efficient inventory tracking and management solutions for your business.",
      color: "bg-red-600",
      animationClass: "",
      link: "#" // Placeholder link
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
            // The entire card is now a link that opens in a new tab
            <a 
              key={index} 
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group block"
            >
              <div className="p-8">
                {typeof service.icon === 'string' ? (
                  <div className="w-12 h-12 rounded-lg mb-6 flex items-center justify-center">
                    <img
                      src={service.icon}
                      alt={`${service.title} logo`}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        console.error(`Failed to load image: ${service.icon}`);
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = document.createElement('div');
                        fallback.className = `w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-bold text-lg rounded-lg`;
                        fallback.textContent = service.title.charAt(0);
                        target.parentNode?.appendChild(fallback);
                      }}
                    />
                  </div>
                ) : (
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-6`}>
                    <service.icon className={`w-6 h-6 text-white transition-transform duration-300 ${service.animationClass || ''}`} />
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
                
                {/* Changed button to a div for semantic correctness inside an <a> tag */}
                <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-200">
                  Learn More →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;