import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface DropdownItem {
  titleKey: string;
  descriptionKey: string;
  href: string;
  icon: LucideIcon;
}

interface NavItemProps {
  item: {
    name: string;
    href: string;
    hasDropdown?: boolean;
    dropdownContent?: DropdownItem[];
  };
}

export const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href={item.href}
        className={clsx(
          "flex items-center gap-1",
          "text-sm font-medium text-gray-300 hover:text-white",
          "transition-colors relative group",
          isRTL && "flex-row-reverse"
        )}
        whileHover={{ scale: 1.05 }}
      >
        <span className={clsx(
          isRTL && "font-cairo"
        )}>
          {t(`nav.${item.name}`)}
        </span>
        {item.hasDropdown && (
          <motion.span
            className={clsx(
              "inline-flex items-center",
              "text-gray-400 transition-transform duration-200",
              isRTL ? "mr-1" : "ml-1"
            )}
            animate={{ rotate: isHovered ? 180 : 0 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        )}
      </motion.a>
      
      {/* Dropdown Menu */}
      {item.hasDropdown && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={clsx(
            "absolute top-full mt-2 w-48",
            "bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl",
            "py-2",
            isRTL ? "right-0 text-right" : "left-0 text-left"
          )}
        >
          {item.dropdownContent?.map((dropdownItem, index) => {
            const Icon = dropdownItem.icon;
            return (
              <motion.a
                key={index}
                href={dropdownItem.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-2.5",
                  "text-gray-300 hover:text-white hover:bg-zinc-800/50",
                  "transition-colors text-sm",
                  isRTL && "flex-row-reverse"
                )}
                whileHover={{ x: isRTL ? -4 : 4 }}
              >
                <span className={clsx(
                  "flex-shrink-0",
                  "text-red-500"
                )}>
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
        </motion.div>
      )}
    </div>
  );
};