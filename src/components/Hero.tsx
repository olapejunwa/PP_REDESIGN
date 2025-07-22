import { motion } from 'framer-motion';
import LavaLampBackground from './LavaLampBackground';

const Hero = () => {
  return (
    // CHANGE: Restructured the Hero section for better layout stability.
    // The main section is now a simple relative container.
    <section id="home" className="relative h-screen text-center text-white overflow-hidden">
      
      {/* Background elements are absolutely positioned to avoid interfering with content flow. */}
      <LavaLampBackground />
      
      <div className="absolute bottom-0 left-0 w-full h-auto z-0">
        <img src="/BendingWaters-8.png" alt="Decorative Wave" className="w-full h-auto" />
      </div>

      {/* CHANGE: Added a dedicated container for the main content.
          - It's set to full height (`h-full`) and uses flexbox (`flex flex-col items-center justify-center`)
            to robustly center the text and button, both vertically and horizontally.
          - `z-10` ensures it sits on top of the background elements.
          - This fixes layout issues where elements might not have been centered correctly
            or could have overlapped on different screen sizes. */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold"
        >
          EMPOWERING YOUR FINANCIAL FUTURE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-lg md:text-xl max-w-2xl"
        >
          Expert Accounting and Tax Services Tailored for You
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="mt-8 px-8 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
