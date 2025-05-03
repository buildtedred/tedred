import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

type EducationStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
};

// Animation variants for staggered animations
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

export const EducationStep = ({ formData, updateFormData, onNext, onPrevious }: EducationStepProps) => {
  const { t } = useTranslation();
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const handleChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    updateFormData({ education: updatedEducation });
    
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [`education[${index}].${field}`]: true
    }));
    
    // Validate the field
    validateField(index, field, value);
  };

  const validateField = (index: number, field: string, value: string) => {
    const fieldKey = `education[${index}].${field}`;
    const updatedErrors = { ...validationErrors };
    
    switch (field) {
      case 'institution':
        if (!value.trim()) {
          updatedErrors[fieldKey] = 'Institution is required';
        } else if (value.length < 2) {
          updatedErrors[fieldKey] = 'Institution name is too short';
        } else {
          delete updatedErrors[fieldKey];
        }
        break;
      case 'degree':
        if (!value.trim()) {
          updatedErrors[fieldKey] = 'Degree is required';
        } else {
          delete updatedErrors[fieldKey];
        }
        break;
      case 'fieldOfStudy':
        if (!value.trim()) {
          updatedErrors[fieldKey] = 'Field of study is required';
        } else {
          delete updatedErrors[fieldKey];
        }
        break;
      case 'graduationYear':
        if (!value.trim()) {
          updatedErrors[fieldKey] = 'Graduation year is required';
        } else if (!/^\d{4}$/.test(value)) {
          updatedErrors[fieldKey] = 'Please enter a valid year (e.g., 2023)';
        } else {
          const year = parseInt(value);
          const currentYear = new Date().getFullYear();
          if (year < 1950 || year > currentYear + 10) {
            updatedErrors[fieldKey] = `Year must be between 1950 and ${currentYear + 10}`;
          } else {
            delete updatedErrors[fieldKey];
          }
        }
        break;
      default:
        break;
    }
    
    setValidationErrors(updatedErrors);
  };
  
  const addEducation = () => {
    updateFormData({
      education: [
        ...formData.education,
        { institution: '', degree: '', fieldOfStudy: '', graduationYear: '' }
      ]
    });
  };
  
  const removeEducation = (index: number) => {
    if (formData.education.length > 1) {
      const updatedEducation = [...formData.education];
      updatedEducation.splice(index, 1);
      updateFormData({ education: updatedEducation });
      
      // Remove validation errors for the removed education entry
      const newErrors = { ...validationErrors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`education[${index}]`)) {
          delete newErrors[key];
        }
      });
      setValidationErrors(newErrors);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    formData.education.forEach((edu: any, index: number) => {
      ['institution', 'degree', 'fieldOfStudy', 'graduationYear'].forEach(field => {
        allTouched[`education[${index}].${field}`] = true;
        validateField(index, field, edu[field]);
      });
    });
    setTouchedFields(allTouched);
    
    // Proceed if there are no validation errors
    if (Object.keys(validationErrors).length === 0 && isFormValid()) {
      onNext();
    }
  };
  
  const isFormValid = () => {
    return formData.education.every(
      (edu: any) => edu.institution && edu.degree && edu.fieldOfStudy && edu.graduationYear
    );
  };

  const getFieldError = (index: number, field: string) => {
    const key = `education[${index}].${field}`;
    return touchedFields[key] ? validationErrors[key] : undefined;
  };
  
  const isFieldValid = (index: number, field: string) => {
    const error = getFieldError(index, field);
    return touchedFields[`education[${index}].${field}`] && !error;
  };
  
  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold mb-8 mt-2">Education</h2>
      <form onSubmit={handleSubmit}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto"
        >
          {formData.education.map((education: any, index: number) => (
            <motion.div 
              key={index} 
              className="bg-zinc-900/50 border border-zinc-800 p-5 sm:p-6 mb-8 rounded-lg"
              variants={itemVariants}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium text-lg">Education #{index + 1}</h3>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium">
                    Institution*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                      onBlur={() => {
                        setTouchedFields(prev => ({
                          ...prev,
                          [`education[${index}].institution`]: true
                        }));
                        validateField(index, 'institution', education.institution);
                      }}
                      className={`
                        w-full px-4 py-3 bg-zinc-900 border rounded-lg focus:outline-none text-white transition-colors duration-200
                        ${getFieldError(index, 'institution') 
                          ? 'border-red-500 focus:border-red-500' 
                          : isFieldValid(index, 'institution')
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-zinc-700 focus:border-red-500'
                        }
                      `}
                      placeholder="University/College name"
                      required
                    />
                    {isFieldValid(index, 'institution') && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {getFieldError(index, 'institution') && (
                    <p className="mt-1 text-xs text-red-500">{getFieldError(index, 'institution')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium">
                    Degree*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => handleChange(index, 'degree', e.target.value)}
                      onBlur={() => {
                        setTouchedFields(prev => ({
                          ...prev,
                          [`education[${index}].degree`]: true
                        }));
                        validateField(index, 'degree', education.degree);
                      }}
                      className={`
                        w-full px-4 py-3 bg-zinc-900 border rounded-lg focus:outline-none text-white transition-colors duration-200
                        ${getFieldError(index, 'degree') 
                          ? 'border-red-500 focus:border-red-500' 
                          : isFieldValid(index, 'degree')
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-zinc-700 focus:border-red-500'
                        }
                      `}
                      placeholder="Bachelor's, Master's, etc."
                      required
                    />
                    {isFieldValid(index, 'degree') && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {getFieldError(index, 'degree') && (
                    <p className="mt-1 text-xs text-red-500">{getFieldError(index, 'degree')}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium">
                    Field of Study*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={education.fieldOfStudy}
                      onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                      onBlur={() => {
                        setTouchedFields(prev => ({
                          ...prev,
                          [`education[${index}].fieldOfStudy`]: true
                        }));
                        validateField(index, 'fieldOfStudy', education.fieldOfStudy);
                      }}
                      className={`
                        w-full px-4 py-3 bg-zinc-900 border rounded-lg focus:outline-none text-white transition-colors duration-200
                        ${getFieldError(index, 'fieldOfStudy') 
                          ? 'border-red-500 focus:border-red-500' 
                          : isFieldValid(index, 'fieldOfStudy')
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-zinc-700 focus:border-red-500'
                        }
                      `}
                      placeholder="Computer Science, Business, etc."
                      required
                    />
                    {isFieldValid(index, 'fieldOfStudy') && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {getFieldError(index, 'fieldOfStudy') && (
                    <p className="mt-1 text-xs text-red-500">{getFieldError(index, 'fieldOfStudy')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-zinc-300 mb-2 font-medium">
                    Graduation Year*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={education.graduationYear}
                      onChange={(e) => handleChange(index, 'graduationYear', e.target.value)}
                      onBlur={() => {
                        setTouchedFields(prev => ({
                          ...prev,
                          [`education[${index}].graduationYear`]: true
                        }));
                        validateField(index, 'graduationYear', education.graduationYear);
                      }}
                      className={`
                        w-full px-4 py-3 bg-zinc-900 border rounded-lg focus:outline-none text-white transition-colors duration-200
                        ${getFieldError(index, 'graduationYear') 
                          ? 'border-red-500 focus:border-red-500' 
                          : isFieldValid(index, 'graduationYear')
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-zinc-700 focus:border-red-500'
                        }
                      `}
                      placeholder="Year of graduation"
                      required
                    />
                    {isFieldValid(index, 'graduationYear') && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {getFieldError(index, 'graduationYear') && (
                    <p className="mt-1 text-xs text-red-500">{getFieldError(index, 'graduationYear')}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            className="mb-8 mt-4"
            variants={itemVariants}
          >
            <button
              type="button"
              onClick={addEducation}
              className="w-full py-3 border border-dashed border-zinc-700 hover:border-zinc-500 rounded-lg text-zinc-400 hover:text-zinc-300 transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Another Education
            </button>
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
              disabled={Object.keys(validationErrors).length > 0}
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