import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal routing
import { Facebook, Linkedin, Instagram } from 'lucide-react'; // Removed Twitter

const Footer = () => {
  // Updated links based on your instructions
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Products",
      links: [
        { name: "PEPCODE", href: "https://pepcodeinc.com/", isExternal: true },
        { name: "OWA by PEPCODE", href: "https://owabypepcode.com.ng/", isExternal: true },
        { name: "AUDITME", href: "https://auditme.com.ng/", isExternal: true }
      ]
    },
  ];

  return (
    <footer className="bg-custom-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img 
                src="/BendingWaters-8.png" 
                alt="Ploutos Page" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-white text-sm mb-4">
              Get a clear path to your financial goals.
            </p>
            <div className="flex space-x-4">
              <a href="https://web.facebook.com/ploutospage" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5 icon-hover-lift" />
              </a>
              <a href="https://www.linkedin.com/company/ploutos-page-limited/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5 icon-hover-lift" />
              </a>
              <a href="https://www.instagram.com/ploutospage/?hl=en" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200">
                <Instagram className="w-5 h-5 icon-hover-lift" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {/* Conditionally render Link or a standard anchor tag */}
                    {link.isExternal ? (
                      <a 
                        href={link.href}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link 
                        to={link.href}
                        className="text-white hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-white text-sm">
            {/* Dynamically update the year */}
            Copyright © {new Date().getFullYear()} Ploutos Page Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;