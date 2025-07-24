import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

/**
 * Optimized AnimatedStarIcon Component for Mobile Performance
 * 
 * Key Mobile Optimizations:
 * - Hardware acceleration with transform3d and will-change
 * - Simplified animation states on mobile devices
 * - Frame rate throttling for mobile (30fps vs 60fps desktop)
 * - Reduced DOM manipulation and re-renders
 * - CSS-based animations where possible
 * - Proper pixel density handling for high-DPI screens
 * - Memory-efficient state management
 */

interface AnimatedStarIconProps {
  className?: string;
}

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  supportsHardwareAcceleration: boolean;
}

const AnimatedStarIcon: React.FC<AnimatedStarIconProps> = ({ className }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 100, y: 75 });
  const animationFrameRef = useRef<number>();
  const lastUpdateTimeRef = useRef<number>(0);
  const phaseStartTimeRef = useRef<number>(0);

  // Memoized device capabilities detection
  const deviceCapabilities = useMemo((): DeviceCapabilities => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isLowEnd: false,
        prefersReducedMotion: false,
        supportsHardwareAcceleration: true
      };
    }

    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = isMobile && (navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    return {
      isMobile,
      isLowEnd,
      prefersReducedMotion,
      supportsHardwareAcceleration: 'transform3d' in document.createElement('div').style
    };
  }, []);

  // Memoized animation positions for performance
  const animationPositions = useMemo(() => {
    if (deviceCapabilities.isMobile) {
      // Simplified positions for mobile
      return [
        { x: 100, y: 75 }, // Center
        { x: 85, y: 75 },  // Left
        { x: 115, y: 75 }, // Right
      ];
    } else {
      // Full animation positions for desktop
      return [
        { x: 100, y: 75 }, // Center of the document
        { x: 70, y: 75 },  // Over first bar
        { x: 100, y: 75 }, // Over second bar (center)
        { x: 130, y: 75 }, // Over third bar
      ];
    }
  }, [deviceCapabilities.isMobile]);

  // Optimized animation timing
  const animationConfig = useMemo(() => {
    if (deviceCapabilities.prefersReducedMotion) {
      return { duration: 0, phases: 1 };
    }
    
    return {
      duration: deviceCapabilities.isMobile ? 3000 : 4000, // Faster on mobile
      phases: deviceCapabilities.isMobile ? 3 : 4,
      frameRate: deviceCapabilities.isMobile ? 30 : 60
    };
  }, [deviceCapabilities]);

  // Frame-rate optimized animation loop
  const animationLoop = useCallback((currentTime: number) => {
    if (deviceCapabilities.prefersReducedMotion) return;

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
      setAnimationPhase(prev => (prev + 1) % animationConfig.phases);
      phaseStartTimeRef.current = currentTime;
    }
    
    animationFrameRef.current = requestAnimationFrame(animationLoop);
  }, [deviceCapabilities.prefersReducedMotion, animationConfig]);

  // Optimized position updates with memoization
  useEffect(() => {
    if (deviceCapabilities.prefersReducedMotion) {
      setMagnifierPosition(animationPositions[0]);
      return;
    }
    
    setMagnifierPosition(animationPositions[animationPhase]);
  }, [animationPhase, animationPositions, deviceCapabilities.prefersReducedMotion]);

  // Animation lifecycle management
  useEffect(() => {
    if (deviceCapabilities.prefersReducedMotion) return;
    
    phaseStartTimeRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(animationLoop);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animationLoop, deviceCapabilities.prefersReducedMotion]);

  // Memoized sparkle configuration for performance
  const sparkleConfig = useMemo(() => {
    if (deviceCapabilities.isLowEnd || deviceCapabilities.prefersReducedMotion) {
      return { count: 0, size: 0 };
    }
    
    return {
      count: deviceCapabilities.isMobile ? 2 : 3,
      size: deviceCapabilities.isMobile ? 1.5 : 2,
      positions: [
        { x: -5, y: -5, delay: '0s' },
        { x: 8, y: -8, delay: '0.2s' },
        { x: 5, y: 10, delay: '0.4s' }
      ]
    };
  }, [deviceCapabilities]);

  return (
    <div className="w-48 h-48 flex items-center justify-center">
      <svg
        width="192"
        height="192"
        viewBox="0 0 200 150"
        className={className}
        style={{ 
          overflow: 'visible',
          // Mobile performance optimizations
          shapeRendering: 'geometricPrecision',
          imageRendering: deviceCapabilities.isMobile ? '-webkit-optimize-contrast' : 'auto',
          // Hardware acceleration
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // Performance hints
          willChange: deviceCapabilities.prefersReducedMotion ? 'auto' : 'transform',
          // Anti-aliasing
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {/* Document Background - Optimized for mobile clarity */}
        <rect
          x="10"
          y="10"
          width="140"
          height="100"
          fill="#f8f9fa"
          stroke="#e9ecef"
          strokeWidth="2"
          rx="4"
          style={{
            vectorEffect: 'non-scaling-stroke',
            // Hardware acceleration hint
            willChange: deviceCapabilities.prefersReducedMotion ? 'auto' : 'transform',
          }}
        />
        
        {/* Document Header Lines - Optimized stroke width for mobile */}
        <rect x="20" y="20" width="80" height="3" fill="#dee2e6" rx="1" />
        <rect x="20" y="28" width="60" height="2" fill="#dee2e6" rx="1" />
        
        {/* Chart Bars - Enhanced visibility with hardware acceleration */}
        <g className="chart-bars">
          {[
            { x: 30, y: 70, width: 15, height: 25, phase: 1 },
            { x: 55, y: 55, width: 15, height: 40, phase: 2 },
            { x: 80, y: 65, width: 15, height: 30, phase: 3 }
          ].map((bar, index) => (
            <rect
              key={index}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={animationPhase === bar.phase ? '#3b82f6' : '#60a5fa'}
              rx="2"
              style={{
                vectorEffect: 'non-scaling-stroke',
                transition: deviceCapabilities.prefersReducedMotion ? 'none' : 'fill 0.3s ease-out',
                willChange: deviceCapabilities.prefersReducedMotion ? 'auto' : 'fill',
              }}
            />
          ))}
        </g>
        
        {/* Magnifying Glass - Hardware accelerated with optimized transforms */}
        <g
          className="magnifying-glass"
          style={{
            transform: `translate3d(${magnifierPosition.x}px, ${magnifierPosition.y}px, 0)`,
            transition: deviceCapabilities.prefersReducedMotion 
              ? 'none' 
              : `transform ${deviceCapabilities.isMobile ? '0.5s' : '0.7s'} cubic-bezier(0.4, 0, 0.2, 1)`,
            willChange: deviceCapabilities.prefersReducedMotion ? 'auto' : 'transform',
            transformOrigin: 'center',
            // Hardware acceleration
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Magnifier Circle - Optimized for mobile clarity */}
          <circle
            cx="0"
            cy="0"
            r="18"
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
          
          {/* Magnifier Glass Effect - Reduced opacity for mobile clarity */}
          <circle
            cx="0"
            cy="0"
            r="15"
            fill="rgba(59, 130, 246, 0.08)"
            style={{
              animation: deviceCapabilities.prefersReducedMotion 
                ? 'none' 
                : `pulse ${deviceCapabilities.isMobile ? '1.5s' : '2s'} ease-in-out infinite`
            }}
          />
          
          {/* Magnifier Handle - Enhanced stroke for mobile */}
          <line
            x1="13"
            y1="13"
            x2="25"
            y2="25"
            stroke="#6b7280"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ 
              vectorEffect: 'non-scaling-stroke',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}
          />
          
          {/* Handle End - Enhanced for mobile visibility */}
          <circle
            cx="25"
            cy="25"
            r="2.5"
            fill="#6b7280"
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
        </g>
        
        {/* Insight Sparkles - Optimized for mobile performance */}
        {animationPhase > 0 && sparkleConfig.count > 0 && (
          <g className="sparkles">
            {sparkleConfig.positions.slice(0, sparkleConfig.count).map((pos, index) => (
              <circle
                key={index}
                cx={magnifierPosition.x + pos.x}
                cy={magnifierPosition.y + pos.y}
                r={sparkleConfig.size}
                fill={index % 2 === 0 ? '#fbbf24' : '#f59e0b'}
                style={{ 
                  vectorEffect: 'non-scaling-stroke',
                  animation: deviceCapabilities.prefersReducedMotion 
                    ? 'none' 
                    : `ping ${deviceCapabilities.isMobile ? '1s' : '1.5s'} infinite ease-in-out`,
                  animationDelay: pos.delay,
                  willChange: deviceCapabilities.prefersReducedMotion ? 'auto' : 'transform, opacity',
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