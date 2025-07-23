import React from 'react';

interface AnimatedTrendingUpProps {
  className?: string;
}

const AnimatedTrendingUp: React.FC<AnimatedTrendingUpProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} animate-trending-up`}
  >
    <polyline 
      className="animate-draw-line" 
      style={{ animationDelay: '0.5s' }}
      points="22 7 13.5 15.5 8.5 10.5 2 17" 
    />
    <polyline 
      className="animate-draw-arrow"
      points="16 7 22 7 22 13" 
    />
  </svg>
);

export default AnimatedTrendingUp;