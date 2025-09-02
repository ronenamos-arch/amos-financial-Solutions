import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Zap, Mail, Phone, MapPin, Linkedin, Facebook, Twitter } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="relative">
                <Calculator className="w-8 h-8 text-blue-400" />
                <Zap className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
              </div>
              <div className="text-right">
                <span className="text-lg font-bold">עמוס פתרונות פיננסיים</span>
                <p className="text-sm text-gray-400">שירותי חשבונאות חכמה בשילוב - AI, אוטומציה ו-Power BI לעצמאיים ועסקים קטנים</p>
              </div>
            </div>
            <p className="text-gray-400 text-right">שירותי חשבונאות חכמה עם AI, אוטומציה ו-Power BI לעצמאיים ועסקים קטנים</p>
          </div>

          {/* Quick Links */}
          <div className="text-right">
            <span className="text-lg font-semibold mb-4 block">קישורים מהירים</span>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">בית</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">אודות</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">שירותים</Link></li>
              <li><Link to="/store" className="text-gray-400 hover:text-white transition-colors">חנות</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">בלוג</Link></li>
              <li><Link to="/calculators" className="text-gray-400 hover:text-white transition-colors">מחשבונים</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">יצירת קשר</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-right">
            <span className="text-lg font-semibold mb-4 block">מידע ומשפטי</span>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">מדיניות פרטיות</Link></li>
              <li><Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">הצהרת נגישות</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">אזור אישי</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-right">
            <span className="text-lg font-semibold mb-4 block">פרטי התקשרות</span>
            <div className="space-y-3">
              <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                <span className="text-gray-400">ronenamosw@gmail.com</span>
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                <span className="text-gray-400">050-5500344</span>
                <Phone className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                <span className="text-gray-400">צבי 8, רמת גן</span>
                <MapPin className="w-4 h-4 text-red-400" />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-end space-x-4 rtl:space-x-reverse mt-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 עמוס פתרונות פיננסיים. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;