import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const Success = () => {
  return (
    <>
      <Helmet>
        <title>תשלום הושלם בהצלחה!</title>
        <meta name="description" content="התשלום שלך הושלם בהצלחה. תודה על רכישתך!" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="max-w-2xl mx-auto text-center bg-white p-12 rounded-2xl shadow-lg"
          >
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
            <h1 className="text-4xl font-bold text-blue-900 mb-4">תודה רבה!</h1>
            <p className="text-xl text-gray-600 mb-8">
              התשלום שלך הושלם בהצלחה. אישור הזמנה נשלח אליך במייל.
            </p>
            <Link
              to="/store"
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 ml-2" />
              חזרה לחנות
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Success;