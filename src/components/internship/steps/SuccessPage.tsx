import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SuccessPageProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    interviewDate: Date | null;
    resumeUrl?: string;
    skills?: string[];
    department?: string;
    ikigaiResults?: {
      departmentRecommendations?: Array<{
        department: string;
        score: number;
        key: string;
      }>;
      teamSuggestions?: string[];
      softSkills?: string[];
      languages?: Array<{
        language: string;
        level: string;
      }>;
    };
    education?: Array<{
      institution: string;
      degree: string;
      fieldOfStudy: string;
      graduationYear: string;
    }>;
    experience?: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    interests?: string[];
    coverLetter?: string;
  };
  onReset: () => void;
}

export const SuccessPage: React.FC<SuccessPageProps> = ({ formData, onReset }) => {
  const { t } = useTranslation();
  const [confettiActive, setConfettiActive] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

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

  // Function to generate PDF
  const generatePDF = () => {
    setPdfGenerating(true);
    
    setTimeout(() => {
      try {
        // Create new PDF document
        const doc = new jsPDF();
        
        // Add TedRed logo/header
        doc.setFillColor(237, 68, 68); // Red color
        doc.rect(0, 0, 210, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text('TedRed Internship Application', 105, 12, { align: 'center' });
        
        // Add applicant info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text('Application Summary', 14, 30);
        
        // Reference number
        const refNumber = `TED-${Math.floor(Math.random() * 100000)}`;
        
        // Add basic information table
        autoTable(doc, {
          startY: 35,
          head: [['Basic Information', '']],
          body: [
            ['Full Name', `${formData.firstName} ${formData.lastName}`],
            ['Email', formData.email],
            ['Reference Number', refNumber],
            ['Selected Department', getDepartmentName(formData.department)],
            ['Interview Date', formData.interviewDate ? format(formData.interviewDate, 'EEEE, MMMM d, yyyy - h:mm a') : 'Not scheduled'],
            ['Resume', formData.resumeUrl ? 'Uploaded' : 'Not provided']
          ],
          theme: 'striped',
          headStyles: { fillColor: [237, 68, 68] }
        });
        
        // Add Ikigai assessment results if available
        if (formData.ikigaiResults?.departmentRecommendations?.length) {
          const lastY = (doc as any).lastAutoTable.finalY;
          
          autoTable(doc, {
            startY: lastY + 10,
            head: [['Ikigai Assessment Results', '']],
            body: [
              ['Top Recommended Department', formData.ikigaiResults.departmentRecommendations[0].department],
              ['Recommended Teams', formData.ikigaiResults.teamSuggestions?.join(', ') || 'None'],
              ['Key Strengths', formData.ikigaiResults.softSkills?.join(', ') || 'None'],
              ['Languages', formatLanguages(formData.ikigaiResults.languages) || 'None']
            ],
            theme: 'striped',
            headStyles: { fillColor: [237, 68, 68] }
          });
        }
        
        // Add education and experience
        if (formData.education?.length) {
          const lastY = (doc as any).lastAutoTable.finalY;
          
          autoTable(doc, {
            startY: lastY + 10,
            head: [['Education', '']],
            body: formData.education.map(edu => [
              `${edu.degree} in ${edu.fieldOfStudy}`,
              `${edu.institution}, ${edu.graduationYear}`
            ]),
            theme: 'striped',
            headStyles: { fillColor: [237, 68, 68] }
          });
        }
        
        if (formData.experience?.length) {
          const lastY = (doc as any).lastAutoTable.finalY;
          
          autoTable(doc, {
            startY: lastY + 10,
            head: [['Experience', '']],
            body: formData.experience.map(exp => [
              `${exp.position} at ${exp.company}`,
              `${exp.startDate} - ${exp.endDate}`
            ]),
            theme: 'striped',
            headStyles: { fillColor: [237, 68, 68] }
          });
        }
        
        // Add interests and skills
        if (formData.interests?.length || formData.skills?.length) {
          const lastY = (doc as any).lastAutoTable.finalY;
          
          const skillsData = [];
          if (formData.interests?.length) {
            skillsData.push(['Areas of Interest', formData.interests.join(', ')]);
          }
          
          if (formData.skills?.length) {
            skillsData.push(['Skills', formData.skills.join(', ')]);
          }
          
          autoTable(doc, {
            startY: lastY + 10,
            head: [['Skills & Interests', '']],
            body: skillsData,
            theme: 'striped',
            headStyles: { fillColor: [237, 68, 68] }
          });
        }
        
        // Add cover letter if provided
        if (formData.coverLetter) {
          const lastY = (doc as any).lastAutoTable.finalY;
          
          autoTable(doc, {
            startY: lastY + 10,
            head: [['Cover Letter', '']],
            body: [[formData.coverLetter, '']],
            theme: 'striped',
            headStyles: { fillColor: [237, 68, 68] }
          });
        }
        
        // Add footer with instructions
        const lastY = (doc as any).lastAutoTable.finalY;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Please email this PDF to hr@tedred.com to complete your application process.', 105, lastY + 20, { align: 'center' });
        doc.text(`Generated on ${new Date().toLocaleDateString()} for ${formData.firstName} ${formData.lastName}`, 105, lastY + 25, { align: 'center' });
        
        // Save the PDF
        doc.save(`TedRed_Application_${formData.firstName}_${formData.lastName}.pdf`);
        
        setPdfGenerated(true);
        setPdfGenerating(false);
      } catch (error) {
        console.error('Error generating PDF:', error);
        setPdfGenerating(false);
      }
    }, 500);
  };
  
  const formatLanguages = (languages?: Array<{language: string, level: string}>) => {
    if (!languages || languages.length === 0) return null;
    return languages.map(l => `${l.language} (${l.level})`).join(', ');
  };
  
  const getDepartmentName = (deptKey?: string) => {
    if (!deptKey) return 'Not specified';
    
    // Find department name from department ID
    for (const category of ["Tech Division", "Creative Division", "Marketing Division", "Business Operations"]) {
      if (deptKey.toLowerCase().includes(category.split(' ')[0].toLowerCase())) {
        return category;
      }
    }
    return deptKey;
  };

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

          {/* PDF Generation Button and Instructions */}
          <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 sm:p-5 mb-6 sm:mb-8 max-w-lg mx-auto">
            <h4 className="font-medium text-blue-300 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Application PDF Summary
            </h4>
            <p className="text-zinc-300 text-sm mb-3">
              Generate a PDF summary of your application that you can download and email to <span className="font-semibold text-blue-300">hr@tedred.com</span> to complete your application process.
            </p>
            <button
              onClick={generatePDF}
              disabled={pdfGenerating}
              className="w-full py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900/50 text-white transition-colors duration-200 flex items-center justify-center"
            >
              {pdfGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {pdfGenerated ? 'Download PDF Again' : 'Generate & Download PDF'}
                </>
              )}
            </button>
            {pdfGenerated && (
              <p className="text-xs text-green-400 mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                PDF generated successfully! Please email it to hr@tedred.com
              </p>
            )}
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