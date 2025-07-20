import React, { useState, useEffect, useRef } from 'react';

const AnimatedCalculatorIcon: React.FC<{ className?: string }> = ({ className }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const targetNumber = '1,234.56';

  useEffect(() => {
    const cleanup = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const startTypingAnimation = () => {
      cleanup();
      setDisplayValue('');
      setIsAnimating(true);
      
      let currentIndex = 0;
      
      intervalRef.current = setInterval(() => {
        if (currentIndex < targetNumber.length) {
          setDisplayValue(targetNumber.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          // Animation complete
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsAnimating(false);
          
          // Wait 2 seconds then restart
          timeoutRef.current = setTimeout(() => {
            startTypingAnimation();
          }, 2000);
        }
      }, 200);
    };

    // Start the animation
    startTypingAnimation();

    return cleanup;
  }, []);

  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="calculator-screen-clip">
          <rect x="12" y="12" width="56" height="20" rx="4" />
        </clipPath>
      </defs>

      {/* Calculator Body - Light Purple Theme */}
      <rect x="5" y="5" width="70" height="90" rx="8" fill="#e9d5ff" stroke="#d8b4fe" strokeWidth="1" />

      {/* Display Screen */}
      <rect x="12" y="12" width="56" height="20" rx="4" fill="#f3e8ff" stroke="#ddd6fe" strokeWidth="0.5" />
      
      {/* Display Text - Properly contained */}
      <text
        x="64"
        y="26"
        fontFamily="monospace"
        fontSize="7"
        fill="#7c3aed"
        textAnchor="end"
        clipPath="url(#calculator-screen-clip)"
        style={{ 
          maxWidth: '52px',
          overflow: 'hidden'
        }}
      >
        {displayValue}
      </text>

      {/* Buttons Grid */}
      <g fill="#faf5ff" stroke="#ddd6fe" strokeWidth="0.5">
        {/* Row 1 */}
        <rect x="12" y="38" width="10" height="10" rx="2" />
        <rect x="26" y="38" width="10" height="10" rx="2" />
        <rect x="40" y="38" width="10" height="10" rx="2" />
        <rect x="54" y="38" width="10" height="10" rx="2" />
        
        {/* Row 2 */}
        <rect x="12" y="52" width="10" height="10" rx="2" />
        <rect x="26" y="52" width="10" height="10" rx="2" />
        <rect x="40" y="52" width="10" height="10" rx="2" />
        <rect x="54" y="52" width="10" height="10" rx="2" />
        
        {/* Row 3 */}
        <rect x="12" y="66" width="10" height="10" rx="2" />
        <rect x="26" y="66" width="10" height="10" rx="2" />
        <rect x="40" y="66" width="10" height="10" rx="2" />
        <rect x="54" y="66" width="10" height="10" rx="2" />
        
        {/* Row 4 */}
        <rect x="12" y="80" width="10" height="10" rx="2" />
        <rect x="26" y="80" width="10" height="10" rx="2" />
        <rect x="40" y="80" width="10" height="10" rx="2" />
        <rect x="54" y="80" width="10" height="10" rx="2" />
      </g>

      {/* Button Labels */}
      <g fill="#8b5cf6" fontSize="4" textAnchor="middle" fontFamily="sans-serif">
        <text x="17" y="45">C</text>
        <text x="31" y="45">±</text>
        <text x="45" y="45">%</text>
        <text x="59" y="45">÷</text>
        
        <text x="17" y="59">7</text>
        <text x="31" y="59">8</text>
        <text x="45" y="59">9</text>
        <text x="59" y="59">×</text>
        
        <text x="17" y="73">4</text>
        <text x="31" y="73">5</text>
        <text x="45" y="73">6</text>
        <text x="59" y="73">-</text>
        
        <text x="17" y="87">1</text>
        <text x="31" y="87">2</text>
        <text x="45" y="87">3</text>
        <text x="59" y="87">+</text>
      </g>
    </svg>
  );
};

export default AnimatedCalculatorIcon;