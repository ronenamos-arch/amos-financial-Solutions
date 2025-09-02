import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Brain, TrendingUp, Zap, BarChart3, Shield, Calculator } from 'lucide-react';
import { blogPostsData } from '@/data/blogPosts';

const Blog = () => {
  const blogPosts = blogPostsData;
  const categories = ['הכל', ...new Set(blogPosts.map(post => post.category))];
  const [selectedCategory, setSelectedCategory] = React.useState('הכל');

  const filteredPosts = selectedCategory === 'הכל' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>בלוג חשבונאות טכנולוגית - טיפים, מדריכים וחדשות</title>
        <meta name="description" content="בלוג מקצועי על חשבונאות טכנולוגית: מדריכים על AI, אוטומציה פיננסית, Power BI וטיפים לעסקים קטנים ועצמאיים." />
        <meta property="og:title" content="בלוג חשבונאות טכנולוגית - טיפים, מדריכים וחדשות" />
        <meta property="og:description" content="בלוג מקצועי על חשבונאות טכנולוגית: מדריכים על AI, אוטומציה פיננסית, Power BI וטיפים לעסקים קטנים ועצמאיים." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center tech-pattern overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text">בלוג חשבונאות טכנולוגית</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              טיפים מעשיים, מדריכים מקצועיים וחדשות מעולם החשבונאות הדיגיטלית
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-800 to-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover-scale flex flex-col"
              >
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      alt={post.title}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    <div className="absolute top-4 right-4">
                      <div className="bg-gradient-to-r from-blue-800 to-green-500 text-white p-2 rounded-lg">
                        <post.icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-right leading-tight flex-grow">
                    <Link to={`/blog/${post.id}`} className="hover:text-blue-800 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-4 text-right leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <Link
                      to={`/blog/${post.id}`}
                      className="text-blue-800 font-semibold hover:text-green-500 transition-colors inline-flex items-center"
                    >
                      קרא עוד
                      <ArrowLeft className="w-4 h-4 mr-2" />
                    </Link>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse mt-4 pt-4 border-t">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding bg-gradient-to-br from-blue-800 to-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              הישארו מעודכנים
            </h2>
            <p className="text-xl mb-8 opacity-90">
              קבלו את המאמרים החדשים ביותר ישירות למייל שלכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="כתובת המייל שלכם"
                className="flex-grow px-6 py-3 rounded-lg text-gray-900 text-right"
              />
              <button
                onClick={() => {}}
                className="bg-white text-blue-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                הרשמה
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים ליישם את מה שלמדתם?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              קבעו שיחת ייעוץ חינם וגלו איך לשדרג את הניהול הפיננסי שלכם
            </p>
            <Link 
              to="/contact" 
              className="btn-primary inline-flex items-center"
            >
              קבעו שיחת ייעוץ חינם
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Blog;