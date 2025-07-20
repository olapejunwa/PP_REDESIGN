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
    // Mobile and accessibility optimizations
    const isMobile = window.innerWidth < 768;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isReducedMotion) {
      setIsInView(true);
      return;
    }
    
    const adjustedOptions = {
      ...options,
      threshold: isMobile ? 0.15 : (options.threshold || 0.25),
      rootMargin: isMobile ? '0px 0px -30px 0px' : (options.rootMargin || '0px 0px -50px 0px')
    };
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, adjustedOptions);

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

const ValueItem = ({ value, index }: { value: any; index: number }) => {
  const [ref, isInView] = useInView({ threshold: 0.15 });
  const [renderIcon, setRenderIcon] = useState(false);
  const isEven = index % 2 === 0;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isReducedMotion) {
      setRenderIcon(true);
      return;
    }
    
    if (isInView && !renderIcon) {
      const timer = setTimeout(() => {
        setRenderIcon(true);
      }, isMobile ? 200 : 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, renderIcon, isMobile, isReducedMotion]);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-all ease-out ${
        isReducedMotion ? 'duration-0' : isMobile ? 'duration-500' : 'duration-800'
      } ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{
        // Hardware acceleration for mobile
        ...(isMobile && !isReducedMotion && {
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        })
      }}
    >
      <div className={`${isMobile ? 'w-40 h-32' : 'w-64 h-48'} ${value.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 p-4 transition-all ${
        isReducedMotion ? 'duration-0' : isMobile ? 'duration-400' : 'duration-600'
      } ease-out ${isInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {renderIcon && <value.icon />}
      </div>

      <div className={`text-center ${isEven ? 'md:text-left' : 'md:text-right'} transition-opacity ${
        isReducedMotion ? 'duration-0' : isMobile ? 'duration-400 delay-100' : 'duration-600 delay-200'
      } ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white mb-4`}>{value.title}</h3>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-300 leading-relaxed`}>{value.description}</p>
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
      bgColor: 'bg-green-100'
    },
    {
      icon: AnimatedEyeIcon,
      title: "Efficiency and Accuracy",
      description: "Our team is dedicated to the utilization of automated, repetitive tasks, reduce manual errors, and improve the accuracy of financial data. By automating routine bookkeeping processes, we help our customers save time and focus on growing their businesses.",
      bgColor: 'bg-blue-100'
    },
    {
      icon: AnimatedStarIcon,
      title: "Insightful Reporting",
      description: "Our bookkeeping software provides real-time insights and business finances through customizable reports and dashboards. By offering valuable financial insights, we empower our customers to make informed business decisions.",
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <section className="py-20 bg-matte-dark-blue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animationType="fadeUp" className="text-center mb-16">
          <AnimatedSection animationType="fadeUp" delay={200}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              We're empowering you for financial excellence
            </h2>
          </AnimatedSection>
          <AnimatedSection animationType="fadeUp" delay={400}>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              At Ploutos, we are on a mission to empower businesses of all sizes to manage their finances with ease and confidence through innovative bookkeeping solutions and creative software experiences, tools they, and world-class education.
            </p>
          </AnimatedSection>
        </AnimatedSection>
        
        <div ref={containerRef} className="space-y-16 md:space-y-24 mt-16 md:mt-24">
          {values.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-600 ease-out ${
                visibleItems[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
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
