import { FC, cloneElement } from 'react';
import { motion } from 'framer-motion';
import AnimatedCalculatorIcon from './AnimatedCalculatorIcon';
import AnimatedTrendingUp from './AnimatedTrendingUp';
import AnimatedStarIcon from './AnimatedStarIcon';
import AnimatedTargetIcon from './AnimatedTargetIcon';
import AnimatedEyeIcon from './AnimatedEyeIcon';
import AnimatedFileText from './AnimatedFileText';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <AnimatedCalculatorIcon />,
    title: 'Bookkeeping Services',
    description: 'We handle your day-to-day financial recording and reporting, so you can focus on growing your business.',
    link: '/bookkeeping-services',
  },
  {
    icon: <AnimatedTrendingUp />,
    title: 'Financial Planning & Analysis',
    description: 'Gain valuable insights into your financial performance and make data-driven decisions for the future.',
    link: '#',
  },
  {
    icon: <AnimatedStarIcon />,
    title: 'Payroll Processing',
    description: 'Ensure your employees are paid accurately and on time, while staying compliant with all regulations.',
    link: '#',
  },
  {
    icon: <AnimatedTargetIcon />,
    title: 'Tax Preparation & Planning',
    description: 'Minimize your tax liability and stay ahead of deadlines with our expert tax services.',
    link: '/tax-services',
  },
  {
    icon: <AnimatedEyeIcon />,
    title: 'Inventory Management',
    description: 'Optimize your stock levels, reduce carrying costs, and improve cash flow with our inventory solutions.',
    link: '/inventory-management',
  },
  {
    icon: <AnimatedFileText />,
    title: 'Business Registration',
    description: 'Navigate the complexities of business registration with ease and get your venture started on the right foot.',
    link: '#',
  },
];

const Services: FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="text-lg text-gray-600 mt-4">
            We offer a comprehensive range of accounting services to meet the needs of your business.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="text-purple-600 mb-6">
                {/* Clone the icon element to override its size props */}
                {cloneElement(service.icon, { width: 72, height: 72 })}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
              <Link to={service.link} className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-300 mt-auto">
                Learn More &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
