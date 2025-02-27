import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

import { NavItem } from './NavItem';
import { MobileNav } from './MobileNav';
import { CTAButton } from '../shared/CTAButton';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';
import { navItems } from '../../config/navigation';

interface HeaderProps {
  onMobileNavToggle: (isOpen: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileNavToggle }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = (open: boolean) => {
    setIsMenuOpen(open);
    onMobileNavToggle(open);
  };

  return (
    <motion.header
      style={{ backgroundColor: headerBg }}
      className={clsx(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? 'py-2' : 'py-4'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between">
          <motion.a 
            href="/"
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img 
              src="https://iili.io/2Zsd9OG.png" 
              alt="TedRed Logo" 
              className="h-8 sm:h-10 w-auto"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className={clsx(
            "hidden lg:flex items-center gap-6 sm:gap-8",
            isRTL ? 'space-x-reverse' : 'space-x-8'
          )}>
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
            <CTAButton />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => handleMenuToggle(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <MobileNav isOpen={isMenuOpen} onClose={() => handleMenuToggle(false)} />
      </div>
    </motion.header>
  );
};