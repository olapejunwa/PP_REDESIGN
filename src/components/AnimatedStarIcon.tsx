import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

/**
 * AnimatedStarIcon Component - Mobile-Optimized Magnifying Glass Animation
 * 
 * SOLUTION APPROACH: Primary Fix + Graceful Degradation
 * - Comprehensive mobile detection and optimization
 * - Hardware-accelerated CSS transforms
 * - Frame-rate adaptive animations
 * - Static fallback for problematic devices
 * - Accessibility-compliant with reduced motion support
 */

interface AnimatedStarIconProps {
  className?: string;
}

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  supportsHardwareAcceleration: boolean;
  browserEngine: 'webkit' | 'gecko' | 'blink' | 'unknown';
  devicePixelRatio: number;
}

interface AnimationState {
  phase: number;
  magnifierPosition: { x: number; y: number };
  isAnimating: boolean;
}

const AnimatedStarIcon: React.FC<AnimatedStarIconProps> = ({ className }) => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    phase: 0,
    magnifierPosition: { x: 100, y: 75 },
    isAnimating: false
  });
  
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);
  const phaseStartTimeRef = useRef<number>(0);

  // Enhanced device capabilities detection
  const deviceCapabilities = useMemo((): DeviceCapabilities => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isLowEnd: false,
        prefersReducedMotion: false,
        supportsHardwareAcceleration: false,
        browserEngine: 'unknown',
        devicePixelRatio: 1
      };
    }

    // Multi-method mobile detection
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isMobileScreen = window.innerWidth <= 768;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = isMobileUA || (isMobileScreen && isTouchDevice);

    // Performance capability detection
    const isLowEnd = (
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
      (isMobile && window.devicePixelRatio <= 1.5)
    );

    // Browser engine detection for optimization
    let browserEngine: DeviceCapabilities['browserEngine'] = 'unknown';
    if (userAgent.includes('webkit') || userAgent.includes('safari')) browserEngine = 'webkit';
    else if (userAgent.includes('firefox')) browserEngine = 'gecko';
    else if (userAgent.includes('chrome') || userAgent.includes('edge')) browserEngine = 'blink';

    // Hardware acceleration support
    const supportsHardwareAcceleration = (
      'CSS' in window &&
      CSS.supports('transform', 'translateZ(0)') &&
      CSS.supports('will-change', 'transform')
    );

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);

    return {
      isMobile,
      isLowEnd,
      prefersReducedMotion,
      supportsHardwareAcceleration,
      browserEngine,
      devicePixelRatio
    };
  }, []);

  // Animation configuration based on device capabilities
  const animationConfig = useMemo(() => {
    if (deviceCapabilities.prefersReducedMotion) {
      return { 
        enabled: false, 
        duration: 0, 
        phases: 1, 
        frameRate: 0,
        positions: [{ x: 100, y: 75 }]
      };
    }

    const positions = deviceCapabilities.isMobile ? [
      { x: 100, y: 75 }, // Center
      { x: 80, y: 75 },  // Left
      { x: 120, y: 75 }, // Right
    ] : [
      { x: 100, y: 75 }, // Center
      { x: 70, y: 75 },  // Left bar
      { x: 100, y: 75 }, // Center bar
      { x: 130, y: 75 }, // Right bar
    ];

    return {
      enabled: !deviceCapabilities.isLowEnd,
      duration: deviceCapabilities.isMobile ? 2500 : 3500,
      phases: positions.length,
      frameRate: deviceCapabilities.isMobile ? 30 : 60,
      positions
    };
  }, [deviceCapabilities]);

  // Frame-rate optimized animation loop
  const animationLoop = useCallback((currentTime: number) => {
    if (!animationConfig.enabled) return;

    const targetFrameTime = 1000 / animationConfig.frameRate;
    const deltaTime = currentTime - lastUpdateTimeRef.current;
    
    if (deltaTime < targetFrameTime) {
      animationFrameRef.current = requestAnimationFrame(animationLoop);
      return;
    }
    
    lastUpdateTimeRef.current = currentTime;
    
    // Phase timing calculation
    if (phaseStartTimeRef.current === 0) {
      phaseStartTimeRef.current = currentTime;
    }
    
    const phaseElapsed = currentTime - phaseStartTimeRef.current;
    const phaseDuration = animationConfig.duration / animationConfig.phases;
    
    if (phaseElapsed >= phaseDuration) {
      setAnimationState(prev => {
        const newPhase = (prev.phase + 1) % animationConfig.phases;
        return {
          ...prev,
          phase: newPhase,
          magnifierPosition: animationConfig.positions[newPhase]
        };
      });
      phaseStartTimeRef.current = currentTime;
    }
    
    animationFrameRef.current = requestAnimationFrame(animationLoop);
  }, [animationConfig]);

  // Animation lifecycle management
  useEffect(() => {
    if (!animationConfig.enabled) {
      setAnimationState(prev => ({
        ...prev,
        isAnimating: false,
        magnifierPosition: animationConfig.positions[0]
      }));
      return;
    }
    
    setAnimationState(prev => ({ ...prev, isAnimating: true }));
    phaseStartTimeRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(animationLoop);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationLoop, animationConfig]);

  // Sparkle configuration optimized for performance
  const sparkleConfig = useMemo(() => {
    if (deviceCapabilities.isLowEnd || deviceCapabilities.prefersReducedMotion || !animationConfig.enabled) {
      return { count: 0, positions: [] };
    }
    
    return {
      count: deviceCapabilities.isMobile ? 2 : 3,
      positions: [
        { x: -6, y: -6, delay: '0s', color: '#fbbf24' },
        { x: 8, y: -8, delay: '0.3s', color: '#f59e0b' },
        { x: 6, y: 10, delay: '0.6s', color: '#fbbf24' }
      ].slice(0, deviceCapabilities.isMobile ? 2 : 3)
    };
  }, [deviceCapabilities, animationConfig.enabled]);

  // Container styles with mobile optimizations
  const containerStyle: React.CSSProperties = {
    width: '192px',
    height: '192px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Mobile touch optimizations
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  };

  // SVG styles optimized for mobile rendering
  const svgStyle: React.CSSProperties = {
    overflow: 'visible',
    // Mobile-specific rendering optimizations
    shapeRendering: deviceCapabilities.isMobile ? 'optimizeSpeed' : 'geometricPrecision',
    imageRendering: deviceCapabilities.isMobile ? '-webkit-optimize-contrast' : 'auto',
    // Hardware acceleration
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    // Performance hints
    willChange: animationState.isAnimating ? 'transform' : 'auto',
    // Anti-aliasing
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  // Magnifying glass styles with hardware acceleration
  const magnifierStyle: React.CSSProperties = {
    transform: `translate3d(${animationState.magnifierPosition.x}px, ${animationState.magnifierPosition.y}px, 0)`,
    transition: deviceCapabilities.prefersReducedMotion 
      ? 'none' 
      : `transform ${deviceCapabilities.isMobile ? '0.6s' : '0.8s'} cubic-bezier(0.4, 0, 0.2, 1)`,
    willChange: animationState.isAnimating ? 'transform' : 'auto',
    transformOrigin: 'center',
    // Hardware acceleration
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <svg
        width="192"
        height="192"
        viewBox="0 0 200 150"
        className={className}
        style={svgStyle}
        role="img"
        aria-label="Animated magnifying glass analyzing chart data"
      >
        {/* Document Background */}
        <rect
          x="10" y="10" width="140" height="100"
          fill="#f8f9fa"
          stroke="#e9ecef"
          strokeWidth="2"
          rx="4"
          style={{ vectorEffect: 'non-scaling-stroke' }}
        />
        
        {/* Document Header Lines */}
        <rect x="20" y="20" width="80" height="3" fill="#dee2e6" rx="1" />
        <rect x="20" y="28" width="60" height="2" fill="#dee2e6" rx="1" />
        
        {/* Chart Bars with enhanced mobile visibility */}
        <g className="chart-bars">
          {[
            { x: 30, y: 70, width: 15, height: 25, phase: 1 },
            { x: 55, y: 55, width: 15, height: 40, phase: 2 },
            { x: 80, y: 65, width: 15, height: 30, phase: 3 }
          ].map((bar, index) => (
            <rect
              key={index}
              x={bar.x} y={bar.y} width={bar.width} height={bar.height}
              fill={animationState.phase === bar.phase ? '#3b82f6' : '#60a5fa'}
              rx="2"
              style={{
                vectorEffect: 'non-scaling-stroke',
                transition: deviceCapabilities.prefersReducedMotion ? 'none' : 'fill 0.4s ease-out',
                willChange: animationState.isAnimating ? 'fill' : 'auto',
              }}
            />
          ))}
        </g>
        
        {/* Magnifying Glass with hardware acceleration */}
        <g className="magnifying-glass" style={magnifierStyle}>
          {/* Main circle */}
          <circle
            cx="0" cy="0" r="18"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="#6b7280"
            strokeWidth="3"
            style={{ 
              vectorEffect: 'non-scaling-stroke',
              filter: deviceCapabilities.isMobile 
                ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' 
                : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
            }}
          />
          
          {/* Glass effect */}
          <circle
            cx="0" cy="0" r="15"
            fill="rgba(59, 130, 246, 0.08)"
            style={{
              animation: deviceCapabilities.prefersReducedMotion 
                ? 'none' 
                : `pulse ${deviceCapabilities.isMobile ? '2s' : '2.5s'} ease-in-out infinite`
            }}
          />
          
          {/* Handle */}
          <line
            x1="13" y1="13" x2="25" y2="25"
            stroke="#6b7280"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ 
              vectorEffect: 'non-scaling-stroke',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}
          />
          
          {/* Handle end */}
          <circle
            cx="25" cy="25" r="2.5"
            fill="#6b7280"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
        </g>
        
        {/* Sparkles - only render if enabled */}
        {animationState.phase > 0 && sparkleConfig.count > 0 && (
          <g className="sparkles">
            {sparkleConfig.positions.map((pos, index) => (
              <circle
                key={index}
                cx={animationState.magnifierPosition.x + pos.x}
                cy={animationState.magnifierPosition.y + pos.y}
                r={deviceCapabilities.isMobile ? 1.5 : 2}
                fill={pos.color}
                style={{ 
                  vectorEffect: 'non-scaling-stroke',
                  animation: deviceCapabilities.prefersReducedMotion 
                    ? 'none' 
                    : `ping ${deviceCapabilities.isMobile ? '1.2s' : '1.5s'} infinite ease-in-out`,
                  animationDelay: pos.delay,
                  willChange: animationState.isAnimating ? 'transform, opacity' : 'auto',
                }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

export default AnimatedStarIcon;