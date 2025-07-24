import React from 'react';

/**
 * A self-contained, animated lava lamp background component.
 * It includes all necessary styles and SVG filters, optimized for performance.
 *
 * @returns {React.ReactElement} The lava lamp background element.
 */
const LavaLampBackground: React.FC = () => {
  // An array to easily render multiple blob elements.
  const blobs = Array.from({ length: 10 });

  return (
    <>
      {/* This style block contains all the CSS needed for the lava lamp effect.
        By including it here, the component is fully self-contained.
      */}
      <style>
        {`
          .lava-lamp-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
          }

          .lava-lamp {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            /* FIX: Apply the SVG filter defined in this component.
              This is the key to the "gooey" effect.
            */
            filter: url(#goo);
            /* EDIT: Changed background to a dark navy blue */
            background: #020C1B;
          }

          /* FIX: Define the keyframe animation for the blobs.
            We use 'transform: translate' because it's GPU-accelerated, ensuring smooth animation.
          */
          @keyframes move {
            0%   { transform: translate(0, 0); }
            25%  { transform: translate(40vw, -20vh); }
            50%  { transform: translate(-30vw, 30vh); }
            75%  { transform: translate(20vw, -50vh); }
            100% { transform: translate(0, 0); }
          }

          .blob {
            position: absolute;
            border-radius: 50%;
            /* EDIT: Changed gradient to shades of blue */
            background: linear-gradient(45deg, #7ED3FC, #3B82F6);
            
            /* OPTIMIZATION: Use the 'will-change' property to hint to the browser
              that the transform property will be animated. This allows for pre-optimization.
            */
            will-change: transform;
            
            /* FIX: Apply the animation to the blobs.
            */
            animation: move 20s ease-in-out infinite;
          }

          /* To create a more organic and less repetitive motion, we assign
            different sizes, positions, and animation timings to each blob
            using nth-child selectors.
          */
          .blob:nth-child(1) { width: 200px; height: 200px; top: 10%; left: 10%; animation-duration: 25s; }
          .blob:nth-child(2) { width: 150px; height: 150px; top: 20%; left: 80%; animation-duration: 22s; animation-delay: -5s; }
          .blob:nth-child(3) { width: 250px; height: 250px; top: 70%; left: 50%; animation-duration: 30s; animation-delay: -10s; }
          .blob:nth-child(4) { width: 180px; height: 180px; top: 80%; left: 15%; animation-duration: 28s; animation-delay: -2s; }
          .blob:nth-child(5) { width: 120px; height: 120px; top: 40%; left: 40%; animation-duration: 26s; animation-delay: -8s; }
          .blob:nth-child(6) { width: 170px; height: 170px; top: 50%; left: 75%; animation-duration: 23s; animation-delay: -3s; }
          .blob:nth-child(7) { width: 220px; height: 220px; top: 5%; left: 50%; animation-duration: 29s; animation-delay: -12s; }
          .blob:nth-child(8) { width: 130px; height: 130px; top: 90%; left: 90%; animation-duration: 21s; animation-delay: -6s; }
          .blob:nth-child(9) { width: 190px; height: 190px; top: 60%; left: 5%; animation-duration: 27s; animation-delay: -1s; }
          .blob:nth-child(10) { width: 160px; height: 160px; top: 30%; left: 65%; animation-duration: 24s; animation-delay: -7s; }
        `}
      </style>

      <div className="lava-lamp-container">
        {/* FIX: Define the SVG filter that creates the "goo" effect.
          - feGaussianBlur blurs the shapes.
          - feColorMatrix sharpens the alpha channel, creating crisp edges where blobs overlap.
          This SVG element is not rendered visually (`display: 'none'`).
        */}
        <svg style={{ display: 'none' }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        
        <div className="lava-lamp">
          {blobs.map((_, index) => (
            <div key={index} className="blob"></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LavaLampBackground;
