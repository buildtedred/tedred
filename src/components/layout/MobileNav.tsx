import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

import { navItems } from '../../config/navigation';
import { CTAButton } from '../shared/CTAButton';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: isRTL ? -300 : 300 }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? -300 : 300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={clsx(
              "fixed top-0 bottom-0 w-[280px] bg-zinc-900 z-50",
              "flex flex-col",
              "border-l border-zinc-800",
              isRTL ? "right-0" : "left-0"
            )}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <img 
                src="https://iili.io/2Zsd9OG.png" 
                alt="TedRed Logo" 
                className="h-8 w-auto" 
              />
              <button
                onClick={onClose}
                className="p-2 text-gray-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {navItems.map((item) => (
                <div key={item.name} className="px-4">
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className={clsx(
                          "flex items-center justify-between w-full py-3",
                          "text-gray-300 hover:text-white",
                          isRTL && "flex-row-reverse"
                        )}
                      >
                        <span className={clsx(
                          "text-base font-medium",
                          isRTL && "font-cairo"
                        )}>
                          {t(`nav.${item.name.toLowerCase()}`)}
                        </span>
                        <motion.span
                          animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 px-2 pb-3">
                              {item.dropdownContent?.map((dropdownItem, idx) => {
                                const Icon = dropdownItem.icon;
                                return (
                                  <motion.a
                                    key={idx}
                                    href={dropdownItem.href}
                                    className={clsx(
                                      "flex items-center gap-3 px-4 py-3 rounded-lg",
                                      "text-gray-300 hover:text-white hover:bg-zinc-800",
                                      isRTL && "flex-row-reverse"
                                    )}
                                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                  >
                                    <span className="text-red-500">
                                      <Icon size={20} />
                                    </span>
                                    <div className={clsx(
                                      "flex flex-col",
                                      isRTL && "items-end"
                                    )}>
                                      <span className={clsx(
                                        "font-medium",
                                        isRTL && "font-cairo"
                                      )}>
                                        {t(dropdownItem.titleKey)}
                                      </span>
                                      <span className="text-xs text-gray-400">
                                        {t(dropdownItem.descriptionKey)}
                                      </span>
                                    </div>
                                  </motion.a>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className={clsx(
                        "block py-3 text-base font-medium",
                        "text-gray-300 hover:text-white",
                        isRTL && "font-cairo text-right"
                      )}
                    >
                      {t(`nav.${item.name.toLowerCase()}`)}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-4 border-t border-zinc-800">
              <CTAButton />
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};