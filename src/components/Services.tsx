import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useStaggeredAnimation } from '../hooks/useScrollAnimation';
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
      cardColor: "bg-blue-200 text-gray-800",
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
      cardColor: "bg-yellow-100 text-gray-800",
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
      iconColor: "text-purple-500",
    },
    {
      icon: AnimatedFileText,
      title: "Book-keeping Services",
      description: "Maintain accurate financial records.",
      link: "/bookkeeping-services",
      iconColor: "text-blue-400",
    },
    {
      icon: AnimatedTrendingUp,
      title: "Inventory Management",
      description: "Efficient inventory tracking solutions.",
      link: "/inventory-management",
      iconColor: "text-red-500",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [servicesRef, visibleServices] = useStaggeredAnimation(3, 200);

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
    <section className="py-20 bg-soft-blue text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <AnimatedSection animationType="fadeUp" delay={200}>
            <h2 className="text-unified-3xl md:text-unified-4xl font-primary font-unified-bold text-gray-900 mb-4">
              What Do We Offer?
            </h2>
          </AnimatedSection>
          <AnimatedSection animationType="fadeUp" delay={400}>
            <p className="text-unified-lg font-primary font-unified-normal text-gray-700 max-w-3xl mx-auto leading-unified-relaxed">
              From cutting-edge software solutions to expert professional services, we provide everything you need for financial success.
            </p>
          </AnimatedSection>
        </AnimatedSection>
        
        {/* Carousel Section */}
        <AnimatedSection animationType="fadeUp" delay={600}>
          <div className="relative mb-24">
            <div className="overflow-hidden rounded-2xl aspect-square">
              <div 
                className="flex h-full transition-transform ease-in-out duration-700"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {carouselProducts.map((service, index) => (
                  <div key={index} className="flex-shrink-0 w-full h-full p-1">
                    <a
                      href={service.link}
                      target={service.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`block rounded-2xl h-full flex flex-col ${service.cardColor}`}
                    >
                      {/* Logo Header */}
                      <div className={`w-full flex-1 flex items-center justify-center rounded-t-2xl ${service.logoBg}`}>
                         <img src={service.icon} alt={`${service.title} logo`} className="max-h-32 w-auto object-contain"/>
                      </div>
                      {/* Content */}
                      <div className="p-6 flex flex-col">
                        <h3 className="text-unified-2xl font-primary font-unified-bold mb-2">{service.title}</h3>
                        <p className="text-unified-base font-primary font-unified-normal opacity-90 leading-unified-normal">{service.description}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button onClick={goToPrevious} className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-white z-10">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button onClick={goToNext} className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md hover:bg-white z-10">
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </AnimatedSection>

        {/* Other Services Section */}
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherServices.map((service, index) => (
                <div








                  key={index}
                  className={`transition-all duration-700 ease-out ${
                    visibleServices[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <Link to={service.link} className="bg-gray-800 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-gray-700 transition-colors duration-300">
                      <div className="w-32 h-32 mb-4">
                          <service.icon className={`w-full h-full ${service.iconColor}`}/>
                      </div>
                      <h3 className="text-unified-xl font-primary font-unified-bold text-white mb-2">{service.title}</h3>
                      <p className="text-gray-400 text-unified-sm font-primary font-unified-normal">{service.description}</p>
                  </Link>
                </div>
            ))}
        </div>































      </div>
    </section>
  );
};

export default Services;