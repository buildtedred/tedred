import { motion } from 'framer-motion';
import { Rocket, Users, Target, Heart } from 'lucide-react';
import { RTLIcon } from '../shared/RTLIcon';

export const ValuesSection = () => {
  const values = [
    {
      icon: <Rocket />,
      title: "Innovation",
      description: "We push boundaries and embrace new ideas"
    },
    {
      icon: <Users />,
      title: "Collaboration",
      description: "We work together to achieve greatness"
    },
    {
      icon: <Target />,
      title: "Excellence",
      description: "We strive for the highest quality in everything"
    },
    {
      icon: <Heart />,
      title: "Passion",
      description: "We love what we do and it shows"
    }
  ];

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Values</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            These core values guide everything we do and shape our unique culture.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700 hover:border-red-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <RTLIcon className="text-red-500 mb-6">
                {value.icon}
              </RTLIcon>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 