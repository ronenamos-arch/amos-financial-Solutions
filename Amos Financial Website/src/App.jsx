import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Blog from '@/pages/Blog';
import BlogPostPage from '@/pages/BlogPostPage';
import Contact from '@/pages/Contact';
import Store from '@/pages/Store';
import ProductDetailPage from '@/pages/ProductDetailPage';
import Success from '@/pages/Success';
import Admin from '@/pages/Admin';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Accessibility from '@/pages/Accessibility';
import CalculatorsPage from '@/pages/CalculatorsPage';
import CalculatorEmbedPage from '@/pages/CalculatorEmbedPage';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header setIsCartOpen={setIsCartOpen} />
        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/calculators/:calculatorId" element={<CalculatorEmbedPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;