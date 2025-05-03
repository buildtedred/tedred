import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Process } from './components/sections/Process';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Challenge } from './components/sections/Challenge';
import { Clients } from './components/sections/Clients';
import { Portfolio } from './components/sections/Portfolio';
import { About } from './pages/About';
import { Careers } from './pages/Careers';
import { Stories } from './pages/Stories';
import { Home } from './pages/Home';
import { Internship } from './pages/Internship';

function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Handle initial loading and mounting
  useEffect(() => {
    document.documentElement.style.backgroundColor = '#000000';
    document.body.style.backgroundColor = '#000000';
    setMounted(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Handle language and font changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('font-cairo', isRTL);
    
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover');
    }
  }, [isRTL, i18n.language]);

  // Handle body scroll lock when mobile nav is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileNavOpen]);

  // Don't render anything until mounted
  if (!mounted) {
    return <div className="fixed inset-0 bg-black" />;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <img 
          src="https://iili.io/2Zsd9OG.png" 
          alt="TedRed Logo" 
          className="h-16 w-auto animate-pulse"
        />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About />;
      case 'careers':
        return <Careers />;
      case 'stories':
        return <Stories />;
      default:
        return (
          <main>
            <Hero />
            <Clients />
            <Challenge />
            <Portfolio />
            <Services />
            <Process />
            <Testimonials />
            <Contact />
          </main>
        );
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/internship" element={<Internship />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;