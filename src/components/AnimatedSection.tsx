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
  duration = 600,
}) => {
  const [ref, isVisible] = useScrollAnimation();

  // Check if mobile and disable animations
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // On mobile, always show content immediately
  const shouldAnimate = !isMobile && isVisible;
  const finalIsVisible = isMobile ? true : isVisible;

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out will-change-transform`;
    
    // On mobile, don't apply animation classes
    if (isMobile) {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
    
    if (!finalIsVisible) {
      switch (animationType) {
        case 'fadeUp':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'slideRight':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'scale':
          return `${baseClasses} opacity-0 scale-95`;
        default:
          return `${baseClasses} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
  };

  const style: React.CSSProperties = {
    transitionDuration: isMobile ? '0ms' : `${duration}ms`,
    ...(delay > 0 && !isMobile && { transitionDelay: `${delay}ms` })
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