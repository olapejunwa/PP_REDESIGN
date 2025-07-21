import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCalculatorIcon from './AnimatedCalculatorIcon';
import AnimatedTargetIcon from './AnimatedTargetIcon';
import AnimatedTrendingUp from './AnimatedTrendingUp';
import AnimatedFileText from './AnimatedFileText';
import AnimatedEyeIcon from './AnimatedEyeIcon';
import AnimatedStarIcon from './AnimatedStarIcon';

// CHANGE: Updated the OWA logo to the landscape version.
// NOTE: Please ensure the image file "Owa_Logo_Landscape.png" exists in your `public/images/` directory.
// The original file was 'image_3bf784.jpg', please rename and move it.
import owaLogo from '/images/Owa_Logo_Landscape.png';
import auditMeLogo from '/images/auditme.webp';
import pepcodeLogo from '/images/pepcode logo.webp';

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const services: Service[] = [
    {
      icon: <AnimatedCalculatorIcon />,
      title: "Tax Planning & Preparation",
      description: "We help you navigate the complexities of tax laws to minimize your liability and maximize your returns."
    },
    {
      icon: <AnimatedTargetIcon />,
      title: "Bookkeeping Services",
      description: "Our meticulous bookkeeping services provide you with accurate and up-to-date financial records."
    },
    {
      icon: <AnimatedTrendingUp />,
      title: "Financial Consulting",
      description: "We offer expert financial advice to help you make informed decisions and achieve your business goals."
    },
    {
      icon: <AnimatedFileText />,
      title: "Payroll Services",
      description: "Simplify your payroll processes with our reliable and efficient payroll management solutions."
    },
    {
      icon: <AnimatedEyeIcon />,
      title: "Audit & Assurance",
      description: "Gain confidence in your financial reporting with our comprehensive audit and assurance services."
    },
    {
      icon: <AnimatedStarIcon />,
      title: "Business Advisory",
      description: "Strategic advice to help your business grow, improve profitability, and operate more effectively."
    }
  ];
  
  const partners = [
    {
      name: "OWA",
      logo: owaLogo,
    },
    {
      name: "AuditMe",
      logo: auditMeLogo,
    },
    {
      name: "PepCode",
      logo: pepcodeLogo,
    },
  ];

const Services = () => {
  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: partnersRef, inView: partnersInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={servicesRef}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of accounting services to meet the needs of individuals and businesses.
          </p>
        </motion.div>

        <div className="relative mt-12">
          {/* The container below enables horizontal scrolling on smaller screens */}
          <div className="overflow-x-auto pb-8">
            <motion.div
              ref={servicesRef}
              className="flex gap-8"
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  // CHANGE: Changed carousel items from rectangle (w-80 h-96) to a smaller square format (w-72 h-72).
                  // - This reduces whitespace and creates a more compact, modern look.
                  // - Added `justify-center` to vertically align the content within the new square shape.
                  // - Reduced padding from p-8 to p-6 and font size of description to better fit the smaller size.
                  className="flex-shrink-0 w-72 h-72 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center"
                  variants={itemVariants}
                >
                  <div className="text-blue-500 mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Partners Section */}
        <div className="mt-20">
          <motion.div
            ref={partnersRef}
            initial="hidden"
            animate={partnersInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-700">Trusted by Leading Companies</h3>
            <div className="w-20 h-1 bg-gray-300 mx-auto mt-3 mb-8"></div>
          </motion.div>
          
          <motion.div 
            className="flex justify-center items-center gap-8 md:gap-16 mt-8 flex-wrap"
            ref={partnersRef}
            initial="hidden"
            animate={partnersInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <img src={partner.logo} alt={partner.name} className="h-12 md:h-16 object-contain" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
