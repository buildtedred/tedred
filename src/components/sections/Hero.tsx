import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Clock, Sparkles, ArrowRight, Zap, Users, Globe } from 'lucide-react';
import clsx from 'clsx';
import { RTLIcon } from '../shared/RTLIcon';
import { CTAButton } from '../shared/CTAButton';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 }
};

export const Hero: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      text: "AI-Powered Solutions",
      color: "text-purple-500"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Lightning Fast Development",
      color: "text-yellow-500"
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "Expert Team",
      color: "text-blue-500"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      text: "Global Reach",
      color: "text-green-500"
    }
  ];

  const stats = [
    {
      value: "500+",
      label: "Projects Delivered",
      color: "from-red-500 to-red-400"
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      color: "from-purple-500 to-purple-400"
    },
    {
      value: "24/7",
      label: "Support Available",
      color: "from-blue-500 to-blue-400"
    }
  ];

  return (
    <section className="relative min-h-[100svh] flex items-center py-16 xxs:py-20 sm:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0">
          {/* Gradient Animation */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-gradient-x" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          </div>
          
          {/* Radial Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),rgba(0,0,0,0.8))]" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjwvZz48L3N2Zz4=')] opacity-20" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className={clsx(
              "inline-flex items-center gap-2",
              "px-2 xxs:px-3 sm:px-4 py-1 xxs:py-1.5 sm:py-2 rounded-full",
              "bg-white/5 backdrop-blur-sm border border-white/10",
              "mb-3 xxs:mb-4 sm:mb-6",
              isRTL && "flex-row-reverse"
            )}
          >
            <span className="relative flex h-1.5 xxs:h-2 sm:h-3 w-1.5 xxs:w-2 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-red-500" />
            </span>
            <span className={clsx(
              "text-xxs xxs:text-xs sm:text-sm font-medium",
              "bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent",
              isRTL && "font-cairo"
            )}>
              Innovating the Future of Technology
            </span>
          </motion.div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Headline */}
            <div className="space-y-2 sm:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={clsx(
                  "text-3xl xxs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
                  "font-bold leading-tight",
                  isRTL && "font-cairo"
                )}
              >
                Transforming Ideas into
                <div className="inline-block h-[1.2em] overflow-hidden ml-2">
                  <AnimatePresence mode='wait'>
                    <motion.span
                      key={textIndex}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={clsx(
                        "inline-block text-transparent bg-clip-text",
                        "bg-gradient-to-r from-red-500 via-red-400 to-red-500",
                        isRTL && "font-cairo"
                      )}
                    >
                      {[
                        "Digital Reality",
                        "Smart Solutions",
                        "Future Tech",
                        "Innovation"
                      ][textIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={clsx(
                  "text-lg sm:text-xl text-gray-400 max-w-2xl",
                  isRTL && "font-cairo"
                )}
              >
                Empowering businesses with cutting-edge technology and innovative solutions to dominate the digital landscape.
              </motion.p>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={clsx(
                    "flex items-center gap-2 p-2 sm:p-3",
                    "rounded-lg bg-white/5 backdrop-blur-sm",
                    "border border-white/10",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <RTLIcon className={feature.color}>
                    {feature.icon}
                  </RTLIcon>
                  <span className="text-xs sm:text-sm text-gray-300">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats and CTA */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-4 sm:gap-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <span className={clsx(
                      "block text-2xl sm:text-3xl font-bold",
                      `bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`
                    )}>
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <CTAButton className="sm:ml-auto" />
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              {[
                { 
                  icon: <Clock />, 
                  text: "24/7 Support" 
                },
                { 
                  icon: <Globe />, 
                  text: "Global Solutions" 
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-center gap-2",
                    "px-3 py-1.5 rounded-full",
                    "bg-white/5 backdrop-blur-sm border border-white/10",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <RTLIcon className="text-red-500 h-4 w-4">
                    {item.icon}
                  </RTLIcon>
                  <span className="text-xs sm:text-sm text-gray-400">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};