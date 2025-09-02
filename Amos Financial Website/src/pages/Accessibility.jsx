import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Accessibility as AccessibilityIcon } from 'lucide-react';

const Accessibility = () => {
  return (
    <>
      <Helmet>
        <title>הצהרת נגישות - עמוס פתרונות פיננסיים</title>
        <meta name="description" content="הצהרת הנגישות של עמוס פתרונות פיננסיים. אנו שואפים להבטיח שהשירותים שלנו יהיו נגישים לכלל האוכלוסייה." />
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
                <AccessibilityIcon className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">הצהרת נגישות</h1>
              <p className="text-xl text-gray-600 mt-4">אנו מחויבים לקידום אתר אינטרנט נגיש</p>
            </div>

            <div className="prose prose-lg max-w-none text-right mx-auto text-gray-700 leading-relaxed space-y-6">
              <p>
                "עמוס פתרונות פיננסיים" רואה חשיבות עליונה בהנגשת אתר האינטרנט שלה לאנשים עם מוגבלויות, ובכך לאפשר לכלל האוכלוסייה לגלוש באתר בקלות ובנוחות. אנו שואפים להבטיח שהשירותים הדיגיטליים שלנו יהיו נגישים לכולם.
              </p>

              <h2 className="font-bold text-2xl text-blue-800">רמת הנגישות</h2>
              <p>
                האתר נבנה בהתאם להוראות הנגישות המופיעות ב-W3C's Web Content Accessibility Guidelines (WCAG) 2.1 ברמה AA. אנו עושים מאמצים מתמידים לשמור ולשפר את רמת הנגישות של האתר.
              </p>

              <h2 className="font-bold text-2xl text-blue-800">התאמות שבוצעו באתר</h2>
              <ul>
                <li>האתר מותאם לדפדפנים מודרניים.</li>
                <li>האתר מותאם לשימוש בטלפון סלולרי (רספונסיבי).</li>
                <li>התכנים באתר כתובים בשפה ברורה ופשוטה.</li>
                <li>ניווט פשוט וברור באתר.</li>
                <li>תמיכה בניגודיות צבעים גבוהה.</li>
                <li>אפשרות לניווט באמצעות מקלדת בלבד.</li>
                <li>התאמות לקוראי מסך.</li>
              </ul>

              <h2 className="font-bold text-2xl text-blue-800">דרכי פנייה לבקשות והצעות שיפור בנושא נגישות</h2>
              <p>
                אנו ממשיכים במאמצים לשפר את נגישות האתר כחלק ממחויבותנו לאפשר שימוש בו עבור כלל האוכלוסייה, כולל אנשים עם מוגבלויות. אם נתקלת בבעיית נגישות כלשהי, נשמח לקבל ממך משוב.
              </p>
              <p>
                <strong>רכז נגישות:</strong> רונן עמוס<br />
                <strong>אימייל:</strong> <a href="mailto:ronenamosw@gmail.com" className="text-blue-600 hover:underline">ronenamosw@gmail.com</a><br />
                <strong>טלפון:</strong> <a href="tel:052-123-4567" className="text-blue-600 hover:underline">052-123-4567</a>
              </p>
              <p>
                הצהרת הנגישות עודכנה לאחרונה בתאריך: 13 באוגוסט 2025.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Accessibility;