import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, XCircle } from 'lucide-react';
import { calculatorsData } from '@/data/calculatorsData';

const CalculatorEmbedPage = () => {
  const { calculatorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculator = calculatorsData.find(calc => calc.id === calculatorId);

  useEffect(() => {
    if (!calculator) {
      setError('מחשבון לא נמצא.');
      setLoading(false);
      // Optional: navigate back after a short delay if no calculator is found
      // setTimeout(() => navigate('/calculators'), 3000); 
      return;
    }

    const loadCalculator = async () => {
      try {
        const response = await fetch(calculator.file);
        if (!response.ok) {
          throw new Error(`Failed to load calculator: ${response.statusText}`);
        }
        const htmlContent = await response.text();
        const iframe = document.getElementById('calculator-iframe');
        if (iframe) {
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write(htmlContent);
          iframe.contentWindow.document.close();
        }
      } catch (err) {
        console.error("Error loading calculator:", err);
        setError(`שגיאה בטעינת המחשבון: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadCalculator();
  }, [calculatorId, calculator, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-16 w-16 text-blue-800 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 pt-32">
        <Link to="/calculators" className="inline-flex items-center gap-2 text-blue-800 hover:text-green-500 transition-colors mb-6">
          <ArrowLeft size={16} />
          חזרה למחשבונים
        </Link>
        <div className="text-center text-red-500 p-8 bg-red-50 rounded-2xl">
          <XCircle className="mx-auto h-16 w-16 mb-4" />
          <p className="mb-6">{error}</p>
        </div>
      </div>
    );
  }

  if (!calculator) {
    // Should be caught by the error state above, but as a fallback
    return <Navigate to="/calculators" />;
  }

  return (
    <>
      <Helmet>
        <title>{calculator.title} - מחשבונים פיננסיים</title>
        <meta name="description" content={calculator.description} />
        <meta property="og:title" content={calculator.title} />
        <meta property="og:description" content={calculator.description} />
      </Helmet>
      <div className="container mx-auto px-4 py-12 pt-32">
        <Link to="/calculators" className="inline-flex items-center gap-2 text-blue-800 hover:text-green-500 transition-colors mb-6">
          <ArrowLeft size={16} />
          חזרה למחשבונים
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-right"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{calculator.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{calculator.description}</p>

          <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              id="calculator-iframe"
              srcDoc="" // Initial empty srcDoc to be filled by JS
              title={calculator.title}
              className="w-full h-full border-none"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CalculatorEmbedPage;