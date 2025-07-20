import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  // These variants define the animation states for the page.
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-100vw', // Start off-screen to the left
    },
    in: {
      opacity: 1,
      x: 0, // Animate to the center
    },
    out: {
      opacity: 0,
      x: '100vw', // Animate off-screen to the right
    },
  };

  // This defines the properties of the transition animation.
  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut', // A smoother easing function
    duration: 0.5,     // A slightly faster duration
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      // Absolute positioning is required for the in/out animations to not affect layout.
      // The parent container in App.tsx now handles layout preservation.
      className="absolute w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
