import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

type PersonalInfoStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
};

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

export const PersonalInfoStep = ({ formData, updateFormData, onNext }: PersonalInfoStepProps) => {
  const { t } = useTranslation();
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const errors = { ...validationErrors };
    
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          errors[name] = 'First name is required';
        } else if (value.length < 2) {
          errors[name] = 'First name is too short';
        } else {
          delete errors[name];
        }
        break;
      case 'lastName':
        if (!value.trim()) {
          errors[name] = 'Last name is required';
        } else if (value.length < 2) {
          errors[name] = 'Last name is too short';
        } else {
          delete errors[name];
        }
        break;
      case 'email':
        if (!value.trim()) {
          errors[name] = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[name] = 'Please enter a valid email address';
        } else {
          delete errors[name];
        }
        break;
      case 'phone':
        if (!value.trim()) {
          errors[name] = 'Phone number is required';
        } else if (!/^[\d\+\-\(\) ]{7,20}$/.test(value)) {
          errors[name] = 'Please enter a valid phone number';
        } else {
          delete errors[name];
        }
        break;
      default:
        break;
    }
    
    setValidationErrors(errors);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
    
    validateField(name, value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      phone: true
    });
    
    // Validate all fields
    validateField('firstName', formData.firstName);
    validateField('lastName', formData.lastName);
    validateField('email', formData.email);
    validateField('phone', formData.phone);
    
    // Proceed only if there are no validation errors
    if (Object.keys(validationErrors).length === 0 && isFormValid()) {
      onNext();
    }
  };

  const getFieldError = (fieldName: string) => {
    return touchedFields[fieldName] ? validationErrors[fieldName] : undefined;
  };
  
  const isFieldValid = (fieldName: string) => {
    return touchedFields[fieldName] && !validationErrors[fieldName];
  };
  
  const isFormValid = () => {
    return Boolean(
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      // Simple email validation
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      // Basic phone validation
      /^[\d\+\-\(\) ]{7,20}$/.test(formData.phone)
    );
  };
  
  return (
    <div className="mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8 mt-1 sm:mt-2">Personal Information</h2>
      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto"
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6 mb-6 sm:mb-8" variants={itemVariants}>
          <div>
            <label className="block text-zinc-300 mb-1.5 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="firstName">
              First Name*
            </label>
            <div className="relative">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                  w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border rounded-lg focus:outline-none text-white transition-colors duration-200 text-sm sm:text-base
                  ${getFieldError('firstName') 
                    ? 'border-red-500 focus:border-red-500' 
                    : isFieldValid('firstName')
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-zinc-700 focus:border-red-500'
                  }
                `}
                placeholder="Enter your first name"
                required
              />
              {isFieldValid('firstName') && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {getFieldError('firstName') && (
              <p className="mt-1 text-xs text-red-500">{getFieldError('firstName')}</p>
            )}
          </div>
          <div>
            <label className="block text-zinc-300 mb-1.5 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="lastName">
              Last Name*
            </label>
            <div className="relative">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                  w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border rounded-lg focus:outline-none text-white transition-colors duration-200 text-sm sm:text-base
                  ${getFieldError('lastName') 
                    ? 'border-red-500 focus:border-red-500' 
                    : isFieldValid('lastName')
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-zinc-700 focus:border-red-500'
                  }
                `}
                placeholder="Enter your last name"
                required
              />
              {isFieldValid('lastName') && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {getFieldError('lastName') && (
              <p className="mt-1 text-xs text-red-500">{getFieldError('lastName')}</p>
            )}
          </div>
        </motion.div>
        
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6 mb-8 sm:mb-10" variants={itemVariants}>
          <div>
            <label className="block text-zinc-300 mb-1.5 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="email">
              Email Address*
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                  w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border rounded-lg focus:outline-none text-white transition-colors duration-200 text-sm sm:text-base
                  ${getFieldError('email') 
                    ? 'border-red-500 focus:border-red-500' 
                    : isFieldValid('email')
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-zinc-700 focus:border-red-500'
                  }
                `}
                placeholder="Enter your email address"
                required
              />
              {isFieldValid('email') && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {getFieldError('email') && (
              <p className="mt-1 text-xs text-red-500">{getFieldError('email')}</p>
            )}
          </div>
          <div>
            <label className="block text-zinc-300 mb-1.5 sm:mb-2 font-medium text-sm sm:text-base" htmlFor="phone">
              Phone Number*
            </label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                  w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-900 border rounded-lg focus:outline-none text-white transition-colors duration-200 text-sm sm:text-base
                  ${getFieldError('phone') 
                    ? 'border-red-500 focus:border-red-500' 
                    : isFieldValid('phone')
                      ? 'border-green-500 focus:border-green-500'
                      : 'border-zinc-700 focus:border-red-500'
                  }
                `}
                placeholder="Enter your phone number"
                required
              />
              {isFieldValid('phone') && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {getFieldError('phone') && (
              <p className="mt-1 text-xs text-red-500">{getFieldError('phone')}</p>
            )}
          </div>
        </motion.div>
        
        <motion.div className="flex justify-end mt-6 sm:mt-8" variants={itemVariants}>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 flex items-center text-sm sm:text-base"
            disabled={Object.keys(validationErrors).length > 0 && Object.keys(touchedFields).length > 0}
          >
            Next
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}; 