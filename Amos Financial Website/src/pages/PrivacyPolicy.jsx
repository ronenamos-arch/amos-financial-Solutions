import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Shield, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>מדיניות פרטיות - עמוס פתרונות פיננסיים</title>
        <meta name="description" content="מדיניות הפרטיות של עמוס פתרונות פיננסיים. אנו מחויבים להגנה על המידע האישי שלך." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-lg"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-800 to-green-500 text-white rounded-full mb-6">
                <Shield className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">מדיניות פרטיות</h1>
              <p className="text-xl text-gray-600 mt-4">עודכן לאחרונה: 13 באוגוסט 2025</p>
            </div>

            <div className="prose prose-lg max-w-none text-right mx-auto text-gray-700 leading-relaxed space-y-6">
              <p>
                ברוכים הבאים למדיניות הפרטיות של "עמוס פתרונות פיננסיים" ("אנחנו", "שלנו"). אנו מחויבים להגן על פרטיותך. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים, חושפים ומגנים על המידע שלך בעת ביקורך באתר האינטרנט שלנו.
              </p>

              <h2 className="font-bold text-2xl text-blue-800">איסוף מידע</h2>
              <p>
                אנו אוספים מידע שאתה מספק לנו ישירות, כגון שמך, כתובת הדוא"ל, מספר הטלפון והודעותיך כאשר אתה ממלא את טופס יצירת הקשר באתר. אנו עשויים גם לאסוף מידע באופן אוטומטי בעת הגלישה באתר, כגון כתובת IP, סוג דפדפן ודפים שנצפו.
              </p>

              <h2 className="font-bold text-2xl text-blue-800">שימוש במידע</h2>
              <p>
                המידע שאנו אוספים משמש אותנו כדי:
              </p>
              <ul>
                <li>לספק, לתפעל ולתחזק את האתר שלנו</li>
                <li>לשפר, להתאים אישית ולהרחיב את האתר שלנו</li>
                <li>להבין ולנתח כיצד אתה משתמש באתר שלנו</li>
                <li>לפתח מוצרים, שירותים, תכונות ופונקציונליות חדשים</li>
                <li>לתקשר איתך, ישירות או דרך אחד השותפים שלנו, כולל שירות לקוחות, כדי לספק לך עדכונים ומידע אחר הקשור לאתר, ולמטרות שיווק וקידום מכירות</li>
                <li>לשלוח לך אימיילים</li>
                <li>למצוא ולמנוע הונאות</li>
              </ul>

              <h2 className="font-bold text-2xl text-blue-800">שמירת נתונים</h2>
              <p>
                אנו שומרים את המידע האישי שלך רק כל עוד הוא נחוץ למטרות המפורטות במדיניות פרטיות זו. אנו נשמור ונשתמש במידע שלך במידה הדרושה כדי לעמוד בהתחייבויות המשפטיות שלנו, לפתור סכסוכים ולאכוף את המדיניות שלנו.
              </p>

              <h2 className="font-bold text-2xl text-blue-800">אבטחת מידע</h2>
              <p>
                אנו נוקטים באמצעי אבטחה סבירים כדי להגן על המידע האישי שלך. עם זאת, שום שיטת העברה דרך האינטרנט או שיטת אחסון אלקטרוני אינה מאובטחת ב-100%, ולכן איננו יכולים להבטיח את אבטחתה המוחלטת.
              </p>

              <h2 className="font-bold text-2xl text-blue-800">זכויותיך</h2>
              <p>
                בהתאם למיקומך, ייתכן שיש לך זכויות מסוימות בנוגע למידע האישי שלך, כולל הזכות לגשת, לתקן או למחוק את המידע שאנו מחזיקים אודותיך.
              </p>

              <h2 className="font-bold text-2xl text-blue-800">יצירת קשר</h2>
              <p>
                אם יש לך שאלות כלשהן בנוגע למדיניות פרטיות זו, אנא צור איתנו קשר בכתובת: <a href="mailto:ronenamosw@gmail.com" className="text-blue-600 hover:underline">ronenamosw@gmail.com</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;