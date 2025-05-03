import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

type ExperienceStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
};

export const ExperienceStep = ({ formData, updateFormData, onNext, onPrevious }: ExperienceStepProps) => {
  const { t } = useTranslation();
  const [skill, setSkill] = useState('');
  
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    updateFormData({ experience: updatedExperience });
  };

  const handleDateChange = (index: number, field: string, date: Date | null) => {
    if (!date) return;
    
    const updatedExperience = [...formData.experience];
    
    // Format the date as MM/YYYY
    const formattedDate = `${date.getMonth() + 1}/${date.getFullYear()}`;
    updatedExperience[index] = { ...updatedExperience[index], [field]: formattedDate };
    
    updateFormData({ experience: updatedExperience });
  };
  
  const addExperience = () => {
    updateFormData({
      experience: [
        ...formData.experience,
        { company: '', position: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };
  
  const removeExperience = (index: number) => {
    if (formData.experience.length > 1) {
      const updatedExperience = [...formData.experience];
      updatedExperience.splice(index, 1);
      updateFormData({ experience: updatedExperience });
    }
  };
  
  const handleAddSkill = () => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      updateFormData({
        skills: [...formData.skills, skill.trim()]
      });
      setSkill('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    updateFormData({
      skills: formData.skills.filter((s: string) => s !== skillToRemove)
    });
  };
  
  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ portfolio: e.target.value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  
  const handleSkip = () => {
    // Clear any existing experience entries except the first one
    updateFormData({
      experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }]
    });
    onNext();
  };
  
  const isFormValid = () => {
    return true; // All fields are optional in this step
  };

  // Custom styling for the date picker to match the form design
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
    .react-datepicker__day-name {
      color: white;
    }
    .react-datepicker__day {
      color: #d4d4d8;
    }
    .react-datepicker__day:hover {
      background-color: #ef4444;
      color: white;
    }
    .react-datepicker__day--selected {
      background-color: #ef4444;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: #ef4444;
      color: white;
    }
    .react-datepicker__navigation-icon::before {
      border-color: #ef4444;
    }
    .react-datepicker__year-read-view--down-arrow {
      border-color: #ef4444;
    }
    .react-datepicker__month-read-view--down-arrow {
      border-color: #ef4444;
    }
    .react-datepicker__navigation:hover *::before {
      border-color: white;
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
  
  return (
    <div className="mx-auto">
      <style>{datePickerCustomStyles}</style>
      <h2 className="text-2xl font-bold mb-6 mt-2">Experience & Skills</h2>
      <form onSubmit={handleSubmit}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto"
        >
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Work Experience</h3>
              <button
                type="button"
                onClick={handleSkip}
                className="text-zinc-400 hover:text-red-400 transition-colors duration-200 flex items-center text-sm font-medium"
              >
                No experience? Skip
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </motion.div>
          
          {formData.experience.map((exp: any, index: number) => (
            <motion.div 
              key={index} 
              className="bg-zinc-900/50 border border-zinc-800 p-5 mb-6 rounded-lg"
              variants={itemVariants}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">Experience #{index + 1}</h3>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium">
                    Position
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                    placeholder="Your role"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium">
                    Start Date
                  </label>
                  <DatePicker
                    selected={exp.startDate ? new Date(exp.startDate.split('/').reverse().join('/')) : null}
                    onChange={(date) => handleDateChange(index, 'startDate', date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    placeholderText="MM/YYYY"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium">
                    End Date
                  </label>
                  <DatePicker
                    selected={exp.endDate ? new Date(exp.endDate.split('/').reverse().join('/')) : null}
                    onChange={(date) => handleDateChange(index, 'endDate', date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    placeholderText="MM/YYYY or Present"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-zinc-300 mb-2 font-medium">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white min-h-[100px]"
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>
            </motion.div>
          ))}
          
          <motion.div className="mb-8 mt-4" variants={itemVariants}>
            <button
              type="button"
              onClick={addExperience}
              className="w-full py-3 border border-dashed border-zinc-700 hover:border-zinc-500 rounded-lg text-zinc-400 hover:text-zinc-300 transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Another Experience
            </button>
          </motion.div>
          
          <motion.div className="mb-8" variants={itemVariants}>
            <h3 className="text-xl font-medium mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map((skill: string, index: number) => (
                <div key={index} className="bg-zinc-900/50 border border-zinc-800 py-1 px-3 rounded-full flex items-center">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-zinc-400 hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                placeholder="Add a skill (e.g., JavaScript, Design, Communication)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors duration-200"
              >
                Add
              </button>
            </div>
          </motion.div>
          
          <motion.div className="mb-10" variants={itemVariants}>
            <h3 className="text-xl font-medium mb-4">Portfolio</h3>
            <div>
              <label className="block text-zinc-300 mb-2 font-medium">
                Portfolio URL (optional)
              </label>
              <input
                type="url"
                value={formData.portfolio}
                onChange={handlePortfolioChange}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </motion.div>
          
          <motion.div className="flex justify-between mt-10" variants={itemVariants}>
            <button
              type="button"
              onClick={onPrevious}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
            </button>
            
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center"
            >
              Next
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
}; 