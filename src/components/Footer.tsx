import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" }
      ]
    },
    {
      title: "Products",
      links: [
        { name: "PEPCODE", href: "#" },
        { name: "OWA by PEPCODE", href: "#" },
        { name: "AUDITME", href: "#" },
        { name: "Book-keeping Services", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Support", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Community", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Cookies", href: "#" },
        { name: "Licenses", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
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
            <p className="text-gray-400 text-sm mb-4">
              Get a clear path to your financial goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="w-5 h-5 icon-hover-lift" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5 icon-hover-lift" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5 icon-hover-lift" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
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
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Copyright © 2024 Ploutos Page Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;