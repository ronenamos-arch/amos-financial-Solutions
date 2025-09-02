import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ProductsList from '@/components/ProductsList';

const Store = () => {
  return (
    <>
      <Helmet>
        <title>חנות - עמוס פתרונות פיננסיים</title>
        <meta name="description" content="עיינו במבחר המוצרים והשירותים הדיגיטליים שלנו, שנועדו לייעל את הניהול הפיננסי שלכם." />
        <meta property="og:title" content="חנות - עמוס פתרונות פיננסיים" />
        <meta property="og:description" content="עיינו במבחר המוצרים והשירותים הדיגיטליים שלנו, שנועדו לייעל את הניהול הפיננסי שלכם." />
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
              החנות <span className="gradient-text">הדיגיטלית</span> שלנו
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              מוצרים ושירותים שנועדו לחסוך לכם זמן, כסף ולהעניק לכם שקט נפשי
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <ProductsList />
        </div>
      </section>
    </>
  );
};

export default Store;