import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Github, Twitter, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import clsx from 'clsx';
import { RTLIcon } from '../shared/RTLIcon';

export const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const mainLinks = [
    {
      title: 'Solutions',
      items: [
        { name: 'For HR Teams', href: '#' },
        { name: 'For Sales Teams', href: '#' },
        { name: 'For Marketing Teams', href: '#' },
        { name: 'For Startups', href: '#' },
        { name: 'For Enterprise', href: '#' }
      ]
    },
    {
      title: 'Product Types',
      items: [
        { name: 'Analytics Tools', href: '#' },
        { name: 'Productivity Tools', href: '#' },
        { name: 'Sales Tools', href: '#' },
        { name: 'Marketplace', href: '#' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Documentation', href: '#' },
        { name: 'API Reference', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Blog', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: '#', label: 'GitHub' },
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram className="h-5 w-5" />, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-black border-t border-zinc-800/50">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-4 space-y-6">
              <motion.a 
                href="/"
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src="https://iili.io/2Zsd9OG.png" 
                  alt="TedRed Logo" 
                  className="h-8 sm:h-10 w-auto"
                />
              </motion.a>
              <p className="text-sm text-gray-400 max-w-sm">
                Made with passion in the digital realm. Empowering businesses with cutting-edge technology and innovative solutions.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <RTLIcon>
                      {social.icon}
                    </RTLIcon>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {mainLinks.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <motion.a
                            href={item.href}
                            className="group flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            {item.name}
                            <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                          </motion.a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                Contact Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <RTLIcon className="flex-shrink-0 h-4 w-4">
                    <Mail />
                  </RTLIcon>
                  <span className="text-sm">hello@tedred.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/50 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2025 TedRed. All rights reserved.
            </div>
            <div className="flex gap-6">
              {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};