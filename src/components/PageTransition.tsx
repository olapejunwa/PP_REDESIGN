import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  // These variants define the animation states for the page.
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-200px', // A more subtle slide from the left
    },
    in: {
      opacity: 1,
      x: 0, // Animate to the center
    },
    out: {
      opacity: 0,
      x: '200px', // A more subtle slide to the right
    },
  };

  // This defines the properties of the transition animation.
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate', // A slightly different easing function for a nice effect
    duration: 0.5,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      // Use `absolute` and `inset-0` to make the div fill its relative parent completely.
      // This is a more robust way to handle the sizing of the animated container.
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
