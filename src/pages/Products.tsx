import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Products = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Products at Ploutos Improves Lives & Businesses
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                At Ploutos Page we are passionate about helping businesses succeed by providing them with the tools and support they need to manage their finances effectively.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                Get Started
              </button>
            </div>
            <div className="relative">
              <div className="bg-gray-200 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full"></div>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="w-32 h-32 bg-white rounded-lg shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PEPCODE Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-blue-600 rounded-2xl p-12 text-white">
              <h2 className="text-2xl font-bold mb-6">
                Bookkeeping Software: PEPCODE
              </h2>
              <p className="text-base md:text-lg text-blue-100 mb-8">
                Our bookkeeping software is designed to simplify and streamline your financial management processes.
              </p>
              <div className="bg-white rounded-lg p-6 mb-8">
                <div className="w-full h-48 bg-gray-100 rounded-lg"></div>
              </div>
              <button className="bg-cyan-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition-colors duration-200">
                Get Started
              </button>
            </div>
            <div className="space-y-6">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                With user-friendly interfaces, customizable features, and robust functionality, our software empowers you to take control of your finances and analysis, our software has everything you need to stay organized and informed.
              </p>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="w-full h-64 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDITME Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-blue-600 rounded-2xl p-12 text-white">
              <h2 className="text-2xl font-bold mb-6">
                Fast-Tracked Audited Accounts Platform: AuditMe
              </h2>
              <p className="text-base md:text-lg text-blue-100 mb-8">
                Simply upload your trial balance and audited accounts. Say goodbye to lengthy audit processes and hello to audited accounts in just days.
              </p>
              <div className="bg-white rounded-lg p-6 mb-8">
                <div className="w-full h-48 bg-gray-100 rounded-lg"></div>
              </div>
              <button className="bg-cyan-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition-colors duration-200">
                Get Started
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Streamline your audit process with AuditMe
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <p className="text-sm text-gray-600">Upload trial balance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <p className="text-sm text-gray-600">Automated processing</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <p className="text-sm text-gray-600">Get audited accounts</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Our platform integrates advanced technology and streamlined workflows to expedite the auditing process without compromising accuracy or quality. With our platform, you can enjoy peace of mind knowing that your financial statements are audit-ready in record time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;