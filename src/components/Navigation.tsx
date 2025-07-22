import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productDropdown, setProductDropdown] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClasses = "text-gray-700 hover:text-blue-600 transition-colors duration-300 uppercase tracking-wider text-sm font-semibold";
  const activeLinkClasses = "text-blue-600";

  const dropdownMenuClasses = "absolute mt-4 w-64 bg-white rounded-lg shadow-xl py-2 z-20";
  const dropdownLinkClasses = "block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 p-4">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-full shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                Pepcode
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} end>Home</NavLink>
              
              <div className="relative" onMouseEnter={() => setCompanyDropdown(true)} onMouseLeave={() => setCompanyDropdown(false)}>
                <button className={`flex items-center ${navLinkClasses}`}>
                  Company <ChevronDown size={20} className="ml-1" />
                </button>
                <AnimatePresence>
                  {companyDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={dropdownMenuClasses}
                    >
                      <Link to="/about" className={dropdownLinkClasses}>About Us</Link>
                      <Link to="/careers" className={dropdownLinkClasses}>Careers</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative" onMouseEnter={() => setProductDropdown(true)} onMouseLeave={() => setProductDropdown(false)}>
                <button className={`flex items-center ${navLinkClasses}`}>
                  Product <ChevronDown size={20} className="ml-1" />
                </button>
                <AnimatePresence>
                  {productDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={dropdownMenuClasses}
                    >
                      <Link to="/products/pepcode" className={dropdownLinkClasses}>Pepcode</Link>
                      <Link to="/products/owa" className={dropdownLinkClasses}>Owa by Pepcode</Link>
                      <Link to="/products/auditme" className={dropdownLinkClasses}>AuditMe</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink to="/blog" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Blog</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 focus:outline-none">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white mt-2 rounded-lg shadow-xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} end>Home</NavLink>
              
              <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">About Us</Link>
              <Link to="/careers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Careers</Link>

              <Link to="/products/pepcode" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Pepcode</Link>
              <Link to="/products/owa" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Owa by Pepcode</Link>
              <Link to="/products/auditme" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">AuditMe</Link>
              
              <NavLink to="/blog" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>Blog</NavLink>
              
              <div className="p-4">
                <Link to="/contact" className="w-full text-center bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
