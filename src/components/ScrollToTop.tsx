import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that ensures pages always load at the top
 * This is a more robust implementation that handles various edge cases
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Function to scroll to top with multiple fallback methods
    const scrollToTop = () => {
      // Method 1: Modern scrollTo with options
      if ('scrollTo' in window) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }
      
      // Method 2: Fallback for older browsers
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      // Method 3: Additional fallback
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };

    // Execute scroll immediately
    scrollToTop();

    // Additional scroll after DOM updates
    const timeoutId = setTimeout(scrollToTop, 0);
    
    // Scroll after next animation frame (ensures React has finished rendering)
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;