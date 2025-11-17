import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Plus, Minus } from 'lucide-react';

const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5 px-6 text-white hover:bg-gray-800 transition-colors"
      >
        <span className="text-lg font-medium">{title}</span>
        {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
};


const Contact = () => {
    const faqs = [
    {
      question: "How much does Pepcode cost?",
      answer: "We offer a range of pricing plans to suit different business needs and budgets. Please contact us for a custom quote."
    },
    {
      question: "Can I use ÓWÀ without a smartphone?",
      answer: "Yes. ÓWÀ is designed for market women without internet access. Our field agents keep your records in a record book during weekly visits and send you a simple SMS summary — no smartphone needed."
    },
    {
      question: "Who performs the audit on AuditMe?",
      answer: "All audits are carried out by ICAN‑ and ANAN‑certified chartered accountants who adhere to International Standards on Auditing (ISA), ensuring every report is fully compliant."
    },
    {
      question: "Can I get loans through ÓWÀ?",
      answer: "Yes. While ÓWÀ itself doesn’t lend money, the verified transaction history it creates makes it easier for our micro‑finance partners to approve small business loans. Your agent can guide you through the process whenever you’re ready."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Main Contact Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Contact Info */}
            <div className="lg:mt-8">
              <p className="text-sm font-bold text-blue-600 uppercase"></p>
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                Approachable & Conversational
              </h1>
              <p className="text-base md:text-xl text-gray-600 mb-10">
                No question is too big or too small. We're happy to chat!
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-gray-700" />
                  <span className="text-lg text-gray-800 font-medium">admin@ploutospage.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-gray-700" />
                  <span className="text-lg text-gray-800 font-medium">(234) 802-424-7865</span>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-gray-700 mt-1" />
                  <div className="flex flex-col space-y-2">
                    <span className="text-lg text-gray-800 font-medium">Suite 5 Mojisola Mall Beach Road Ibeshe Ikorodu Lagos</span>
                    <span className="text-lg text-gray-800 font-medium">15 Manhattan Mall, 4th Avenue Gwarinpa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Work Email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg"
                >
                  Contact us
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <p className="text-sm font-bold text-blue-400 uppercase">FAQ</p>
                <h2 className="text-4xl font-bold text-white mt-2 mb-4">Frequently Asked Questions</h2>
                <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
                    We'd love to hear from you and discuss how we can simplify your financial management.
                </p>
            </div>
            <div className="bg-gray-800/50 rounded-xl overflow-hidden">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} title={faq.question}>
                        <p>{faq.answer}</p>
                    </AccordionItem>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;