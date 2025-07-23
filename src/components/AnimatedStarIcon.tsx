import React, { useState, useEffect } from 'react';

interface AnimatedStarIconProps {
  className?: string;
}

const AnimatedStarIcon: React.FC<AnimatedStarIconProps> = ({ className }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 20, y: 20 });

  useEffect(() => {
    const animationDuration = 4000; // 4 seconds total
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, animationDuration / 4);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate magnifier position based on phase
    const positions = [
      { x: 100, y: 75 }, // Center of the document
      { x: 70, y: 75 },  // Over first bar
      { x: 100, y: 75 }, // Over second bar (center)
      { x: 130, y: 75 }, // Over third bar
    ];
    
    setMagnifierPosition(positions[animationPhase]);
  }, [animationPhase]);

  return (
    <div className="w-48 h-48 flex items-center justify-center">
      <svg
        width="192"
        height="192"
        viewBox="0 0 200 150"
        className={className}
        style={{ 
          overflow: 'visible',
          // Mobile optimization: crisp rendering
          shapeRendering: 'geometricPrecision',
          imageRendering: 'crisp-edges',
          // Prevent blur on mobile
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          // Optimize for mobile performance
          willChange: 'transform'
        }}
      >
        {/* Document Background - Enhanced for mobile clarity */}
        <rect
          x="10"
          y="10"
          width="140"
          height="100"
          fill="#f8f9fa"
          stroke="#e9ecef"
          strokeWidth="2"
          rx="4"
          className="transition-all duration-500"
          style={{
            // Mobile optimization: prevent anti-aliasing issues
            vectorEffect: 'non-scaling-stroke'
          }}
        />
        
        {/* Document Header Lines - Optimized stroke width for mobile */}
        <rect x="20" y="20" width="80" height="3" fill="#dee2e6" rx="1" />
        <rect x="20" y="28" width="60" height="2" fill="#dee2e6" rx="1" />
        
        {/* Chart Bars - Enhanced visibility on mobile */}
        <g className="chart-bars">
          <rect
            x="30"
            y="70"
            width="15"
            height="25"
            fill="#3b82f6"
            rx="2"
            className={`transition-colors duration-300 ${
              animationPhase === 1 ? 'fill-blue-500' : 'fill-blue-600'
            }`}
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
          <rect
            x="55"
            y="55"
            width="15"
            height="40"
            fill="#3b82f6"
            rx="2"
            className={`transition-colors duration-300 ${
              animationPhase === 2 ? 'fill-blue-500' : 'fill-blue-600'
            }`}
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
          <rect
            x="80"
            y="65"
            width="15"
            height="30"
            fill="#3b82f6"
            rx="2"
            className={`transition-colors duration-300 ${
              animationPhase === 3 ? 'fill-blue-500' : 'fill-blue-600'
            }`}
            style={{ vectorEffect: 'non-scaling-stroke' }}
          />
        </g>
        
        {/* Magnifying Glass - Enhanced for mobile performance */}
        <g
          className="magnifying-glass"
          style={{
            transform: `translate(${magnifierPosition.x}px, ${magnifierPosition.y}px)`,
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            // Mobile optimization
            willChange: 'transform',
            transformOrigin: 'center'
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
            className="drop-shadow-md"
            style={{ 
              vectorEffect: 'non-scaling-stroke',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
            }}
          />
          
          {/* Magnifier Glass Effect - Reduced opacity for mobile clarity */}
          <circle
            cx="0"
            cy="0"
            r="15"
            fill="rgba(59, 130, 246, 0.08)"
            className="animate-pulse"
            style={{ animationDuration: '2s' }}
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
        {animationPhase > 0 && (
          <g className="sparkles">
            <circle
              cx={magnifierPosition.x - 5}
              cy={magnifierPosition.y - 5}
              r="2.5"
              fill="#fbbf24"
              className="animate-ping"
              style={{ 
                animationDuration: '1.5s',
                vectorEffect: 'non-scaling-stroke'
              }}
            />
            <circle
              cx={magnifierPosition.x + 8}
              cy={magnifierPosition.y - 8}
              r="2"
              fill="#f59e0b"
              className="animate-ping"
              style={{ 
                animationDelay: '0.2s',
                animationDuration: '1.5s',
                vectorEffect: 'non-scaling-stroke'
              }}
            />
            <circle
              cx={magnifierPosition.x + 5}
              cy={magnifierPosition.y + 10}
              r="1.5"
              fill="#fbbf24"
              className="animate-ping"
              style={{ 
                animationDelay: '0.4s',
                animationDuration: '1.5s',
                vectorEffect: 'non-scaling-stroke'
              }}
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default AnimatedStarIcon;