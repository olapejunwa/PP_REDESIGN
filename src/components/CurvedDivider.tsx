import React from 'react';

interface CurvedDividerProps {
  /** Top section background color */
  topColor?: string;
  /** Bottom section background color */
  bottomColor?: string;
  /** Height of the curved divider in pixels */
  height?: number;
  /** Curve intensity (0-100, where 100 is most curved) */
  curveIntensity?: number;
  /** Custom CSS class for additional styling */
  className?: string;
  /** Flip the curve direction */
  flipCurve?: boolean;
}

/**
 * CurvedDivider creates a smooth, curved transition between page sections
 * Eliminates gaps and provides seamless visual flow
 */
const CurvedDivider: React.FC<CurvedDividerProps> = ({
  topColor = '#3b82f6',
  bottomColor = '#1a1a1a',
  height = 100,
  curveIntensity = 50,
  className = '',
  flipCurve = false
}) => {
  // Calculate curve control points based on intensity
  const curveDepth = (curveIntensity / 100) * height;
  
  // SVG path for the curve - creates a smooth wave transition
  const curvePath = flipCurve
    ? `M0,${height} L0,${curveDepth} Q50,0 100,${curveDepth} L100,${height} Z`
    : `M0,0 L0,${height - curveDepth} Q50,${height} 100,${height - curveDepth} L100,0 Z`;

  return (
    <div 
      className={`curved-divider ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: `${height}px`,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        display: 'block'
      }}
    >
      {/* Bottom section background - fills entire divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: bottomColor,
          zIndex: 1
        }}
      />
      
      {/* Top section with curved bottom edge */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2
        }}
      >
        <defs>
          {/* Gradient definition for smooth color transitions */}
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={topColor} />
            <stop offset="100%" stopColor={topColor} />
          </linearGradient>
        </defs>
        
        <path
          d={curvePath}
          fill="url(#curveGradient)"
          style={{
            vectorEffect: 'non-scaling-stroke'
          }}
        />
      </svg>
    </div>
  );
};

export default CurvedDivider;