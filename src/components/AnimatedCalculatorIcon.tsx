import React, { useState, useEffect, useRef } from 'react';

const AnimatedCalculatorIcon: React.FC<{ className?: string }> = ({ className }) => {
  const [displayValue, setDisplayValue] = useState('');
  const targetNumber = '1,234.56';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup function to clear timers when the component unmounts or re-renders
    const cleanup = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const startAnimation = () => {
      cleanup(); // Clear any existing timers before starting
      let currentIndex = 0;
      setDisplayValue(''); // Start with a clean slate

      intervalRef.current = setInterval(() => {
        // Correctly check if we are still within the bounds of the string
        if (currentIndex < targetNumber.length) {
          // Use a function for setState to get the most recent state
          setDisplayValue(prev => prev + targetNumber[currentIndex]);
          currentIndex++;
        } else {
          // Once the full number is displayed, clear the interval
          if (intervalRef.current) clearInterval(intervalRef.current);
          // Set a timeout to reset the animation after a delay
          timeoutRef.current = setTimeout(startAnimation, 2000);
        }
      }, 150); // Typing speed
    };

    startAnimation(); // Initial start of the animation

    return cleanup; // Ensure timers are cleared on unmount
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Define a clipping path that matches the calculator screen */}
        <clipPath id="calculator-screen-clip">
          <rect x="12" y="12" width="56" height="20" rx="4" />
        </clipPath>
      </defs>

      {/* Calculator Body */}
      <rect x="5" y="5" width="70" height="90" rx="8" fill="#e9d5ff" stroke="#c4b5fd" strokeWidth="1" />

      {/* Display Screen */}
      <rect x="12" y="12" width="56" height="20" rx="4" fill="#f5f3ff" />
      
      {/* Apply the clipping path to the text element */}
      <text
        x="64"
        y="27"
        fontFamily="monospace"
        fontSize="10"
        fill="#4c1d95"
        textAnchor="end"
        clipPath="url(#calculator-screen-clip)"
      >
        {displayValue}
      </text>

      {/* Buttons Grid */}
      <g fill="#fff" stroke="#ddd6fe" strokeWidth="0.5">
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
