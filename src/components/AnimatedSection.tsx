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

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-${duration}`;
    
    if (!isVisible) {
      switch (animationType) {
        case 'fadeUp':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case 'fadeIn':
          return `${baseClasses} ${durationClass} opacity-0`;
        case 'slideLeft':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case 'slideRight':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case 'scale':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
      }
    } else {
      return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`;
    }
  };

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

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