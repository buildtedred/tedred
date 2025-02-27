import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { RTLIcon } from './RTLIcon';

interface CTAButtonProps {
  className?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ className }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      // Smooth scroll to contact section
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Add highlight effect
      const formElement = contactSection.querySelector('form');
      if (formElement) {
        formElement.classList.add('highlight-form');
        // Remove the class after animation completes
        setTimeout(() => {
          formElement.classList.remove('highlight-form');
        }, 2000); // Match this with the CSS animation duration
      }
    }
  };

  return (
    <motion.a
      href="#contact"
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full",
        "bg-gradient-to-r from-red-600 via-red-500 to-red-400",
        "text-white font-semibold text-sm sm:text-base",
        "hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300",
        "w-full sm:w-auto justify-center sm:justify-start",
        isRTL ? "flex-row-reverse" : "flex-row",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={clsx(
        "font-bold tracking-wide",
        isRTL && "font-cairo text-[15px]"
      )}>
        {t('hero.cta')}
      </span>
      <RTLIcon>
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </RTLIcon>
    </motion.a>
  );
};