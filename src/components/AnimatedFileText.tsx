import React from 'react';

interface AnimatedFileTextProps {
  className?: string;
}

const AnimatedFileText: React.FC<AnimatedFileTextProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path 
      className="animate-draw-line" 
      style={{ animationDelay: '0s' }}
      d="M14 2v4a2 2 0 0 0 2 2h4" 
    />
    <path 
      className="animate-draw-line" 
      style={{ animationDelay: '0.2s' }}
      d="M16 13H8" 
    />
    <path 
      className="animate-draw-line" 
      style={{ animationDelay: '0.4s' }}
      d="M16 17H8" 
    />
    <path 
      className="animate-draw-line" 
      style={{ animationDelay: '0.6s' }}
      d="M10 9H8" 
    />
  </svg>
);

export default AnimatedFileText;