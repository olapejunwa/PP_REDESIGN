import React from 'react';

interface SectionDividerProps {
  /** Color of the divider line and dot */
  color?: string;
  /** Width of the divider as a percentage */
  width?: number;
  /** Custom className for additional styling */
  className?: string;
  /** Margin around the divider */
  margin?: string;
}

/**
 * SectionDivider creates a subtle horizontal divider between sections
 * Features a gradient line with a center dot for visual appeal
 */
const SectionDivider: React.FC<SectionDividerProps> = ({
  color = '#374151',
  width = 60,
  className = '',
  margin = '4rem 0'
}) => {
  const dividerStyle: React.CSSProperties = {
    position: 'relative',
    height: '2px',
    width: `${width}%`,
    margin: `${margin} auto`,
    background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
  };

  const dotStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '12px',
    height: '12px',
    backgroundColor: color,
    borderRadius: '50%',
  };

  return (
    <div 
      className={`section-divider ${className}`}
      style={dividerStyle}
      role="presentation"
      aria-hidden="true"
    >
      <div style={dotStyle} />
    </div>
  );
};

export default SectionDivider;