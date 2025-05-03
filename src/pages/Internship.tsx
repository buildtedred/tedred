import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { InternshipForm } from '../components/internship/InternshipForm';
import { motion } from 'framer-motion';

export const Internship = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="bg-gradient-animate fixed inset-0 opacity-20 z-0"></div>
      <Header onMobileNavToggle={setIsMobileNavOpen} />
      <main className="flex-grow relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="mb-6 sm:mb-10 md:mb-16 mx-auto text-center max-w-4xl px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-500 mb-3 sm:mb-5 leading-tight tracking-tight">
              TedRed Internship Program
            </h1>
            <div className="h-1 w-24 sm:w-32 bg-red-500 mx-auto mb-4 sm:mb-6 rounded-full"></div>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed px-3 sm:px-6">
              Join our internship program and kickstart your career with hands-on experience 
              in a dynamic, innovative environment.
            </p>
          </motion.div>
          <InternshipForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Internship; 