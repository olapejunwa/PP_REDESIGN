import React, { useState, useEffect, useRef } from 'react';
import AnimatedTargetIcon from './AnimatedTargetIcon.tsx';
import AnimatedEyeIcon from './AnimatedEyeIcon.tsx';
import AnimatedStarIcon from './AnimatedStarIcon.tsx';

// Custom hook to detect when an element enters the viewport
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Trigger when the element is intersecting
      if (entry.isIntersecting) {
        setIsInView(true);
        // Stop observing the element once it has been seen
        observer.unobserve(entry.target);
      }
    }, options);

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
const ValueItem = ({ value, index }) => {
  // Trigger the animation when 30% of the item is visible
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const [renderIcon, setRenderIcon] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    if (isInView && !renderIcon) {
      // This timer creates a delay between the container animating in and the icon animation starting.
      const timer = setTimeout(() => {
        setRenderIcon(true);
      }, 500); // Start rendering icon partway through the container's transition
      return () => clearTimeout(timer);
    }
  }, [isInView, renderIcon]);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-12 transition-all ease-in-out duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`} // Alternates layout
    >
      {/* Icon Container with its own transition. This is the "pre-transition" for the icon animation. */}
      <div className={`w-64 h-48 ${value.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 p-4 transition-all duration-700 ease-out ${isInView ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        {/* The icon is only rendered after the pre-transition has started, triggering its animation. */}
        {renderIcon && <value.icon />}
      </div>

      {/* Text Content Container with its own transition */}
      <div className={`text-center ${isEven ? 'md:text-left' : 'md:text-right'} transition-opacity duration-700 ease-out delay-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
        <p className="text-base text-gray-300 leading-relaxed">{value.description}</p>
      </div>
    </div>
  );
};

const About = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.2 });
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
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-1000 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            We're empowering you for financial excellence
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            At Ploutos, we are on a mission to empower businesses of all sizes to manage their finances with ease and confidence through innovative bookkeeping solutions and creative software experiences, tools they, and world-class education.
          </p>
        </div>
        
        {/* Vertical layout with spacing */}
        <div className="space-y-24 mt-24">
          {values.map((value, index) => (
            <ValueItem key={index} value={value} index={index} />
          ))}
        </div>
        
        
      </div>
    </section>
  );
};

export default About;
