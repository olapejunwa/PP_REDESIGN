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
 * CurvedSeparator creates a curved divider between sections
 * Inspired by modern web design patterns with smooth curves
 */
const CurvedSeparator: React.FC<CurvedSeparatorProps> = ({
  position = 'top',
  backgroundColor = '#1a1a1a',
  height = 120,
  className = ''
}) => {
  // Create the curved path for the separator
  const createCurvePath = () => {
    if (position === 'top') {
      return `polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)`;
    } else {
      return `polygon(0 40%, 50% 0, 100% 40%, 100% 100%, 0 100%)`;
    }
  };

  const separatorStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: `${height}px`,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  };

  const curveStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
    clipPath: createCurvePath(),
    transition: 'all 0.3s ease',
  };

  return (
    <div 
      className={`curved-separator ${className}`}
      style={separatorStyle}
      role="presentation"
      aria-hidden="true"
    >
      <div style={curveStyle} />
    </div>
  );
};

export default CurvedSeparator;