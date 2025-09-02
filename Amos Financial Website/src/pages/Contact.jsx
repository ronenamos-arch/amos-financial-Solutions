import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Linkedin, Facebook, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.message) {
      toast({
        title: "שגיאה",
        description: "אנא מלאו את כל השדות הנדרשים",
        duration: 5000,
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "שגיאה",
        description: "אנא הזינו כתובת מייל תקינה",
        duration: 5000,
      });
      return;
    }

    // Save to localStorage (simulating form submission)
    const contactSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const newSubmission = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    contactSubmissions.push(newSubmission);
    localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));

    toast({
      title: "הודעה נשלחה בהצלחה! ✅",
      description: "נחזור אליכם תוך 24 שעות",
      duration: 5000,
    });

    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'אימייל',
      value: 'ronenamosw@gmail.com',
      link: 'mailto:ronenamosw@gmail.com'
    },
    {
      icon: Phone,
      title: 'טלפון',
      value: '052-123-4567',
      link: 'tel:052-123-4567'
    },
    {
      icon: MapPin,
      title: 'כתובת',
      value: 'צבי 8, רמת גן',
      link: 'https://maps.google.com/?q=צבי 8, רמת גן'
    },
    {
      icon: Clock,
      title: 'שעות פעילות',
      value: 'א\'-ה\': 9:00-18:00, ו\': 9:00-13:00',
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>יצירת קשר - רונן עמוס רואה חשבון טכנולוגי | ייעוץ חינם</title>
        <meta name="description" content="צרו קשר עם רונן עמוס לייעוץ חינם בחשבונאות טכנולוגית. טלפון: 052-123-4567, מייל: ronenamosw@gmail.com, כתובת: צבי 8 רמת גן." />
        <meta property="og:title" content="יצירת קשר - רונן עמוס רואה חשבון טכנולוגי | ייעוץ חינם" />
        <meta property="og:description" content="צרו קשר עם רונן עמוס לייעוץ חינם בחשבונאות טכנולוגית. טלפון: 052-123-4567, מייל: ronenamosw@gmail.com, כתובת: צבי 8 רמת גן." />
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
              בואו נדבר על <span className="gradient-text">הצעד הבא</span> של העסק שלכם
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              רוצים לשמוע איך AI ואוטומציה יכולים לחסוך לכם זמן וכסף? בואו נקבע שיחת ייעוץ חינם.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6 text-right">שלחו לנו הודעה</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                      placeholder="הזינו את השם המלא שלכם"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      טלפון *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                      placeholder="050-1234567"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      אימייל *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      הודעה *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right resize-none"
                      placeholder="ספרו לנו על האתגרים הפיננסיים שלכם..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-800 to-green-500 text-white py-4 px-6 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                  >
                    <span>שלח הודעה</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="space-y-8">
                <div className="text-right">
                  <h2 className="text-2xl font-bold mb-4">פרטי התקשרות</h2>
                  <p className="text-gray-600 leading-relaxed">
                    נשמח לשמוע מכם ולעזור לכם לשדרג את הניהול הפיננסי של העסק
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4 rtl:space-x-reverse text-right"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-lg flex items-center justify-center">
                          <info.icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 hover:text-blue-800 transition-colors"
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t">
                  <h3 className="font-semibold text-gray-900 mb-4 text-right">עקבו אחרינו</h3>
                  <div className="flex justify-end space-x-4 rtl:space-x-reverse">
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-800 text-white rounded-lg flex items-center justify-center hover:bg-blue-900 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-blue-400 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">המיקום שלנו</h2>
            <p className="text-gray-600">בואו לפגישה אישית במשרד שלנו ברמת גן</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-4 rounded-2xl shadow-lg"
          >
            <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">מפה אינטראקטיבית</p>
                <p className="text-sm text-gray-500">צבי 8, רמת גן</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">שאלות נפוצות</h2>
            <p className="text-gray-600">תשובות לשאלות הנפוצות ביותר שאנו מקבלים</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: 'כמה זמן לוקח להטמיע אוטומציה פיננסית?',
                answer: 'התהליך לוקח בדרך כלל 2-4 שבועות, תלוי במורכבות העסק ובמערכות הקיימות.'
              },
              {
                question: 'האם השירותים מתאימים לעסקים קטנים?',
                answer: 'בהחלט! אנו מתמחים בפתרונות לעצמאיים ועסקים קטנים עד 15 עובדים.'
              },
              {
                question: 'מה כלול בשיחת הייעוץ החינמית?',
                answer: 'ניתוח הצרכים שלכם, הצגת פתרונות מותאמים והצעת מחיר מפורטת.'
              },
              {
                question: 'האם יש תמיכה שוטפת?',
                answer: 'כן, אנו מספקים תמיכה מלאה ועדכונים שוטפים לכל הפתרונות שלנו.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl"
              >
                <h3 className="font-bold text-lg mb-3 text-right">{faq.question}</h3>
                <p className="text-gray-600 text-right leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;