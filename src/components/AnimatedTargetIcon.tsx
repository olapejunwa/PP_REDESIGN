import React, { useState, useEffect, useMemo, useCallback } from 'react';

/**
 * AnimatedTargetIcon Component - Mobile-Optimized Chart Animation
 * 
 * SOLUTION APPROACH: Primary Fix + Fallback
 * - Implements robust mobile detection and optimization
 * - Uses CSS transforms with hardware acceleration
 * - Provides static fallback for problematic devices
 * - Maintains accessibility and performance standards
 */

interface AnimatedTargetIconProps {
  /** Animation duration in seconds */
  animationDuration?: number;
  /** Scatter radius for initial animation */
  scatterRadius?: number;
  /** Force static mode (useful for testing) */
  forceStatic?: boolean;
}

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  supportsAnimations: boolean;
  prefersReducedMotion: boolean;
  browserEngine: 'webkit' | 'gecko' | 'blink' | 'unknown';
}

const AnimatedTargetIcon: React.FC<AnimatedTargetIconProps> = ({
  animationDuration = 1.2,
  scatterRadius = 50,
  forceStatic = false,
}) => {
  const [isAssembled, setIsAssembled] = useState(false);
  const [renderMode, setRenderMode] = useState<'static' | 'animated'>('static');

  // Comprehensive device capability detection
  const deviceCapabilities = useMemo((): DeviceCapabilities => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isLowEnd: false,
        supportsAnimations: false,
        prefersReducedMotion: false,
        browserEngine: 'unknown'
      };
    }

    // Mobile detection using multiple methods
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isMobileScreen = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = isMobileUA || (isMobileScreen && isTouchDevice);

    // Low-end device detection
    const isLowEnd = (
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
      (isMobile && window.devicePixelRatio <= 1)
    );

    // Browser engine detection for compatibility
    let browserEngine: DeviceCapabilities['browserEngine'] = 'unknown';
    if (userAgent.includes('webkit')) browserEngine = 'webkit';
    else if (userAgent.includes('gecko')) browserEngine = 'gecko';
    else if (userAgent.includes('chrome')) browserEngine = 'blink';

    // Animation support detection
    const supportsAnimations = (
      !forceStatic &&
      'requestAnimationFrame' in window &&
      'CSS' in window &&
      CSS.supports('transform', 'translateZ(0)') &&
      !isLowEnd
    );

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
      isMobile,
      isLowEnd,
      supportsAnimations: supportsAnimations && !prefersReducedMotion,
      prefersReducedMotion,
      browserEngine
    };
  }, [forceStatic]);

  // Determine render mode based on device capabilities
  useEffect(() => {
    const mode = deviceCapabilities.supportsAnimations ? 'animated' : 'static';
    setRenderMode(mode);
    
    // For static mode, immediately show assembled state
    if (mode === 'static') {
      setIsAssembled(true);
    }
  }, [deviceCapabilities.supportsAnimations]);

  // Animation trigger effect - only runs in animated mode
  useEffect(() => {
    if (renderMode !== 'animated') return;

    const timer = setTimeout(() => {
      setIsAssembled(true);
    }, 100); // Small delay to ensure smooth start

    return () => clearTimeout(timer);
  }, [renderMode]);

  // Optimized animation styles with hardware acceleration
  const getAnimationStyles = useCallback((elementIndex: number) => {
    const baseStyle: React.CSSProperties = {
      // Hardware acceleration for all modes
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    };

    if (renderMode === 'static') {
      return {
        ...baseStyle,
        opacity: 1,
        transform: 'translate3d(0, 0, 0) scale(1)',
      };
    }

    // Animated mode styles
    const isAnimated = isAssembled;
    const delay = elementIndex * 0.1;
    
    if (!isAnimated) {
      // Scattered initial state
      const angle = (elementIndex * 137.5) * (Math.PI / 180); // Golden angle
      const radius = scatterRadius + elementIndex * 8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = 45 + (elementIndex * 30);

      return {
        ...baseStyle,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(0.3)`,
        opacity: 0,
        transition: 'none',
        willChange: 'transform, opacity',
      };
    } else {
      // Assembled final state
      return {
        ...baseStyle,
        transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
        opacity: 1,
        transition: `all ${animationDuration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
        willChange: 'auto', // Remove will-change after animation
      };
    }
  }, [renderMode, isAssembled, scatterRadius, animationDuration]);

  // Chart elements with optimized rendering
  const chartElements = useMemo(() => [
    // Axes
    <g key="axes" style={getAnimationStyles(0)}>
      <line 
        x1="-20" y1="20" x2="20" y2="20" 
        stroke="#6b7280" 
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <line 
        x1="-20" y1="20" x2="-20" y2="-15" 
        stroke="#6b7280" 
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </g>,
    // Bar 1
    <g key="bar1" style={getAnimationStyles(1)}>
      <rect 
        x="-15" y="-5" width="8" height="25" 
        fill="#3b82f6" 
        rx="1"
      />
    </g>,
    // Bar 2
    <g key="bar2" style={getAnimationStyles(2)}>
      <rect 
        x="-3" y="-15" width="8" height="35" 
        fill="#3b82f6" 
        rx="1"
      />
    </g>,
    // Bar 3
    <g key="bar3" style={getAnimationStyles(3)}>
      <rect 
        x="9" y="-10" width="8" height="30" 
        fill="#3b82f6" 
        rx="1"
      />
    </g>,
  ], [getAnimationStyles]);

  // Container styles optimized for mobile
  const containerStyle: React.CSSProperties = {
    width: '192px',
    height: '192px',
    // Mobile-specific optimizations
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  };

  // SVG styles with mobile optimizations
  const svgStyle: React.CSSProperties = {
    overflow: 'visible',
    // Mobile rendering optimizations
    shapeRendering: deviceCapabilities.isMobile ? 'optimizeSpeed' : 'geometricPrecision',
    imageRendering: deviceCapabilities.isMobile ? '-webkit-optimize-contrast' : 'auto',
    // Hardware acceleration
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <svg 
        width="192" 
        height="192" 
        viewBox="0 0 100 100" 
        style={svgStyle}
        role="img"
        aria-label="Animated chart showing data visualization"
      >
        <g transform="translate(50, 50)">
          {chartElements}
        </g>
      </svg>
    </div>
  );
};

export default AnimatedTargetIcon;