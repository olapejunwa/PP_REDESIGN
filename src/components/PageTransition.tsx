import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  /** Unique key to trigger transition when page changes */
  pageKey: string;
  /** Duration of the transition in milliseconds */
  duration?: number;
  /** Custom className for styling */
  className?: string;
}

/**
 * PageTransition component provides smooth fade transitions between pages
 * Uses CSS transitions for optimal performance
 */
const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  pageKey,
  duration = 400,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPageKey, setCurrentPageKey] = useState(pageKey);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setCurrentPageKey(pageKey);
      return;
    }

    if (pageKey !== currentPageKey) {
      // Start fade out
      setIsVisible(false);
      
      // After fade out completes, update content and fade in
      const timer = setTimeout(() => {
        setCurrentPageKey(pageKey);
        setIsVisible(true);
      }, duration * 0.6); // Fade out takes 60% of total duration

      return () => clearTimeout(timer);
    }
  }, [pageKey, currentPageKey, duration]);

  const transitionStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };

  return (
    <div 
      className={`transition-container ${className}`}
      style={transitionStyle}
    >
      {children}
    </div>
  );
};

export default PageTransition;