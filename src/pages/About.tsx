import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Award, Globe2, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RTLIcon } from '../components/shared/RTLIcon';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const About: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const values = [
    {
      icon: <Users />,
      title: "Client-Centric",
      description: "We put our clients first, always striving to exceed expectations and deliver exceptional value."
    },
    {
      icon: <Target />,
      title: "Innovation",
      description: "We embrace cutting-edge technology and creative solutions to solve complex challenges."
    },
    {
      icon: <Heart />,
      title: "Passion",
      description: "We're passionate about technology and its potential to transform businesses."
    },
    {
      icon: <Award />,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code to customer service."
    },
    {
      icon: <Globe2 />,
      title: "Global Mindset",
      description: "We think globally while acting locally, bringing worldwide expertise to every project."
    },
    {
      icon: <Rocket />,
      title: "Growth",
      description: "We're committed to continuous learning and helping our clients scale their success."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center bg-black">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
          </div>

          <div className="container relative z-10 py-20 sm:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <motion.span
                className="inline-block px-4 py-2 rounded-full bg-red-600/10 text-red-500 font-semibold text-sm mb-6"
                whileHover={{ scale: 1.05 }}
              >
                About Us
              </motion.span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Transforming Ideas into Digital Reality
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl">
                We're a team of passionate technologists, designers, and innovators dedicated to helping businesses thrive in the digital age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-zinc-900">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-400 mb-8">
                  At TedRed, we're on a mission to democratize digital transformation. We believe that every business, regardless of size, deserves access to cutting-edge technology and expert guidance to thrive in the digital age.
                </p>
                <div className="space-y-4">
                  {[
                    "Empowering businesses through technology",
                    "Creating sustainable digital solutions",
                    "Fostering innovation and growth",
                    "Building lasting partnerships"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                    alt="Team meeting"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-black">
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
                Our values shape everything we do, from how we develop solutions to how we interact with our clients and each other.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-red-500/30 transition-all duration-300"
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
      </main>
      <Footer />
    </div>
  );
};