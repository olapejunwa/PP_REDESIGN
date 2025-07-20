import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedFileText from './AnimatedFileText';
import AnimatedTrendingUp from './AnimatedTrendingUp';
import AnimatedCalculatorIcon from './AnimatedCalculatorIcon'; // Import the new component

const Services = () => {
  // Products for the carousel
  const carouselProducts = [
    {
      icon: "/images/pepcode logo.webp",
      title: "PEPCODE",
      description: "Advanced bookkeeping software designed to simplify your financial management processes.",
      link: "https://pepcodeinc.com/",
      cardColor: "bg-white text-gray-800",
      logoBg: "bg-gray-50",
    },
    {
      icon: "/images/7.png",
      title: "OWA by PEPCODE",
      description: "Helps market women track inventory by converting paper entries into accurate, synced digital records.",
      link: "https://owabypepcode.com.ng/",
      cardColor: "bg-brand-purple text-white",
      logoBg: "bg-white",
    },
    {
      icon: "/images/auditme.webp",
      title: "AUDITME",
      description: "Fast-tracked audited accounts platform for streamlined compliance and reporting.",
      link: "https://auditme.com.ng/",
      cardColor: "bg-brand-cream text-gray-800",
      logoBg: "bg-white",
    },
  ];

  // Other services to be displayed below the carousel
  const otherServices = [
    {
      icon: AnimatedCalculatorIcon,
      title: "Tax Services",
      description: "Expert tax preparation and planning.",
      link: "/tax-services",
    },
    {
      icon: AnimatedFileText,
      title: "Book-keeping Services",
      description: "Maintain accurate financial records.",
      link: "/bookkeeping-services",
    },
    {
      icon: AnimatedTrendingUp,
      title: "Inventory Management",
      description: "Efficient inventory tracking solutions.",
      link: "/inventory-management",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
          prevIndex === carouselProducts.length - 1 ? 0 : prevIndex + 1
        ),
      4000 // Change slide every 4 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, carouselProducts.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselProducts.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === carouselProducts.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="py-20 bg-matte-dark-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Do We Offer?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From cutting-edge software solutions to expert professional services, we provide everything you need for financial success.
          </p>
        </div>
        
        {/* Carousel Section */}
        <div className="relative mb-24">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform ease-in-out duration-700"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselProducts.map((service, index) => (
                <div key={index} className="flex-shrink-0 w-full p-1">
                  <a
                    href={service.link}
                    target={service.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={`block rounded-2xl h-96 flex flex-col ${service.cardColor}`}
                  >
                    {/* Logo Header */}
                    <div className={`w-full h-48 flex items-center justify-center rounded-t-2xl ${service.logoBg}`}>
                       <img src={service.icon} alt={`${service.title} logo`} className="h-24 w-auto object-contain"/>
                    </div>
                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-base opacity-90">{service.description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <button onClick={goToPrevious} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-700 z-10">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button onClick={goToNext} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gray-800/80 rounded-full p-2 shadow-md hover:bg-gray-700 z-10">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Other Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.map((service, index) => (
                <Link to={service.link} key={index} className="bg-gray-800 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-gray-700 transition-colors duration-300">
                    <div className="w-32 h-32 mb-4">
                        <service.icon className="w-full h-full text-white/80"/>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                </Link>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
