import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import AnimatedStarIcon from './AnimatedStarIcon';
import AnimatedEyeIcon from './AnimatedEyeIcon';
import AnimatedTargetIcon from './AnimatedTargetIcon';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const About: React.FC = () => {
  const coreValues = [
    {
      icon: AnimatedStarIcon,
      title: 'Our Mission',
      description: 'To empower businesses with innovative and streamlined financial solutions that drive growth and ensure compliance.',
      color: 'text-purple-500',
    },
    {
      icon: AnimatedEyeIcon,
      title: 'Our Vision',
      description: 'To be the leading provider of automated accounting and auditing software, recognized for our commitment to excellence and customer success.',
      color: 'text-blue-500',
    },
    {
      icon: AnimatedTargetIcon,
      title: 'Our Goal',
      description: 'To simplify financial management for businesses of all sizes, providing tools that are both powerful and easy to use.',
      color: 'text-green-500',
    },
  ];

  return (
    <AnimatedSection>
      <section
        id="about"
        className="py-20 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(39, 171, 237, 0.3)), #f8fafc`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              At Pepcode, we are dedicated to revolutionizing the way businesses handle their finances. Our team of experts combines cutting-edge technology with deep industry knowledge to deliver solutions that are not only powerful but also intuitive and user-friendly.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
              >
                <div className="mb-6">
                  <value.icon className={`w-16 h-16 ${value.color}`} />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default About;
