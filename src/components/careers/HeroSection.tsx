import { motion } from 'framer-motion';

export const HeroSection = () => {
  return (
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
            Join Our Team
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Build the Future with Us
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Join a team of passionate individuals dedicated to transforming the digital landscape. We're always looking for talented people to help us push the boundaries of what's possible.
          </p>
        </motion.div>
      </div>
    </section>
  );
}; 