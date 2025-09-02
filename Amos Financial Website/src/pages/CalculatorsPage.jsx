import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { calculatorsData } from '@/data/calculatorsData';
import { ArrowLeft } from 'lucide-react';

const CalculatorsPage = () => {
  return (
    <>
      <Helmet>
        <title>מחשבונים פיננסיים - עמוס פתרונות פיננסיים</title>
        <meta name="description" content="מגוון מחשבונים פיננסיים שיעזרו לכם לנהל טוב יותר את הכספים שלכם: מחשבון מע'מ, הלוואות, ריבית דריבית ועוד." />
        <meta property="og:title" content="מחשבונים פיננסיים - עמוס פתרונות פיננסיים" />
        <meta property="og:description" content="מגוון מחשבונים פיננסיים שיעזרו לכם לנהל טוב יותר את הכספים שלכם: מחשבון מע'מ, הלוואות, ריבית דריבית ועוד." />
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
              <span className="gradient-text">מחשבונים פיננסיים</span> לעסק שלך
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              כלים פשוטים ונוחים שיעזרו לכם לקבל החלטות פיננסיות חכמות
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculators List */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculatorsData.map((calculator, index) => (
              <motion.div
                key={calculator.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl shadow-lg hover-scale flex flex-col items-center text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-full mb-6">
                  <calculator.icon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">{calculator.title}</h2>
                <p className="text-gray-700 leading-relaxed flex-grow">{calculator.description}</p>
                <Link 
                  to={`/calculators/${calculator.id}`} 
                  className="btn-primary mt-6 inline-flex items-center"
                >
                  השתמש במחשבון
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              צריכים עזרה עם המספרים?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              מעבר למחשבונים, אנו מציעים ייעוץ חשבונאי ופיננסי מקיף לעצמאיים ועסקים קטנים.
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

export default CalculatorsPage;