import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPostsData } from '@/data/blogPosts';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

const BlogPostPage = () => {
  const { id } = useParams();
  const post = blogPostsData.find(p => p.id.toString() === id);

  if (!post) {
    return <Navigate to="/blog" />;
  }

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <div className="bg-gray-50 pt-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-blue-800 hover:text-green-500 transition-colors mb-6">
              <ArrowLeft size={16} />
              חזרה לבלוג
            </Link>

            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <header className="text-right mb-8">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>
                <div className="flex items-center justify-end gap-6 mt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </header>

              <div className="relative h-96 rounded-lg overflow-hidden mb-8">
                <img 
                  alt={post.title}
                  className="w-full h-full object-cover"
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              </div>

              <article className="prose prose-lg max-w-none text-right mx-auto text-gray-700 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;