import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';
import AnimatedCalculatorIcon from './AnimatedCalculatorIcon';
import AnimatedFileText from './AnimatedFileText';
import AnimatedTrendingUp from './AnimatedTrendingUp';


// --- Interfaces defined for the two types of services ---
interface CarouselProduct {
  icon: string; // Direct file path for the logo
  title: string;
  description: string;
  link: string;
  cardColor: string;
  logoBg: string;
}

interface OtherService {
  icon: React.ComponentType<{ className?: string }>; // Animated icon component
  title: string;
  description: string;
  link: string;
  iconColor: string;
}

// --- `carouselProducts` array with external links ---
const carouselProducts: CarouselProduct[] = [
  {
    icon: '/images/pepcode logo.webp',
    title: 'PEPCODE',
    description: 'Pepcode is our digital bookkeeping software built for businesses that want to grow without the stress of spreadsheets.',
    link: 'https://pepcodeinc.com',
    cardColor: 'bg-white',
    logoBg: 'bg-gray-100',
  },
  {
    icon: '/images/Owa Logo 3_062657.ai (A2 (Landscape)) (1).png',
    title: 'OWA by PEPCODE',
    description: 'ÓWÀ (Openmarket Women Amplifier) is an agent‑led, hybrid solution helping informal women traders track sales, expenses, and profit in local markets.',
    link: 'https://owabypepcode.com.ng/',
    cardColor: 'bg-white',
    logoBg: 'bg-gray-100',
  },
  {
    icon: '/images/auditme.webp',
    title: 'AUDITME',
    description: 'AuditMe connects businesses with certified auditors who deliver legally compliant audited reports within 7 days.',
    link: 'https://auditme.com.ng/',
    cardColor: 'bg-white',
    logoBg: 'bg-gray-100',
  },
];

// --- `otherServices` array ---
const otherServices: OtherService[] = [
  {
      icon: AnimatedCalculatorIcon,
      title: 'Tax Services',
      description: 'Expert tax preparation and planning.',
      link: '/tax-services',
      iconColor: 'text-purple-500',
  },
  {
      icon: AnimatedFileText,
      title: 'Bookkeeping Services',
      description: 'Maintain accurate financial records.',
      link: '/bookkeeping-services',
      iconColor: 'text-blue-400',
  },
  {
      icon: AnimatedTrendingUp,
      title: 'Inventory Management',
      description: 'Efficient inventory tracking solutions.',
      link: '/inventory-management',
      iconColor: 'text-red-500',
  },
];

const Services: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Effect for centering the active carousel item
  useEffect(() => {
    if (carouselRef.current && carouselRef.current.children[currentIndex]) {
      const item = carouselRef.current.children[currentIndex] as HTMLElement;
      const carousel = carouselRef.current;
      const scrollAmount = item.offsetLeft - (carousel.offsetWidth - item.offsetWidth) / 2;
      carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }, [currentIndex]);

  // Effect for auto-scrolling the carousel
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselProducts.length);
      }, 5000);
    };
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, []);

  // Handler for dot navigation clicks
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselProducts.length);
    }, 5000);
  };

  return (
    <AnimatedSection>
      <section
        id="services"
        className="py-20 overflow-hidden relative"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), rgba(39, 171, 237, 0.3)), #f0f9ff`
        }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">What do we Offer?</h2>
          <p className="text-lg text-center text-gray-700 mb-12">
            We provide cutting-edge solutions to streamline your business operations.
          </p>

          {/* Product Carousel Section */}
          <div className="relative mb-24">
            <div
              ref={carouselRef}
              className="flex items-center justify-center overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4"
            >
              {carouselProducts.map((product, index) => (
                // --- CHANGE: Wrapped the card in an anchor tag to make it clickable ---
                <a
                  key={index}
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 snap-center first:pl-4 last:pr-4 sm:first:pl-0 sm:last:pr-0 no-underline"
                >
                  <motion.div
                    className={`rounded-lg shadow-lg p-6 mx-2 w-80 h-80 flex flex-col justify-center items-center transform transition-transform duration-500 ${product.cardColor} cursor-pointer`}
                    animate={{ scale: currentIndex === index ? 1 : 0.95, opacity: currentIndex === index ? 1 : 0.7 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className={`p-3 rounded-full mb-4 ${product.logoBg}`}>
                      <img src={product.icon} alt={`${product.title} logo`} className="h-16 w-auto object-contain" />
                    </div>
                    <h3 className="text-2xl font-semibold text-center text-gray-800 mb-3">{product.title}</h3>
                    <p className="text-gray-600 text-center mb-5 text-base">{product.description}</p>
                    <div className="text-center mt-auto">
                      {/* --- CHANGE: Replaced Link with a span for styling purposes --- */}
                      <span className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                        Learn More &rarr;
                      </span>
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>
            <div className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 flex space-x-2">
              {carouselProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Other Services Section */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">And Other Professional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-md text-center"
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex justify-center items-center mb-4">
                    <service.icon className={`w-16 h-16 ${service.iconColor}`} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link to={service.link} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                    Learn More &rarr;
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};
export default Services;