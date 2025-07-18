import React, { useState, useEffect, useRef } from 'react';
import { Calculator, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedFileText from './AnimatedFileText';
import AnimatedTrendingUp from './AnimatedTrendingUp';

const Services = () => {
  const services = [
    {
      icon: "/images/pepcode logo.webp",
      title: "PEPCODE",
      description: "Advanced bookkeeping software designed to simplify your financial management processes.",
      link: "https://pepcodeinc.com/",
      cardColor: "bg-green-500"
    },
    {
      icon: "/images/7.png",
      title: "OWA by PEPCODE",
      description: "Helps market women track inventory by converting paper entries into accurate, synced digital records.",
      link: "https://owabypepcode.com.ng/",
      cardColor: "bg-blue-800"
    },
    {
      icon: "/images/auditme.webp",
      title: "AUDITME",
      description: "Fast-tracked audited accounts platform for streamlined compliance and reporting.",
      link: "https://auditme.com.ng/",
      cardColor: "bg-orange-400"
    },
    {
      icon: Calculator,
      title: "Tax Services",
      description: "Expert tax preparation and planning services to optimize your financial position.",
      link: "/tax-services",
      cardColor: "bg-teal-500"
    },
    {
      icon: AnimatedFileText,
      title: "Book-keeping Services",
      description: "Professional bookkeeping services to maintain accurate financial records.",
      link: "/bookkeeping-services",
      cardColor: "bg-indigo-500"
    },
    {
      icon: AnimatedTrendingUp,
      title: "Inventory Management",
      description: "Efficient inventory tracking and management solutions for your business.",
      link: "/inventory-management",
      cardColor: "bg-red-500"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === services.length - 1 ? 0 : prevIndex + 1
        ),
      3000 // Change slide every 3 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, services.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? services.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === services.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <section className="py-20 bg-matte-dark-blue text-white section-seamless">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From cutting-edge software solutions to expert professional services, we provide everything you need for financial success.
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform ease-in-out duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service, index) => (
                <div key={index} className="flex-shrink-0 w-full px-2">
                  <a
                    href={service.link}
                    target={service.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={`block p-8 rounded-2xl text-white h-80 flex flex-col justify-between ${service.cardColor}`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-4">"{service.title}"</h3>
                      <p className="text-base opacity-90">{service.description}</p>
                    </div>
                    <div className="w-20 h-20 self-end">
                      {typeof service.icon === 'string' ? (
                        <img src={service.icon} alt={`${service.title} logo`} className="w-full h-full object-contain"/>
                      ) : (
                        <service.icon className="w-full h-full text-white/50"/>
                      )}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button onClick={goToPrevious} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-700">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-700">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

      </div>
    </section>
    </>
  );
};

export default Services;
