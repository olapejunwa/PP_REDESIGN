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
  }

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
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in">
                      <div className="px-2">
                        <Link to="/about-us" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:text-blue-600">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">About us</span>
                        </Link>
                        <Link to="/contact" className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:text-blue-600">
                          <Mail className="w-4 h-4 text-blue-600" />
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

                  {isProductDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in">
                      <div className="flex gap-4">
                        {/* Other Services - Left side */}
                        <div className="flex-1 space-y-1">
                          <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Other Services
                          </div>
                          <Link to="/bookkeeping-services" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:text-blue-600">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">Book-keeping Services</span>
                          </Link>
                          <Link to="/tax-services" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:text-blue-600">
                            <Calculator className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">Tax Services</span>
                          </Link>
                          <Link to="/inventory-management" className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:text-blue-600">
                            <Package className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">Inventory Management</span>
                          </Link>
                        </div>

                        {/* Main Products - Right side cards */}
                        <div className="w-56 space-y-2">
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Main Products
                          </div>

                          {/* PEPCODE */}
                          <a href="https://pepcodeinc.com/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 hover:bg-blue-50 rounded-xl transition-all duration-200">
                            <img src="/images/pepcode logo.webp" alt="PEPCODE Logo" className="w-8 h-8 mr-3 object-contain"/>
                            <div>
                                <div className="font-semibold text-blue-900">PEPCODE</div>
                                <div className="text-xs text-blue-700 mt-1">Bookkeeping Software</div>
                            </div>
                          </a>

                          {/* AUDITME */}
                          <a href="https://auditme.com.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 hover:bg-blue-50 rounded-xl transition-all duration-200">
                              <img src="/images/auditme.webp" alt="AUDITME Logo" className="w-8 h-8 mr-3 object-contain"/>
                              <div>
                                  <div className="font-semibold text-blue-900">AUDITME</div>
                                  <div className="text-xs text-blue-700 mt-1">Audit Platform</div>
                              </div>
                          </a>

                          {/* OWA by PEPCODE */}
                          <a href="https://owabypepcode.com.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 hover:bg-blue-50 rounded-xl transition-all duration-200">
                              <img src="/images/7.png" alt="OWA by PEPCODE Logo" className="w-8 h-8 mr-3 object-contain"/>
                              <div>
                                  <div className="font-semibold text-blue-900">OWA by PEPCODE</div>
                                  <div className="text-xs text-blue-700 mt-1">Paperless Bookkeeping</div>
                              </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Link to="/blog" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-50">
                  <span>BLOG</span>
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                  <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-gray-100">
                      {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                  </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 pt-20 md:hidden">
              <div className="container mx-auto px-4 py-8 space-y-4">
                  <Link to="/about-us" className="block text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>About Us</Link>
                  <Link to="/contact" className="block text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Contact</Link>
                  <Link to="/blog" className="block text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Blog</Link>
                  <div className="pt-4 border-t">
                      <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Products</h3>
                      <Link to="/bookkeeping-services" className="block text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Bookkeeping Services</Link>
                      <Link to="/tax-services" className="block text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Tax Services</Link>
                      <Link to="/inventory-management" className="block text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Inventory Management</Link>
                  </div>
              </div>
          </div>
      )}
    </>
  );
};

export default Navigation;
