import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Clock, DollarSign, Users, Target, 
  Lightbulb, Rocket, Shield, Settings,
  Brain, Code, LineChart, Workflow
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { RTLIcon } from '../shared/RTLIcon';

export const Challenge: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 1, 1]);

  const challenges = [
    {
      icon: <Lightbulb />,
      title: "Vision to Reality",
      description: "Turning your innovative ideas into successful digital products",
      solutions: [
        "Expert consultation on technology stack",
        "Rapid prototyping and MVP development",
        "Scalable architecture planning"
      ],
      color: "text-yellow-500"
    },
    {
      icon: <DollarSign />,
      title: "Resource Optimization",
      description: "Maximizing ROI while minimizing development costs",
      solutions: [
        "Cost-effective development strategies",
        "Resource allocation optimization",
        "Budget-friendly technology solutions"
      ],
      color: "text-green-500"
    },
    {
      icon: <Clock />,
      title: "Time to Market",
      description: "Accelerating development without compromising quality",
      solutions: [
        "Agile development methodology",
        "Parallel development tracks",
        "Automated testing & deployment"
      ],
      color: "text-blue-500"
    },
    {
      icon: <Target />,
      title: "Market Fit",
      description: "Ensuring your solution meets market demands",
      solutions: [
        "Market research & validation",
        "User feedback integration",
        "Competitive analysis"
      ],
      color: "text-purple-500"
    }
  ];

  const stats = [
    {
      value: "60%",
      label: "Faster Time to Market",
      icon: <Rocket className="h-5 w-5" />,
      color: "text-red-500"
    },
    {
      value: "40%",
      label: "Cost Reduction",
      icon: <LineChart className="h-5 w-5" />,
      color: "text-green-500"
    },
    {
      value: "95%",
      label: "Project Success Rate",
      icon: <Target className="h-5 w-5" />,
      color: "text-blue-500"
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full bg-red-600/10 text-red-500 font-semibold text-sm mb-6"
              whileHover={{ scale: 1.05 }}
            >
              Common Challenges
            </motion.span>
            <h2 className="text-4xl font-bold mb-6">
              Building Digital Solutions
            </h2>
            <p className="text-gray-400 mb-8">
              We understand the challenges startups and companies face when building digital solutions. Our expertise helps you overcome these hurdles and accelerate your path to success.
            </p>

            {/* Challenges Grid */}
            <div className="grid gap-6">
              {challenges.map((item, index) => (
                <motion.div
                  key={index}
                  className={clsx(
                    "bg-zinc-900/50 rounded-xl p-6",
                    "hover:bg-zinc-800/50 transition-all duration-300",
                    "border border-zinc-800/50 hover:border-red-500/20"
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <div className={clsx(
                    "flex items-start gap-4",
                    isRTL && "flex-row-reverse text-right"
                  )}>
                    <RTLIcon className={clsx("flex-shrink-0", item.color)}>
                      {item.icon}
                    </RTLIcon>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                      <ul className="space-y-2">
                        {item.solutions.map((solution, idx) => (
                          <li key={idx} className={clsx(
                            "flex items-center gap-2 text-sm text-gray-300",
                            isRTL && "flex-row-reverse"
                          )}>
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Visual Section */}
          <motion.div style={{ y, opacity }} className="relative lg:h-[600px]">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                  alt="Team Collaboration"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="absolute inset-0 z-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={clsx(
                    "absolute bg-zinc-900/90 backdrop-blur-sm p-4 rounded-lg",
                    "border border-zinc-800 hover:border-red-500/20",
                    "transition-all duration-300",
                    index === 0 && "top-[10%] left-[-10%]",
                    index === 1 && "top-[40%] right-[-10%]",
                    index === 2 && "bottom-[10%] left-[10%]"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={clsx(
                    "flex items-center gap-3",
                    isRTL && "flex-row-reverse"
                  )}>
                    <RTLIcon className={stat.color}>
                      {stat.icon}
                    </RTLIcon>
                    <div className={clsx(isRTL && "text-right")}>
                      <div className={clsx("text-xl font-bold", stat.color)}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};