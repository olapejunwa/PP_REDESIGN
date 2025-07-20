import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Insights, news, and articles on financial management and business growth.
            </p>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
            {/* Placeholder for blog posts */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600">
                      <span className="hover:underline">Article</span>
                    </p>
                    <div className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">Blog Post Title {index + 1}</p>
                      <p className="mt-3 text-base text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.
                      </p>
                    </div>
                  </div>
                   <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <span className="sr-only">Author</span>
                      <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        Author Name
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500">
                        <time dateTime="2025-07-20">July 20, 2025</time>
                        <span aria-hidden="true">&middot;</span>
                        <span>6 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
