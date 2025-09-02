import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Users, TrendingUp, Zap, Brain, Shield } from 'lucide-react';
const About = () => {
  const achievements = [{
    icon: Award,
    title: '10+ שנות ניסיון',
    description: 'בתחום הפיננסי והחשבונאות'
  }, {
    icon: Users,
    title: 'מאות לקוחות מרוצים',
    description: 'עצמאיים ועסקים קטנים'
  }, {
    icon: TrendingUp,
    title: 'חיסכון ממוצע של 15 שעות',
    description: 'בחודש לכל לקוח'
  }];
  const values = [{
    icon: Zap,
    title: 'חיסכון בזמן וכסף',
    description: 'אוטומציה של תהליכים מסורבלים כדי שתוכלו להתמקד במה שחשוב באמת'
  }, {
    icon: Shield,
    title: 'שקיפות מלאה',
    description: 'תמיד תדעו בדיוק מה קורה עם הכספים שלכם, ללא הפתעות'
  }, {
    icon: Brain,
    title: 'פתרונות טכנולוגיים מתקדמים',
    description: 'שימוש בכלים החדשניים ביותר כמו AI ו-Power BI'
  }];
  return <>
      <Helmet>
        <title>אודות רונן עמוס - רואה חשבון טכנולוגי עם 10+ שנות ניסיון</title>
        <meta name="description" content="רונן עמוס, רואה חשבון טכנולוגי עם יותר מ-10 שנות ניסיון. התמחות ב-AI, אוטומציה פיננסית ו-Power BI. ניסיון בחברות הייטק מובילות." />
        <meta property="og:title" content="אודות רונן עמוס - רואה חשבון טכנולוגי עם 10+ שנות ניסיון" />
        <meta property="og:description" content="רונן עמוס, רואה חשבון טכנולוגי עם יותר מ-10 שנות ניסיון. התמחות ב-AI, אוטומציה פיננסית ו-Power BI. ניסיון בחברות הייטק מובילות." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center tech-pattern overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} className="relative order-1 lg:order-2">
              <div className="floating-animation">
                <img alt="רונן עמוס - רואה חשבון טכנולוגי" className="w-full h-auto rounded-2xl shadow-2xl" src="https://images.unsplash.com/photo-1578098576845-51e4ff4305d5" />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="text-right space-y-6 order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="gradient-text">רונן עמוס</span>
                <br />
                רואה חשבון טכנולוגי שמשנה את עולם החשבונאות
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                יותר מ-10 שנות ניסיון בשילוב טכנולוגיה מתקדמת עם שירותי חשבונאות מקצועיים
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-right">
            <motion.div initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} viewport={{
            once: true
          }} className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">הסיפור שלי</h2>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                  שלום, אני רונן עמוס, רואה חשבון טכנולוגי עם יותר מ-10 שנות ניסיון בתחום הפיננסי. התחלתי את דרכי כרואה חשבון מסורתי, אבל מהר מאוד הבנתי שהעולם משתנה – טכנולוגיה יכולה להפוך תהליכים מסורבלים לפשוטים ויעילים.
                </p>
                
                <p>אחרי שנים של עבודה בחברות כמו אירובוטיקס חברת הייטק מובילה, וצור ניהול קרנות הון, שם ניהלתי צוותים פיננסיים גדולים, החלטתי להתמקד בשילוב טכנולוגיה בחשבונאות.</p>
                
                <p>
                  כיום, אני מתמחה ביצירת חשבונאות חכמה לעצמאיים ועסקים קטנים. אני משתמש בכלים מתקדמים כמו סוכני AI כדי לאוטומט תהליכים שגוזלים זמן, כמו עיבוד חשבוניות והכנת דוחות.
                </p>
                
                <p>
                  מה שמניע אותי הוא הרצון להקל עליכם – עצמאיים ועסקים קטנים שמתמודדים עם לחץ יומיומי. אני מאמין שחשבונאות לא צריכה להיות כאב ראש, אלא כלי שמקדם צמיחה.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ההישגים שלנו במספרים</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              נתונים שמוכיחים את היעילות של הגישה הטכנולוגית שלנו
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: index * 0.2
          }} viewport={{
            once: true
          }} className="text-center p-8 rounded-2xl bg-white shadow-lg hover-scale">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-full mb-6">
                  <achievement.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 gradient-text">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">הערכים המרכזיים שלנו</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              העקרונות שמנחים אותנו בכל פרויקט ובכל לקוח
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 50
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: index * 0.2
          }} viewport={{
            once: true
          }} className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 hover-scale">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-full mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-blue-800 to-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              מוכנים לשדרג את הניהול הפיננסי? קבעו שיחת ייעוץ חינם עכשיו
            </h2>
            <p className="text-xl mb-8 opacity-90">
              בואו נדבר על איך אני יכול לעזור לכם לחסוך זמן וכסף עם פתרונות טכנולוגיים מתקדמים
            </p>
            <Link to="/contact" className="bg-white text-blue-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              קבעו שיחת ייעוץ חינם
              <ArrowLeft className="w-5 h-5 mr-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>;
};
export default About;