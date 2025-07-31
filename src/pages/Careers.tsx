import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { MapPin, Clock, Users, Briefcase } from 'lucide-react';

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Accountant",
      department: "Finance",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "We're looking for an experienced Senior Accountant to join our growing finance team and help manage our clients' financial operations.",
      requirements: [
        "Bachelor's degree in Accounting or Finance",
        "5+ years of accounting experience",
        "Professional certification (ICAN, ACCA) preferred",
        "Experience with bookkeeping software",
        "Strong analytical and communication skills"
      ]
    },
    {
      title: "Software Developer",
      department: "Technology",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Join our tech team to develop and maintain our innovative financial management software solutions.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of software development experience",
        "Proficiency in React, Node.js, and TypeScript",
        "Experience with database management",
        "Knowledge of financial systems is a plus"
      ]
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Help our clients maximize the value of our services and ensure their success with our financial management solutions.",
      requirements: [
        "Bachelor's degree in Business or related field",
        "2+ years of customer success experience",
        "Excellent communication and problem-solving skills",
        "Experience in SaaS or financial services",
        "Strong relationship-building abilities"
      ]
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Lagos, Nigeria",
      type: "Full-time",
      description: "Drive our marketing initiatives and help grow our brand presence in the financial services market.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "2+ years of digital marketing experience",
        "Experience with content creation and social media",
        "Knowledge of SEO and analytics tools",
        "Creative thinking and analytical skills"
      ]
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Work with a passionate team of professionals dedicated to helping businesses succeed."
    },
    {
      icon: Briefcase,
      title: "Professional Growth",
      description: "Continuous learning opportunities and career advancement paths."
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and comprehensive time-off policies."
    },
    {
      icon: MapPin,
      title: "Great Location",
      description: "Modern office space in the heart of Lagos business district."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Join Our Team
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Be part of a dynamic team that's revolutionizing financial management for businesses across Nigeria. We're always looking for talented individuals who share our passion for excellence.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              At Ploutos Page, we believe our people are our greatest asset. We offer a supportive environment where you can grow your career while making a real impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-base md:text-xl text-gray-600">
              Explore our available positions and find your next career opportunity.
            </p>
          </div>
          
          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.department}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 self-start">
                    Apply Now
                  </button>
                </div>
                
                <p className="text-base md:text-lg text-gray-600 mb-6">{job.description}</p>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-base text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Application Process
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our hiring process is designed to be thorough yet efficient, ensuring we find the right fit for both you and our team.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Apply Online</h3>
              <p className="text-base text-gray-600">Submit your application and resume through our online portal.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Initial Review</h3>
              <p className="text-base text-gray-600">Our HR team reviews your application and qualifications.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interview</h3>
              <p className="text-base text-gray-600">Meet with our team to discuss your experience and fit.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Welcome Aboard</h3>
              <p className="text-base text-gray-600">Join our team and start making an impact from day one.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;