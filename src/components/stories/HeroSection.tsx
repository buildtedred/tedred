import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-black">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80"
          alt="Technology background"
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
            TedRed Stories
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Stories of Digital Transformation
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Discover how we're helping businesses navigate the digital landscape and achieve extraordinary results.
          </p>
        </motion.div>
      </div>
    </section>
  );
}; 