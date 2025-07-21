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
  duration = 600, // Faster default duration
}) => {
  const [ref, isVisible] = useScrollAnimation();

  // Adjust animation settings for mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const mobileDuration = isMobile ? Math.max(400, duration * 0.7) : duration;
  const mobileDelay = isMobile ? delay * 0.7 : delay;

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out will-change-transform`;
    
    // Use CSS custom property for duration to support mobile optimization
    const durationMs = `${mobileDuration}ms`;
    
    if (!isVisible) {
      switch (animationType) {
        case 'fadeUp':
          return `${baseClasses} opacity-0 ${isMobile ? 'translate-y-4' : 'translate-y-8'}`;
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 ${isMobile ? '-translate-x-4' : '-translate-x-8'}`;
        case 'slideRight':
          return `${baseClasses} opacity-0 ${isMobile ? 'translate-x-4' : 'translate-x-8'}`;
        case 'scale':
          return `${baseClasses} opacity-0 ${isMobile ? 'scale-98' : 'scale-95'}`;
        default:
          return `${baseClasses} opacity-0 ${isMobile ? 'translate-y-4' : 'translate-y-8'}`;
      }
    } else {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
  };

  const style: React.CSSProperties = {
    transitionDuration: `${mobileDuration}ms`,
    ...(mobileDelay > 0 && { transitionDelay: `${mobileDelay}ms` })
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