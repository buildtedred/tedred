import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { IkigaiStep } from './steps/IkigaiStep';
import { DepartmentStep } from './steps/DepartmentStep';
import { EducationStep } from './steps/EducationStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { SubmissionStep } from './steps/SubmissionStep';
import { SuccessPage } from './steps/SuccessPage';

type FormData = {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Ikigai Assessment
  ikigaiAnswers: Record<string, number>;
  languageAnswers: Record<string, string>;
  otherLanguage: string;
  ikigaiResults: {
    departmentRecommendations: Array<{
      department: string;
      score: number;
      key: string;
      enhancements?: string[];
    }>;
    teamSuggestions: string[];
    softSkills: string[];
    languages: Array<{
      language: string;
      level: string;
    }>;
  };
  // Department Selection
  department: string;
  interests: string[];
  // Education
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    graduationYear: string;
  }[];
  // Experience
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  // Additional
  skills: string[];
  portfolio: string;
  resumeUrl: string;
  coverLetter: string;
  interviewDate: Date | null;
};

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  ikigaiAnswers: {},
  languageAnswers: {},
  otherLanguage: '',
  ikigaiResults: {
    departmentRecommendations: [],
    teamSuggestions: [],
    softSkills: [],
    languages: []
  },
  department: '',
  interests: [],
  education: [{ institution: '', degree: '', fieldOfStudy: '', graduationYear: '' }],
  experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
  skills: [],
  portfolio: '',
  resumeUrl: '',
  coverLetter: '',
  interviewDate: null,
};

// Steps configuration for better maintainability
const STEPS = [
  { id: 1, name: 'Personal Info' },
  { id: 2, name: 'Discover' },
  { id: 3, name: 'Department' },
  { id: 4, name: 'Education' },
  { id: 5, name: 'Experience' },
  { id: 6, name: 'Review' },
];

export const InternshipForm = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = STEPS.length;

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      // Scroll to top of form when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      // Scroll to top of form when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (stepNumber: number) => {
    // Only allow jumping to previously visited steps
    if (stepNumber < step) {
      setStep(stepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setStep(1);
    setIsSubmitted(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If the form is submitted successfully, show the success page
  if (isSubmitted) {
    return (
      <div className="bg-zinc-900/90 border border-zinc-800 p-6 md:p-8 rounded-xl shadow-xl mb-12 max-w-4xl mx-auto">
        <SuccessPage formData={formData} onReset={handleReset} />
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
          />
        );
      case 2:
        return (
          <IkigaiStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <DepartmentStep
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <EducationStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
          />
        );
      case 5:
        return (
          <ExperienceStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
          />
        );
      case 6:
        return (
          <SubmissionStep 
            formData={formData} 
            updateFormData={updateFormData} 
            onSubmit={handleSubmit} 
            onPrevious={handlePrevious}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
          />
        );
      default:
        return null;
    }
  };

  // Helper function to determine step status
  const getStepStatus = (stepNumber: number) => {
    if (stepNumber === step) return 'current';
    if (stepNumber < step) return 'completed';
    return 'upcoming';
  };

  // Calculate progress percentage
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl mb-6 md:mb-12 w-full max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6 md:mb-8 px-0 sm:px-4">
        {/* Step numbers and labels */}
        <div className="relative mb-6 md:mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((s) => {
              const status = getStepStatus(s.id);
              return (
                <button 
                  key={s.id} 
                  className={`flex flex-col items-center transition-colors duration-300 ${status === 'completed' ? 'cursor-pointer' : ''}`}
                  onClick={() => status === 'completed' && handleJumpToStep(s.id)}
                  disabled={status !== 'completed' && status !== 'current'}
                >
                  <div 
                    className={`
                      relative z-10 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 shadow-md
                      ${status === 'current' ? 'bg-red-500 text-white ring-2 ring-red-300 ring-opacity-50' : 
                        status === 'completed' ? 'bg-green-500 text-white' : 'bg-zinc-800 text-zinc-400'}
                    `}
                  >
                    {status === 'completed' ? (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : s.id}
                  </div>
                  <span 
                    className={`
                      mt-1.5 sm:mt-2 text-[8px] sm:text-[10px] md:text-xs font-medium transition-colors duration-300 max-w-[60px] text-center
                      ${status === 'current' ? 'text-red-500' : 
                        status === 'completed' ? 'text-green-500' : 'text-zinc-500'}
                    `}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* Connecting line */}
          <div className="absolute top-3 sm:top-4 md:top-4.5 left-0 right-0 h-0.5 -translate-y-1/2 bg-zinc-800">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[300px] w-full px-1 sm:px-4 md:px-6"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};