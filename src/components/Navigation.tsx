import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Users, Mail, BookOpen, Calculator, Package, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for scroll behavior
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // State to hold the timer IDs for dropdowns
  const [companyCloseTimer, setCompanyCloseTimer] = useState<NodeJS.Timeout | null>(null);
  const [productCloseTimer, setProductCloseTimer] = useState<NodeJS.Timeout | null>(null);
  
  // State for mobile dropdowns
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handles the shrinking effect
      setIsScrolled(currentScrollY > 20);

      // Handles the retracting (show/hide) effect
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      // Update the last scroll position, but only if the difference is significant to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleCompanyMouseEnter = () => {
    if (companyCloseTimer) clearTimeout(companyCloseTimer);
    if (productCloseTimer) clearTimeout(productCloseTimer);
    setIsCompanyDropdownOpen(true);
    setIsProductDropdownOpen(false);
  };

  const handleCompanyMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsCompanyDropdownOpen(false);
    }, 250); 
    setCompanyCloseTimer(timer);
  };

  const handleProductMouseEnter = () => {
    if (productCloseTimer) clearTimeout(productCloseTimer);
    if (companyCloseTimer) clearTimeout(companyCloseTimer);
    setIsProductDropdownOpen(true);
    setIsCompanyDropdownOpen(false);
  };

  const handleProductMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsProductDropdownOpen(false);
    }, 250);
    setProductCloseTimer(timer);
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileProducts = () => {
    setIsMobileProductsOpen(!isMobileProductsOpen);
  };
  
  const toggleMobileServices = () => {
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-200/80 transition-all duration-300 ${
            isScrolled ? 'shadow-md' : 'shadow-sm'
          }`}>
            <div className="flex justify-between items-center px-4 sm:px-6 py-2">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    src="/BendingWaters-8.png"
                    alt="Ploutos Page"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>

              {/* Desktop Navigation Items */}
              <div className="hidden md:flex items-center space-x-1">
                {/* Home Button */}
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-50">
                  <span>HOME</span>
                </Link>
                
                {/* Company Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={handleCompanyMouseEnter}
                  onMouseLeave={handleCompanyMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                  >
                    <span>COMPANY</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      isCompanyDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {isCompanyDropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in">
                      <div className="px-3">
                        <Link to="/about-us" className="flex items-center space-x-4 px-5 py-3 text-base text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:text-blue-600">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">About us</span>
                        </Link>
                        <Link to="/contact" className="flex items-center space-x-4 px-5 py-3 text-base text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:text-blue-600">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Contact Us</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={handleProductMouseEnter}
                  onMouseLeave={handleProductMouseLeave}
                >
                  <button
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-50"
                  >
                    <span>PRODUCT</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      isProductDropdownOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {isProductDropdownOpen &&