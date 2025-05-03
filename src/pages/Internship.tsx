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
      <main className="flex-grow relative z-10 px-4 sm:px-8 lg:px-12 py-10 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            className="mb-10 sm:mb-16 mx-auto text-center sm:text-left max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-500 mb-6 leading-tight">
              TedRed Internship Program
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto sm:mx-0 leading-relaxed">
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