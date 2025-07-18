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
      { x: 20, y: 20 }, // Top left
      { x: 80, y: 30 }, // Over first bar
      { x: 120, y: 35 }, // Over second bar
      { x: 160, y: 25 }, // Over third bar
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
        style={{ overflow: 'visible' }}
      >
        {/* Document Background */}
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
        />
        
        {/* Document Header Lines */}
        <rect x="20" y="20" width="80" height="3" fill="#dee2e6" rx="1" />
        <rect x="20" y="28" width="60" height="2" fill="#dee2e6" rx="1" />
        
        {/* Chart Bars */}
        <g className="chart-bars">
          <rect
            x="30"
            y="70"
            width="15"
            height="25"
            fill="#3b82f6"
            rx="2"
            className={`transition-all duration-500 ${
              animationPhase === 1 ? 'fill-blue-500 transform scale-110' : ''
            }`}
          />
          <rect
            x="55"
            y="55"
            width="15"
            height="40"
            fill="#3b82f6"
            rx="2"
            className={`transition-all duration-500 ${
              animationPhase === 2 ? 'fill-blue-500 transform scale-110' : ''
            }`}
          />
          <rect
            x="80"
            y="65"
            width="15"
            height="30"
            fill="#3b82f6"
            rx="2"
            className={`transition-all duration-500 ${
              animationPhase === 3 ? 'fill-blue-500 transform scale-110' : ''
            }`}
          />
        </g>
        
        {/* Magnifying Glass */}
        <g
          className="magnifying-glass transition-all duration-700 ease-in-out"
          style={{
            transform: `translate(${magnifierPosition.x}px, ${magnifierPosition.y}px)`,
          }}
        >
          {/* Magnifier Circle */}
          <circle
            cx="0"
            cy="0"
            r="18"
            fill="rgba(255, 255, 255, 0.9)"
            stroke="#6b7280"
            strokeWidth="3"
            className="drop-shadow-md"
          />
          
          {/* Magnifier Glass Effect */}
          <circle
            cx="0"
            cy="0"
            r="15"
            fill="rgba(59, 130, 246, 0.1)"
            className="animate-pulse"
          />
          
          {/* Magnifier Handle */}
          <line
            x1="13"
            y1="13"
            x2="25"
            y2="25"
            stroke="#6b7280"
            strokeWidth="4"
            strokeLinecap="round"
            className="drop-shadow-sm"
          />
          
          {/* Handle End */}
          <circle
            cx="25"
            cy="25"
            r="2"
            fill="#6b7280"
          />
        </g>
        
        {/* Insight Sparkles */}
        {animationPhase > 0 && (
          <g className="sparkles">
            <circle
              cx={magnifierPosition.x - 5}
              cy={magnifierPosition.y - 5}
              r="2"
              fill="#fbbf24"
              className="animate-ping"
            />
            <circle
              cx={magnifierPosition.x + 8}
              cy={magnifierPosition.y - 8}
              r="1.5"
              fill="#f59e0b"
              className="animate-ping"
              style={{ animationDelay: '0.2s' }}
            />
            <circle
              cx={magnifierPosition.x + 5}
              cy={magnifierPosition.y + 10}
              r="1"
              fill="#fbbf24"
              className="animate-ping"
              style={{ animationDelay: '0.4s' }}
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default AnimatedStarIcon;