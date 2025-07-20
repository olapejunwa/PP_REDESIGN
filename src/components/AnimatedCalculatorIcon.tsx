import React, { useState, useEffect } from 'react';

const AnimatedCalculatorIcon: React.FC<{ className?: string }> = ({ className }) => {
  const [displayValue, setDisplayValue] = useState('');
  const targetNumber = '1,234.56';

  useEffect(() => {
    setDisplayValue(''); // Reset on re-render if needed
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < targetNumber.length) {
        setDisplayValue((prev) => prev + targetNumber[currentIndex]);
        currentIndex++;
      } else {
        // Pause at the end, then reset
        setTimeout(() => {
          setDisplayValue('');
          currentIndex = 0;
        }, 2000);
      }
    }, 150); // Typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calculator Body */}
      <rect x="5" y="5" width="70" height="90" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />

      {/* Display Screen */}
      <rect x="12" y="12" width="56" height="20" rx="4" fill="#e5e7eb" />
      <text
        x="64"
        y="27"
        fontFamily="monospace"
        fontSize="10"
        fill="#1f2937"
        textAnchor="end"
      >
        {displayValue}
      </text>

      {/* Buttons Grid */}
      <g fill="#fff" stroke="#d1d5db" strokeWidth="0.5">
        {Array.from({ length: 4 }).map((_, row) =>
          Array.from({ length: 4 }).map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={12 + col * 14}
              y={38 + row * 14}
              width="10"
              height="10"
              rx="2"
            />
          ))
        )}
      </g>
    </svg>
  );
};

export default AnimatedCalculatorIcon;
