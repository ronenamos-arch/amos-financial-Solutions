import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Calculator, Zap, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const Header = ({ setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'בית', path: '/' },
    { name: 'אודות', path: '/about' },
    { name: 'שירותים', path: '/services' },
    { name: 'חנות', path: '/store' },
    { name: 'בלוג', path: '/blog' },
    { name: 'מחשבונים', path: '/calculators' },
    { name: 'יצירת קשר', path: '/contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="relative">
              <Calculator className="w-8 h-8 text-blue-800" />
              <Zap className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-800">עמוס פתרונות פיננסיים</div>
              <div className="text-sm text-gray-600">רואה חשבון טכנולוגי</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition-colors duration-300 ${
                  location.pathname === item.path || 
                  (item.path === '/store' && location.pathname.startsWith('/product')) ||
                  (item.path === '/calculators' && location.pathname.startsWith('/calculators/'))
                    ? 'text-blue-800'
                    : 'text-gray-700 hover:text-blue-800'
                }`}
              >
                {item.name}
                {(location.pathname === item.path || 
                  (item.path === '/store' && location.pathname.startsWith('/product')) ||
                  (item.path === '/calculators' && location.pathname.startsWith('/calculators/'))) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-800 to-green-500"
                  />
                )}
              </Link>
            ))}
            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-700 hover:text-blue-800 transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsCartOpen(true)} className="relative text-gray-700 hover:text-blue-800 transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-blue-800 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-right font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-800 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-800 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-3">
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary w-full text-center text-sm"
              >
                ייעוץ חינם
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;