import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type SubmissionStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
  onSubmit: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
};

export const SubmissionStep = ({ 
  formData, 
  updateFormData, 
  onSubmit, 
  onPrevious,
  isSubmitting,
  isSubmitted 
}: SubmissionStepProps) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [coverLetter, setCoverLetter] = useState(formData.coverLetter || '');
  const [interviewDate, setInterviewDate] = useState<Date | null>(formData.interviewDate ? new Date(formData.interviewDate) : null);
  
  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCoverLetter(e.target.value);
    updateFormData({ coverLetter: e.target.value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload the file to a server and get a URL back
      updateFormData({ resumeUrl: file.name });
    }
  };

  const handleInterviewDateChange = (date: Date | null) => {
    setInterviewDate(date);
    updateFormData({ interviewDate: date });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Custom date picker styles
  const datePickerCustomStyles = `
    .react-datepicker {
      font-family: inherit;
      background-color: #18181b;
      border: 1px solid #3f3f46;
      border-radius: 0.5rem;
      color: white;
    }
    .react-datepicker__header {
      background-color: #27272a;
      border-bottom: 1px solid #3f3f46;
    }
    .react-datepicker__current-month, 
    .react-datepicker__day-name,
    .react-datepicker__time-name {
      color: white;
    }
    .react-datepicker__day,
    .react-datepicker__time-list-item {
      color: #d4d4d8;
    }
    .react-datepicker__day:hover,
    .react-datepicker__time-list-item:hover {
      background-color: #ef4444;
      color: white;
    }
    .react-datepicker__day--selected,
    .react-datepicker__time-list-item--selected {
      background-color: #ef4444;
      color: white;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: #ef4444;
      color: white;
    }
    .react-datepicker__navigation-icon::before {
      border-color: #ef4444;
    }
    .react-datepicker__time-container {
      border-left: 1px solid #3f3f46;
    }
    .react-datepicker__time {
      background-color: #18181b;
    }
    .react-datepicker__time-list {
      background-color: #18181b;
    }
    .react-datepicker__input-container input {
      width: 100%;
      padding: 0.75rem 1rem;
      background-color: #18181b;
      border: 1px solid #3f3f46;
      border-radius: 0.5rem;
      color: white;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .react-datepicker__input-container input:focus {
      border-color: #ef4444;
    }
  `;
  
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
        <p className="text-zinc-300 mb-6">
          Thank you for applying to the TedRed Internship Program. We've received your application and will be in touch soon.
        </p>
        <p className="text-zinc-400 text-sm mb-2">
          A confirmation email has been sent to {formData.email}
        </p>
        {interviewDate && (
          <p className="text-zinc-300 mb-6">
            Your interview is scheduled for{' '}
            <span className="font-medium text-red-400">
              {interviewDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </p>
        )}
        <div>
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
          >
            Return to Homepage
          </a>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div>
      <style>{datePickerCustomStyles}</style>
      <h2 className="text-2xl font-bold mb-6">Final Step</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-zinc-300 mb-2 font-medium">
            Upload Resume (optional)
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors duration-200"
            >
              Select File
            </button>
            <span className="text-zinc-400">
              {formData.resumeUrl ? formData.resumeUrl : 'No file selected'}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Accepted formats: PDF, DOC, DOCX. Max size: 5MB
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-zinc-300 mb-2 font-medium">
            Schedule Interview (optional)
          </label>
          <div className="w-full">
            <DatePicker
              selected={interviewDate}
              onChange={handleInterviewDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select date and time"
              minDate={new Date()}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
              filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6} // Disable weekends
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            Choose a preferred date and time for your interview (weekdays only)
          </p>
        </div>
        
        <div className="mb-8">
          <label className="block text-zinc-300 mb-2 font-medium">
            Cover Letter / Additional Information (optional)
          </label>
          <textarea
            value={coverLetter}
            onChange={handleCoverLetterChange}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white min-h-[200px]"
            placeholder="Tell us why you want to join the TedRed team and what makes you a great candidate..."
          />
        </div>
        
        <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-lg mb-10">
          <h3 className="font-medium text-lg mb-4">Application Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <span className="text-zinc-400">Name:</span> {formData.firstName} {formData.lastName}
            </div>
            <div>
              <span className="text-zinc-400">Email:</span> {formData.email}
            </div>
            <div>
              <span className="text-zinc-400">Phone:</span> {formData.phone}
            </div>
            <div>
              <span className="text-zinc-400">Education:</span> {formData.education[0]?.degree} in {formData.education[0]?.fieldOfStudy}
            </div>
            <div>
              <span className="text-zinc-400">Skills:</span> {formData.skills.slice(0, 3).join(', ')}{formData.skills.length > 3 ? ` +${formData.skills.length - 3} more` : ''}
            </div>
            {interviewDate && (
              <div>
                <span className="text-zinc-400">Interview:</span> {interviewDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors duration-200"
            disabled={isSubmitting}
          >
            Previous
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}; 