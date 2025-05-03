import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Users, BarChart as ChartBar, Rocket, Code, Building2, Briefcase, Laptop } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { RTLIcon } from '../shared/RTLIcon';

export const Clients: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for stats
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const stats = [
    {
      title: "Startup Growth Rate",
      percentage: "180%",
      gradient: "from-red-600/20 to-red-800/20",
      textColor: "text-red-500",
      icon: <Rocket className="h-6 w-6" />,
      description: "Average growth for startup clients"
    },
    {
      title: "Development Speed",
      percentage: "65%",
      gradient: "from-purple-600/20 to-purple-800/20",
      textColor: "text-purple-500",
      icon: <Code className="h-6 w-6" />,
      description: "Faster time to market"
    },
    {
      title: "Client Retention",
      percentage: "94%",
      gradient: "from-blue-600/20 to-blue-800/20",
      textColor: "text-blue-500",
      icon: <Users className="h-6 w-6" />,
      description: "Long-term partnerships"
    }
  ];

  const trustedBy = [
    { 
      name: "Tech Startups", 
      industry: "SaaS & Technology",
      description: "Helping innovative startups scale",
      icon: <Rocket />
    },
    { 
      name: "Mid-Size Companies", 
      industry: "Various Sectors",
      description: "Digital transformation partners",
      icon: <Building2 />
    },
    { 
      name: "Service Providers", 
      industry: "Professional Services",
      description: "Enhancing service delivery",
      icon: <Briefcase />
    },
    { 
      name: "Digital Agencies", 
      industry: "Creative & Marketing",
      description: "Powering creative solutions",
      icon: <Laptop />
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-zinc-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-red-600/10 text-red-500 font-semibold text-sm mb-4"
            whileHover={{ scale: 1.05 }}
          >
            Our Partners in Innovation
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Empowering Growth-Focused Businesses
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Trusted technology partner for startups and mid-sized companies driving digital innovation
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div style={{ y }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={clsx(
                "relative rounded-2xl bg-gradient-to-br backdrop-blur-sm",
                stat.gradient,
                "p-6 sm:p-8"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-lg sm:text-xl text-white font-medium">
                  {stat.title}
                </h3>
                <RTLIcon className={stat.textColor}>
                  {stat.icon}
                </RTLIcon>
              </div>
              <div className="flex items-center gap-3">
                <span className={clsx(
                  "text-4xl sm:text-5xl lg:text-6xl font-bold",
                  stat.textColor
                )}>
                  {stat.percentage}
                </span>
                <RTLIcon className={clsx(
                  "h-6 w-6 sm:h-8 sm:w-8",
                  stat.textColor
                )}>
                  <ChartBar />
                </RTLIcon>
              </div>
              <p className="text-sm text-gray-300 mt-4">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Partner Categories */}
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl font-semibold mb-8"
          >
            Partnering with Forward-Thinking Businesses
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustedBy.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4 p-6 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10">
                  <RTLIcon className="text-red-500 w-6 h-6">
                    {partner.icon}
                  </RTLIcon>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-lg mb-1">{partner.name}</h4>
                  <p className="text-sm text-gray-400 mb-2">{partner.industry}</p>
                  <p className="text-xs text-gray-500">{partner.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 text-sm text-gray-400">
            <Target className="h-4 w-4 text-red-500" />
            <span>Driving Success for 100+ Growing Businesses</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};