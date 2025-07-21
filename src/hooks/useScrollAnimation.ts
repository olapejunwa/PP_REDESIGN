import { useState, useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.05, // Lower threshold for mobile
    rootMargin = '0px 0px -20px 0px', // Reduced margin for mobile
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if device is mobile
    const isMobile = window.innerWidth < 768;
    
    // Adjust options for mobile
    const mobileThreshold = isMobile ? 0.02 : threshold;
    const mobileRootMargin = isMobile ? '0px 0px -10px 0px' : rootMargin;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: mobileThreshold,
        rootMargin: mobileRootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible] as const;
};

export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));
  const [containerRef, isContainerVisible] = useScrollAnimation();

  useEffect(() => {
    if (isContainerVisible) {
      // Reduce delay on mobile for faster animations
      const isMobile = window.innerWidth < 768;
      const mobileDelay = isMobile ? delay * 0.6 : delay;
      
      const timers: NodeJS.Timeout[] = [];
      
      for (let i = 0; i < itemCount; i++) {
        const timer = setTimeout(() => {
          setVisibleItems(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, i * mobileDelay);
        
        timers.push(timer);
      }

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isContainerVisible, itemCount, delay]);

  return [containerRef, visibleItems] as const;
};