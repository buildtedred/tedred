import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export const Testimonials: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechStart",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      content: "TedRed transformed our digital presence completely. The team's expertise in both design and development is unmatched. Our conversion rates have increased by 150% since launch.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Director at GrowthCo",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      content: "Working with TedRed was a game-changer for our business. Their strategic approach to digital marketing helped us reach new markets we never thought possible.",
      rating: 5,
      featured: true
    },
    {
      name: "Emma Davis",
      role: "Founder at InnovateLab",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      content: "The attention to detail and level of professionalism from the TedRed team is outstanding. They don't just deliver projects, they deliver results.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 md:py-32 bg-zinc-900">
      <div className="container">
        {/* Section Header */}
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
            Testimonials
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={clsx(
                "relative p-6 sm:p-8 rounded-2xl",
                testimonial.featured 
                  ? 'bg-gradient-to-br from-red-600/10 to-red-900/10 border border-red-500/20' 
                  : 'bg-zinc-800/50 border border-zinc-700/50',
                isRTL && 'md:grid-flow-row-reverse'
              )}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-red-500/20">
                <svg
                  width="35"
                  height="28"
                  viewBox="0 0 45 36"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-[45px] sm:h-[36px]"
                >
                  <path d="M13.244 0L21.244 13.5H13.244V36H0V13.5L8 0H13.244ZM37.244 0L45.244 13.5H37.244V36H24V13.5L32 0H37.244Z" />
                </svg>
              </div>

              {/* Content */}
              <div className="mb-6 sm:mb-8">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i}
                    className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              {/* Author */}
              <div className={clsx(
                "flex items-center gap-3 sm:gap-4",
                isRTL && 'flex-row-reverse'
              )}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm sm:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {testimonial.featured && (
                <div className="absolute -top-3 -right-3">
                  <motion.div
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Featured
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};