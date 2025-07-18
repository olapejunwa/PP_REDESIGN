import React from 'react';

interface CurvedSeparatorProps {
  /** Position of the separator - affects the curve direction */
  position?: 'top' | 'bottom';
  /** Background color of the separator */
  backgroundColor?: string;
  /** Height of the separator in pixels */
  height?: number;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * CurvedSeparator creates a smooth, wave-like divider between sections
 * using SVG paths for a modern and fluid design.
 */
const CurvedSeparator: React.FC<CurvedSeparatorProps> = ({
  position = 'top',
  backgroundColor = '#1a1a1a', // Corresponds to bg-matte-black
  height = 120,
  className = '',
}) => {
  const separatorStyle: React.CSSProperties = {
    width: '100%',
    height: `${height}px`,
    backgroundColor: 'transparent',
  };

  // SVG path definitions for smooth curves
  const topPathD = "M0,0 L100,0 L100,20 C75,100 25,100 0,20 Z";
  const bottomPathD = "M0,100 L100,100 L100,80 C75,0 25,0 0,80 Z";

  return (
    <div
      className={`curved-separator ${className}`}
      style={separatorStyle}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <path
          d={position === 'top' ? topPathD : bottomPathD}
          fill={backgroundColor}
        />
      </svg>
    </div>
  );
};

export default CurvedSeparator;