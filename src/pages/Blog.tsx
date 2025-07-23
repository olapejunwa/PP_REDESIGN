import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Calendar, User, Eye } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  status: 'draft' | 'published';
  readTime: number;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load published posts from localStorage
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      try {
        const parsedPosts = JSON.parse(savedPosts);
        // Only show published posts
        const publishedPosts = parsedPosts.filter((post: BlogPost) => post.status === 'published');
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-primary">
              Our Blog
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-primary">
              Insights, news, and articles on financial management and business growth.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-primary">No blogs at the moment</h2>
              <p className="text-gray-600 max-w-md mx-auto font-primary">
                We're working on creating valuable content for you. Check back soon for insights on financial management and business growth.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
              {posts.map((post) => (
                <article key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="block mt-2">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 font-primary line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-base text-gray-500 font-primary leading-relaxed">
                          {post.excerpt || truncateContent(post.content)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {post.author && (
                          <span className="flex items-center font-primary">
                            <User className="w-4 h-4 mr-1" />
                            {post.author}
                          </span>
                        )}
                        <span className="flex items-center font-primary">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.readTime} min read
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-sm text-gray-500 font-primary">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors duration-200 font-primary">
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;