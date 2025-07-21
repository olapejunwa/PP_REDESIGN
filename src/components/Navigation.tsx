import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  {
    name: 'Services',
    dropdown: [
      { name: 'Bookkeeping Services', path: '/services/bookkeeping' },
      { name: 'Tax Services', path: '/services/tax' },
      { name: 'Inventory Management', path: '/services/inventory' },
    ],
  },
  { name: 'Products', path: '/products' },
  { name: 'Blog', path: '/blog' },
  { name: 'Careers', path: '/careers' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownEnter = (name: string) => {
    if (window.innerWidth >= 768) {
      setOpenDropdown(name);
    }
  };

  const handleDropdownLeave = () => {
    if (window.innerWidth >= 768) {
      setOpenDropdown(null);
    }
  };
  
  const handleDropdownClick = (name: string) => {
    if (window.innerWidth < 768) {
      setOpenDropdown(openDropdown === name ? null : name);
    }
  };


  return (
    <header className="bg-primary/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 shadow-md">
      <nav className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Pep<span className="text-accent">Code</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li 
              key={link.name} 
              className="relative group"
              onMouseEnter={() => 'dropdown' in link && handleDropdownEnter(link.name)}
              onMouseLeave={() => 'dropdown' in link && handleDropdownLeave()}
            >
              {'dropdown' in link ? (
                <>
                  <button className="text-white hover:text-accent transition-colors duration-300 flex items-center">
                    {link.name}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  {openDropdown === link.name && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                      {link.dropdown.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.path}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`text-white transition-colors duration-300 pb-1 border-b-2 ${
                    location.pathname === link.path
                      ? 'border-accent'
                      : 'border-transparent hover:border-accent/70'
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        <Link to="/contact" className="hidden md:inline-block bg-accent hover:bg-yellow-400 text-primary font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
          Contact Us
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-primary/95">
          <ul className="flex flex-col items-center py-4">
            {navLinks.map((link) => (
              <li key={link.name} className="py-3 text-center">
                {'dropdown' in link ? (
                  <div>
                    <button 
                      onClick={() => handleDropdownClick(link.name)}
                      className="text-white text-lg font-semibold flex items-center"
                    >
                      {link.name}
                      <ChevronDown size={20} className={`ml-2 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                    </button>
                    {openDropdown === link.name && (
                       <ul className="mt-2 bg-white/10 rounded-lg">
                        {link.dropdown.map((item) => (
                          <li key={item.name} className="py-2">
                            <Link
                              to={item.path}
                              onClick={() => setIsOpen(false)}
                              className="text-gray-200 hover:text-white block px-4"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-white text-lg font-semibold ${
                      location.pathname === link.path ? 'text-accent' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
             <li className="mt-4">
                <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="bg-accent hover:bg-yellow-400 text-primary font-bold py-3 px-8 rounded-full transition-all duration-300"
                >
                  Contact Us
                </Link>
              </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navigation;