import React from 'react';
import { motion } from 'framer-motion';
import { Eye, PenTool, Cpu, BarChart } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { RTLIcon } from '../shared/RTLIcon';

export const Process: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const steps = [
    {
      icon: <Eye className="h-8 sm:h-12 w-8 sm:w-12 text-red-500" />,
      step: "01",
      title: "Discovery",
      description: "We analyze your current processes and identify opportunities"
    },
    {
      icon: <PenTool className="h-8 sm:h-12 w-8 sm:w-12 text-red-500" />,
      step: "02",
      title: "Strategy",
      description: "We develop a customized roadmap for your success"
    },
    {
      icon: <Cpu className="h-8 sm:h-12 w-8 sm:w-12 text-red-500" />,
      step: "03",
      title: "Implementation",
      description: "We execute the solution with precision"
    },
    {
      icon: <BarChart className="h-8 sm:h-12 w-8 sm:w-12 text-red-500" />,
      step: "04",
      title: "Optimization",
      description: "We continuously monitor and improve performance"
    }
  ];

  return (
    <section id="process" className="py-16 sm:py-24 md:py-32 bg-zinc-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-red-600/10 text-red-500 font-semibold text-sm mb-4 sm:mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Our Process
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            How We Work
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Our proven methodology ensures successful digital transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((process, index) => (
            <motion.div
              key={index}
              className={clsx(
                "relative p-6 sm:p-8 rounded-2xl",
                "bg-zinc-800/50 border border-zinc-700/50",
                "hover:border-red-500/50 transition-all duration-300",
                isRTL && 'md:grid-flow-row-reverse'
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center text-base sm:text-lg font-bold">
                {process.step}
              </div>
              <motion.div
                className="mb-4 sm:mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <RTLIcon className="text-red-500">
                  {process.icon}
                </RTLIcon>
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{process.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">{process.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};