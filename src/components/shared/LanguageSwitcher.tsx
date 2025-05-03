import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import clsx from 'clsx';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', font: 'font-sans' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', font: 'font-cairo' }
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <Menu.Button 
            className={clsx(
              "inline-flex items-center justify-center",
              "px-3 sm:px-4 py-2",
              "text-xs sm:text-sm font-medium",
              "rounded-lg sm:rounded-xl",
              "transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500",
              open
                ? "bg-zinc-800 text-white"
                : "text-gray-300 hover:text-white hover:bg-zinc-800/70"
            )}
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className={clsx(
              "hidden xxs:inline",
              i18n.language === 'ar' ? 'font-cairo' : ''
            )}>
              {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
            </span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items 
              className={clsx(
                "absolute z-50 right-0 mt-2",
                "w-40 sm:w-48",
                "origin-top-right",
                "rounded-xl",
                "bg-zinc-900 border border-zinc-800",
                "shadow-lg shadow-black/50",
                "backdrop-blur-sm",
                "focus:outline-none",
                "divide-y divide-zinc-800"
              )}
            >
              <div className="py-1">
                {languages.map((language) => (
                  <Menu.Item key={language.code}>
                    {({ active }) => (
                      <button
                        onClick={() => changeLanguage(language.code)}
                        className={clsx(
                          "group flex w-full items-center",
                          "px-3 sm:px-4 py-2.5",
                          "text-xs sm:text-sm",
                          "transition-colors duration-150",
                          active ? "bg-zinc-800 text-white" : "text-gray-300",
                          i18n.language === language.code ? "bg-zinc-800/50" : "",
                          language.code === "ar" ? "font-cairo" : ""
                        )}
                      >
                        <span className="mr-2 text-base">{language.flag}</span>
                        <span className="flex-grow text-left">{language.name}</span>
                        {i18n.language === language.code && (
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};