import React, { useState, useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';
import { useStaggeredAnimation } from '../hooks/useScrollAnimation';
import AnimatedTargetIcon from './AnimatedTargetIcon.tsx';
import AnimatedEyeIcon from './AnimatedEyeIcon.tsx';
import AnimatedStarIcon from './AnimatedStarIcon.tsx';

// Custom hook to detect when an element enters the viewport
const useInView = (options: IntersectionObserverInit) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Adjust threshold for mobile
    const isMobile = window.innerWidth < 768;
    const mobileOptions = {
      ...options,
      threshold: isMobile ? 0.1 : (options.threshold || 0.3),
      rootMargin: isMobile ? '0px 0px -20px 0px' : (options.rootMargin || '0px')
    };
    
    const observer = new IntersectionObserver(([entry]) => {
      // Trigger when the element is intersecting
      if (entry.isIntersecting) {
        setIsInView(true);
        // Stop observing the element once it has been seen
        observer.unobserve(entry.target);
      }
    }, mobileOptions);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

// A component for each individual value item to handle its own animation state
const ValueItem = ({ value, index }: { value: any; index: number }) => {
  // Trigger the animation when 30% of the item is visible
  const [ref, isInView] = useInView({ threshold: 0.2 });
  const [renderIcon, setRenderIcon] = useState(false);
  const isEven = index % 2 === 0;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) {
      // On mobile, render icon immediately
      setRenderIcon(true);
    } else if (isInView && !renderIcon) {
      const timer = setTimeout(() => {
        setRenderIcon(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, renderIcon, isMobile]);


  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
        isMobile ? '' : 'transition-all ease-in-out duration-1000'
      } ${
        isMobile || isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`} // Alternates layout
    >
      {/* Icon Container with its own transition. This is the "pre-transition" for the icon animation. */}
      <div className={`${isMobile ? 'w-48 h-36' : 'w-64 h-48'} ${value.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 p-4 ${
        isMobile ? '' : 'transition-all duration-700 ease-out'
      } ${isMobile || isInView ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        {/* The icon is only rendered after the pre-transition has started, triggering its animation. */}
        {renderIcon && <value.icon />}
      </div>

      {/* Text Content Container with its own transition */}
      <div className={`text-center ${isEven ? 'md:text-left' : 'md:text-right'} ${
        isMobile ? '' : 'transition-opacity duration-700 delay-300 ease-out'
      } ${isMobile || isInView ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className={`${isMobile ? 'text-xl' : 'text-unified-3xl'} font-primary font-unified-bold text-gray-900 mb-4`}>{value.title}</h3>
        <p className={`${isMobile ? 'text-sm' : 'text-unified-lg'} font-primary font-unified-normal text-gray-700 leading-unified-relaxed`}>{value.description}</p>
      </div>
    </div>
  );
};

const About = () => {
  const [containerRef, visibleItems] = useStaggeredAnimation(3, 300);
  const values = [
    {
      icon: AnimatedTargetIcon,
      title: "Simplified Financial Management",
      description: "We aim to demystify the complexities of bookkeeping and financial management, making it accessible and understandable for everyone, regardless of their level of financial expertise.",
      bgColor: 'bg-green-300'
    },
    {
      icon: AnimatedEyeIcon,
      title: "Efficiency and Accuracy",
      description: "Our team is dedicated to the utilization of automated, repetitive tasks, reduce manual errors, and improve the accuracy of financial data. By automating routine bookkeeping processes, we help our customers save time and focus on growing their businesses.",
      bgColor: 'bg-[#38F5B8]'
    },
    {
      icon: AnimatedStarIcon,
      title: "Insightful Reporting",
      description: "Our bookkeeping software provides real-time insights and business finances through customizable reports and dashboards. By offering valuable financial insights, we empower our customers to make informed business decisions.",
      bgColor: 'bg-[#3C00FF]'
    }
  ];

  return (
    <section 
      className="py-20 text-gray-900 overflow-hidden relative"
      style={{
        background: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), rgba(39, 171, 237, 0.3)), #f8fafc`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <AnimatedSection animationType="fadeUp" delay={200}>
            <h2 className="text-2xl md:text-unified-4xl font-primary font-unified-bold text-gray-900 mb-4">
              We're empowering you for financial excellence
            </h2>
          </AnimatedSection>
          <AnimatedSection animationType="fadeUp" delay={400}>
            <p className="text-base md:text-unified-xl font-primary font-unified-normal text-gray-700 max-w-3xl mx-auto leading-unified-relaxed">
              Ploutos Page is a fintech and professional services company helping MSMEs and market traders grow with smart, simple, and human‑centered bookkeeping and financial tools.
Whether you're a startup, a small business, or a woman selling in the open market — we've got you covered.
            </p>
          </AnimatedSection>
        </AnimatedSection>
        
        {/* Vertical layout with spacing */}
        <div ref={containerRef} className="space-y-24 mt-24">
          {values.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-800 ease-out ${
                visibleItems[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <ValueItem value={value} index={index} />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default About;