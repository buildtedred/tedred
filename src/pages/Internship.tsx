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
            <div className="mt-6 sm:mt-8">
              <a 
                href="#application-form" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg transform transition-transform hover:scale-105"
              >
                Apply Now
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            className="mb-12 sm:mb-16 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 sm:p-8 shadow-xl">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-500">
                  Why Choose TedRed?
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
                <div className="bg-zinc-800/50 p-4 sm:p-6 rounded-lg border border-zinc-700 h-full flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="bg-red-500/20 p-2 rounded-lg mr-3 flex-shrink-0">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Competitive Stipend</h3>
                  </div>
                  <p className="text-zinc-300 text-sm sm:text-base flex-grow">
                    Receive a monthly stipend based on your skills and performance. We believe in fairly compensating your contribution from day one.
                  </p>
                </div>
                
                <div className="bg-zinc-800/50 p-4 sm:p-6 rounded-lg border border-zinc-700 h-full flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="bg-red-500/20 p-2 rounded-lg mr-3 flex-shrink-0">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Growth Opportunities</h3>
                  </div>
                  <p className="text-zinc-300 text-sm sm:text-base flex-grow">
                    30% of our full-time employees started as interns! Demonstrate your potential and transition into a permanent role with competitive salary and benefits.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
                <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 h-full flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="bg-red-500/20 p-1.5 rounded-md mr-2 flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-white">Mentorship</h3>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm flex-grow">
                    Work alongside industry experts who will guide your professional development.
                  </p>
                </div>
                
                <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 h-full flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="bg-red-500/20 p-1.5 rounded-md mr-2 flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-white">Real Projects</h3>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm flex-grow">
                    Work on actual client projects that will make a meaningful impact on real businesses.
                  </p>
                </div>
                
                <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 h-full flex flex-col">
                  <div className="flex items-center mb-2">
                    <div className="bg-red-500/20 p-1.5 rounded-md mr-2 flex-shrink-0">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-medium text-white">Skill Development</h3>
                  </div>
                  <p className="text-zinc-300 text-xs sm:text-sm flex-grow">
                    Access to training workshops, courses, and resources to enhance your technical skills.
                  </p>
                </div>
              </div>
              
              <div className="bg-zinc-800/30 p-4 sm:p-6 rounded-lg border border-zinc-700 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Additional Perks</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center h-8">
                    <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-300">Flexible hours</span>
                  </div>
                  <div className="flex items-center h-8">
                    <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-300">Remote work options</span>
                  </div>
                  <div className="flex items-center h-8">
                    <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-300">Weekly team lunches</span>
                  </div>
                  <div className="flex items-center h-8">
                    <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-300">Team building events</span>
                  </div>
                  <div className="flex items-center h-8">
                    <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-300">Internet allowance</span>
                  </div>
                  <div className="flex items-center h-8">
                    <svg className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-zinc-300">Certificate of completion</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-zinc-300 text-sm mb-4">
                  <span className="text-red-400 font-semibold">Program Duration:</span> 3-6 months (with opportunity for extension)
                </p>
                <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm animate-pulse">
                  Applications always open — Apply now!
                </div>
              </div>
            </div>
          </motion.div>
          
          <div id="application-form" className="mb-12 sm:mb-16 mx-auto">
            <InternshipForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Internship; 