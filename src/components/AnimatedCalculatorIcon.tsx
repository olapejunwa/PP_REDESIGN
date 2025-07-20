import React, { useState, useEffect, useRef } from 'react';

const AnimatedCalculatorIcon: React.FC<{ className?: string }> = ({ className }) => {
  const [displayValue, setDisplayValue] = useState('');
  const targetNumber = '1,234.56';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // This cleanup function is crucial. It runs when the component unmounts
    // or before the effect runs again, preventing memory leaks from old timers.
    const cleanup = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const startAnimation = () => {
      cleanup(); // Always clear previous timers before starting a new animation cycle
      let currentIndex = 0;
      setDisplayValue(''); // Reset display for the new cycle

      intervalRef.current = setInterval(() => {
        // This condition is key to preventing the "undefined" error.
        // It stops the interval from trying to access a character that doesn't exist.
        if (currentIndex >= targetNumber.length) {
          if (intervalRef.current) clearInterval(intervalRef.current); // Stop typing
          // Set a timeout to reset and restart the animation after a pause
          timeoutRef.current = setTimeout(startAnimation, 2000);
          return; // Exit the interval callback
        }
        
        // Append the next character
        setDisplayValue(prev => prev + targetNumber[currentIndex]);
        currentIndex++;
      }, 150); // Typing speed
    };

    startAnimation(); // Initial start of the animation

    return cleanup; // This will be called when the component is unmounted
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* This clipping path acts as a mask, ensuring the text cannot render outside the screen's boundaries. */}
        <clipPath id="calculator-screen-clip">
          <rect x="12" y="12" width="56" height="20" rx="4" />
        </clipPath>
      </defs>

      {/* Calculator Body - Light Purple Theme */}
      <rect x="5" y="5" width="70" height="90" rx="8" fill="#ede9fe" stroke="#dcd7fe" strokeWidth="1" />

      {/* Display Screen */}
      <rect x="12" y="12" width="56" height="20" rx="4" fill="#f5f3ff" />
      
      {/* The text element is clipped by the path defined above */}
      <text
        x="64"
        y="27"
        fontFamily="monospace"
        fontSize="10"
        fill="#5b21b6"
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
