import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Building2, GraduationCap, Zap, BarChart3, Brain, Cog, TrendingUp, FileText, Calculator, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Services = () => {
  const { toast } = useToast();

  const handleContactClick = () => {
    toast({
      title: "🚧 תכונה זו עדיין לא מיושמת",
      description: "אבל אל תדאגו! תוכלו לבקש אותה בהודעה הבאה! 🚀",
      duration: 5000,
    });
  };

  const serviceCategories = [
    {
      icon: Users,
      title: 'עבור עצמאיים',
      description: 'פתרונות מותאמים לעצמאיים ופרילנסרים',
      services: [
        {
          icon: Zap,
          title: 'ניהול חשבונות אוטומטי',
          description: 'אוטומציה פיננסית וסוכני AI לעיבוד חשבוניות'
        },
        {
          icon: BarChart3,
          title: 'דוחות ויזואליים ב-Power BI',
          description: 'דשבורדים אינטראקטיביים בזמן אמת'
        },
        {
          icon: Brain,
          title: 'ייעוץ AI בחשבונאות',
          description: 'המלצות אישיות ואופטימיזציה של מסים'
        },
        {
          icon: Cog,
          title: 'דיגיטציה של תהליכים',
          description: 'מעבר לתהליכים דיגיטליים מלאים'
        }
      ]
    },
    {
      icon: Building2,
      title: 'עבור עסקים קטנים',
      description: 'שירותים מקיפים לעסקים עד 15 עובדים',
      services: [
        {
          icon: TrendingUp,
          title: 'אוטומציה פיננסית כוללת',
          description: 'שכר, חשבוניות ודוחות אוטומטיים'
        },
        {
          icon: BarChart3,
          title: 'דשבורדים מתקדמים ב-Power BI',
          description: "KPI's ותחזיות"
        },
        {
          icon: Brain,
          title: 'חשבונאות חכמה עם AI',
          description: 'ניתוח נתונים וזיהוי מגמות'
        },
        {
          icon: Shield,
          title: 'ייעוץ דיגיטלי לעסקים',
          description: 'אינטגרציה עם מערכות קיימות'
        }
      ]
    },
    {
      icon: GraduationCap,
      title: 'עבור רואי חשבון מתחילים',
      description: 'הדרכה והטמעת טכנולוגיות חדשות',
      services: [
        {
          icon: FileText,
          title: 'הדרכה באוטומציה פיננסית',
          description: 'קורסים אישיים'
        },
        {
          icon: BarChart3,
          title: 'יישום Power BI במשרד',
          description: 'הטמעה והדרכה'
        },
        {
          icon: Brain,
          title: 'ייעוץ AI לחשבונאות',
          description: 'שילוב טכנולוגיות חדשות'
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>שירותי חשבונאות טכנולוגית - AI, אוטומציה ו-Power BI</title>
        <meta name="description" content="שירותי חשבונאות טכנולוגית מתקדמים: אוטומציה פיננסית, דוחות Power BI, AI בחשבונאות ודיגיטציה של תהליכים לעצמאיים ועסקים קטנים." />
        <meta property="og:title" content="שירותי חשבונאות טכנולוגית - AI, אוטומציה ו-Power BI" />
        <meta property="og:description" content="שירותי חשבונאות טכנולוגית מתקדמים: אוטומציה פיננסית, דוחות Power BI, AI בחשבונאות ודיגיטציה של תהליכים לעצמאיים ועסקים קטנים." />
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
              שירותי <span className="gradient-text">חשבונאות טכנולוגית</span> מותאמים לצרכים שלכם
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              כרואה חשבון טכנולוגי, אני מציע שירותים שמשלבים AI בחשבונאות, אוטומציה פיננסית ו-Power BI כדי לפתור אתגרים פיננסיים יומיומיים.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className={`mb-20 ${categoryIndex !== serviceCategories.length - 1 ? 'border-b border-gray-200 pb-20' : ''}`}
            >
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-full mb-6">
                  <category.icon className="w-10 h-10" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{category.title}</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl hover-scale"
                  >
                    <div className="flex items-start space-x-4 rtl:space-x-reverse text-right">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-lg">
                          <service.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                        <button
                          onClick={handleContactClick}
                          className="text-blue-800 font-semibold hover:text-green-500 transition-colors inline-flex items-center"
                        >
                          לפרטים והצעת מחיר
                          <ArrowLeft className="w-4 h-4 mr-2" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">למה לבחור בשירותים שלנו?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              היתרונות הייחודיים של חשבונאות טכנולוגית
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: 'דיוק מקסימלי',
                description: 'AI ואוטומציה מבטיחים דיוק של 99.9% ומפחיתים טעויות אנוש'
              },
              {
                icon: TrendingUp,
                title: 'חיסכון משמעותי',
                description: 'חיסכון ממוצע של 15 שעות בחודש ו-30% בעלויות חשבונאות'
              },
              {
                icon: Shield,
                title: 'אבטחה מתקדמת',
                description: 'הגנה מלאה על הנתונים שלכם עם טכנולוגיות אבטחה מתקדמות'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover-scale"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-full mb-6">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              מוכנים להתחיל?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              קבעו שיחת ייעוץ חינם וגלו איך השירותים שלנו יכולים לשדרג את העסק שלכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                קבעו שיחת ייעוץ חינם
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-colors"
              >
                למדו עוד עלינו
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;