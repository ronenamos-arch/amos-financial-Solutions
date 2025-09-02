import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, TrendingUp, Shield, Zap, BarChart3, Brain, CheckCircle, Star } from 'lucide-react';

const Home = () => {
  const benefits = [
    {
      icon: Clock,
      title: 'חיסכון בזמן וכסף',
      description: 'תשכחו מניירת אינסופית – עם אוטומציה פיננסית וסוכני AI, תחסכו 10+ שעות בחודש ותפחיתו טעויות יקרות, כדי שתוכלו להתמקד בגידול העסק.'
    },
    {
      icon: BarChart3,
      title: 'דוחות ויזואליים חכמים',
      description: 'בעזרת Power BI, קבלו דשבורדים אינטראקטיביים שמראים לכם בזמן אמת את מצב העסק, כך שתקבלו החלטות מבוססות נתונים במקום לנחש.'
    },
    {
      icon: Brain,
      title: 'פתרונות מותאמים אישית',
      description: 'דיגיטציה של תהליכים לעצמאיים ועסקים קטנים – משירותי חשבונאות חכמה ועד ייעוץ AI, הכל זמין ושקוף, כדי שתרגישו בטוחים בכל צעד.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'יצירת קשר',
      description: 'קבעו שיחת ייעוץ חינם וספרו לי על האתגרים הפיננסיים שלכם'
    },
    {
      number: '02',
      title: 'ניתוח והתאמה',
      description: 'נבנה תוכנית מותאמת עם אוטומציה ו-Power BI שמתאימה בדיוק לעסק שלכם'
    },
    {
      number: '03',
      title: 'יישום ותמיכה',
      description: 'קבלו דוחות חכמים וחיסכון מיידי, עם תמיכה שוטפת כדי שתמיד תהיו צעד אחד קדימה'
    }
  ];

  const testimonials = [
    {
      name: 'יעל לוי',
      role: 'בעלת חנות אונליין',
      content: 'רונן הפך את הניהול הפיננסי שלי מחלום רע להצלחה. עם אוטומציה פיננסית ו-Power BI, חסכתי 12 שעות בחודש והגדלתי את הרווחים ב-20%.',
      rating: 5
    },
    {
      name: 'אורי גולן',
      role: 'מתכנת פרילנסר',
      content: 'כעצמאי, תמיד נאבקתי עם דוחות מס. רונן השתמש ב-AI בחשבונאות כדי להפוך הכל לאוטומטי ומדויק – עכשיו אני ישן בשקט.',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>רונן עמוס - רואה חשבון טכנולוגי ברמת גן | AI ואוטומציה</title>
        <meta name="description" content="רואה חשבון טכנולוגי ברמת גן. שירותי AI, אוטומציה ו-Power BI לעסקים קטנים ועצמאיים. חיסכון זמן וכסף. ייעוץ חינם." />
        <meta property="og:title" content="רונן עמוס - רואה חשבון טכנולוגי ברמת גן | AI ואוטומציה" />
        <meta property="og:description" content="רואה חשבון טכנולוגי ברמת גן. שירותי AI, אוטומציה ו-Power BI לעסקים קטנים ועצמאיים. חיסכון זמן וכסף. ייעוץ חינם." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center tech-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-right space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                שדרגו את הניהול הפיננסי שלכם עם{' '}
                <span className="gradient-text">רואה חשבון טכנולוגי</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                כרואה חשבון טכנולוגי, אני משלב AI בחשבונאות, אוטומציה פיננסית ו-Power BI כדי לחסוך לכם זמן וכסף, ולהפוך את החשבונאות לחכמה ומדויקת יותר.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link to="/contact" className="btn-primary text-center">
                  קבעו שיחת ייעוץ חינם עכשיו
                  <ArrowLeft className="inline w-5 h-5 mr-2" />
                </Link>
                <Link to="/services" className="btn-secondary text-center">
                  למדו עוד על השירותים שלנו
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="floating-animation">
                <img  
                  alt="רואה חשבון טכנולוגי עובד עם מחשב ונתונים"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                 src="https://images.unsplash.com/photo-1578098576845-51e4ff4305d5" />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-blue-800 text-white p-4 rounded-xl shadow-lg"
              >
                <Zap className="w-6 h-6" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-green-500 text-white p-4 rounded-xl shadow-lg"
              >
                <TrendingUp className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              למה לבחור ברואה חשבון טכנולוגי?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              שלושת היתרונות המרכזיים שיחסכו לכם זמן, כסף ויביאו לכם שקט נפשי
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 hover-scale"
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

      {/* How It Works Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">איך זה עובד?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              שלושה שלבים פשוטים לשדרוג הניהול הפיננסי שלכם
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-full text-2xl font-bold mb-6">
                  {step.number}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-full w-full h-0.5 bg-gradient-to-r from-blue-800 to-green-500 transform -translate-y-1/2 translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">מה הלקוחות אומרים</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              עדויות אמיתיות מלקוחות שכבר חווים את היתרונות של חשבונאות טכנולוגית
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl hover-scale"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 text-center">
                  "{testimonial.content}"
                </blockquote>
                <div className="text-center">
                  <div className="font-bold text-blue-800">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
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
              מוכנים לשדרג את הניהול הפיננסי שלכם?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              קבעו שיחת ייעוץ חינם עכשיו וגלו איך AI ואוטומציה יכולים לחסוך לכם זמן וכסף
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
                to="/services" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-800 transition-colors"
              >
                למדו עוד על השירותים
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;