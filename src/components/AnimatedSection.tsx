import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animationType = 'fadeUp',
  delay = 0,
  duration = 800,
}) => {
  const [ref, isVisible] = useScrollAnimation();

  // Mobile and accessibility optimizations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Skip animations entirely if reduced motion is preferred
  if (isReducedMotion) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
  
  const adjustedDuration = isMobile ? Math.max(400, duration * 0.8) : duration;
  const adjustedDelay = isMobile ? Math.max(0, delay * 0.8) : delay;

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    
    if (!isVisible) {
      switch (animationType) {
        case 'fadeUp':
          return `${baseClasses} opacity-0 ${isMobile ? 'translate-y-3' : 'translate-y-6'}`;
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 ${isMobile ? '-translate-x-3' : '-translate-x-6'}`;
        case 'slideRight':
          return `${baseClasses} opacity-0 ${isMobile ? 'translate-x-3' : 'translate-x-6'}`;
        case 'scale':
          return `${baseClasses} opacity-0 ${isMobile ? 'scale-[0.98]' : 'scale-95'}`;
        default:
          return `${baseClasses} opacity-0 ${isMobile ? 'translate-y-3' : 'translate-y-6'}`;
      }
    } else {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
  };

  const style: React.CSSProperties = {
    transitionDuration: `${adjustedDuration}ms`,
    ...(adjustedDelay > 0 && { transitionDelay: `${adjustedDelay}ms` }),
    // Add hardware acceleration for mobile
    ...(isMobile && {
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: '1000px'
    })
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;