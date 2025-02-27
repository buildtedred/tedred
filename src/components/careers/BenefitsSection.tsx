import { motion } from 'framer-motion';
import { MapPin, DollarSign, GraduationCap, Heart, Coffee, Globe } from 'lucide-react';
import { RTLIcon } from '../shared/RTLIcon';

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: <MapPin />,
      title: "Remote-First",
      description: "Work from anywhere in the world",
      color: "text-blue-500"
    },
    {
      icon: <DollarSign />,
      title: "Competitive Pay",
      description: "Above-market compensation",
      color: "text-green-500"
    },
    {
      icon: <GraduationCap />,
      title: "Learning & Growth",
      description: "Continuous development opportunities",
      color: "text-purple-500"
    },
    {
      icon: <Heart />,
      title: "Health & Wellness",
      description: "Comprehensive health coverage",
      color: "text-red-500"
    },
    {
      icon: <Coffee />,
      title: "Work-Life Balance",
      description: "Flexible hours and time off",
      color: "text-yellow-500"
    },
    {
      icon: <Globe />,
      title: "Global Team",
      description: "Diverse and inclusive culture",
      color: "text-indigo-500"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why Join Us?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer more than just a job. Join us and be part of something special.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-red-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <RTLIcon className={`mb-6 ${benefit.color}`}>
                {benefit.icon}
              </RTLIcon>
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 