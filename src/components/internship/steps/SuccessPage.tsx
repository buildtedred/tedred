import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface SuccessPageProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    interviewDate: Date | null;
    resumeUrl?: string;
    skills?: string[];
  };
  onReset: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ formData, onReset }) => {
  const { t } = useTranslation();
  const [confettiActive, setConfettiActive] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  // Get window dimensions for confetti
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial calculation
    updateWindowDimensions();

    // Setup listener for window resize
    window.addEventListener('resize', updateWindowDimensions);

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative">
      {confettiActive && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={300}
          colors={['#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#f97316']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-4 sm:py-6 md:py-8"
      >
        <div className="mb-4 sm:mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
            className="bg-green-500 rounded-full p-3 sm:p-4 w-16 h-16 sm:w-20 sm:h-20 mx-auto flex items-center justify-center"
          >
            <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        </div>

        <motion.h2 
          className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Application Submitted!
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-zinc-300 mb-4 sm:mb-6 text-base sm:text-lg px-2">
            Thank you for applying to the TedRed Internship Program, <span className="font-semibold">{formData.firstName}!</span> We've received your application and will be in touch soon.
          </p>

          <div className="bg-zinc-900/50 border border-zinc-800 p-4 sm:p-5 rounded-lg mb-4 sm:mb-6 max-w-lg mx-auto">
            <h3 className="font-medium text-base sm:text-lg mb-3 sm:mb-4 text-left">Application Summary</h3>
            <div className="grid grid-cols-1 gap-y-2 text-left text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                <span className="text-zinc-400">Name:</span> 
                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                <span className="text-zinc-400">Reference Number:</span> 
                <span className="font-medium text-green-500">TED-{Math.floor(Math.random() * 100000)}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                <span className="text-zinc-400">Email:</span> 
                <span className="font-medium break-all">{formData.email}</span>
              </div>
              {formData.interviewDate && (
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Interview:</span> 
                  <span className="font-medium">{format(formData.interviewDate, 'EEEE, MMMM d, yyyy - h:mm a')}</span>
                </div>
              )}
              {formData.resumeUrl && (
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Resume:</span> 
                  <span className="font-medium text-green-500">✓ Uploaded</span>
                </div>
              )}
              {formData.skills && formData.skills.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-400">Skills:</span> 
                  <span className="font-medium">
                    {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''} listed
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-800 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 max-w-lg mx-auto">
            <p className="text-green-300 flex items-start sm:items-center flex-col sm:flex-row">
              <svg className="w-5 h-5 mr-0 sm:mr-2 mb-2 sm:mb-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>A confirmation email has been sent to <span className="font-semibold ml-1 break-all">{formData.email}</span></span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.a 
              href="/" 
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition-colors duration-200 text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Return to Homepage
            </motion.a>
            <motion.button
              onClick={onReset}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Submit Another Application
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}; 