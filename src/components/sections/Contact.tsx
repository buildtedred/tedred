import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Mail, Github, Twitter, Linkedin, Instagram, ArrowUpRight, X,
  CheckCircle, Zap, Award, Shield, Headphones, Code, Gauge
} from 'lucide-react';
import clsx from 'clsx';
import { RTLIcon } from '../shared/RTLIcon';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceCategory: string;
  subService: string;
  budget: string;
  timeline: string;
  projectType: string;
  message: string;
  hearAboutUs: string;
}

interface FormErrors {
  [key: string]: string;
}

const serviceCategories = {
  'tech': {
    name: 'TedRed Tech',
    subServices: [
      'AI & Automation',
      'ERP Solutions',
      'No-Code Development',
      'Web Development',
      'Mobile Apps',
      'Cloud Solutions'
    ]
  },
  'design': {
    name: 'TedRed Design',
    subServices: [
      'UI/UX Design',
      'Brand Identity',
      'Graphic Design',
      'Motion Design'
    ]
  },
  'media': {
    name: 'TedRed Media',
    subServices: [
      'Video Production',
      'Social Media',
      'Content Creation',
      'Creative Strategy'
    ]
  },
  'marketing': {
    name: 'TedRed Marketing',
    subServices: [
      'Digital Marketing',
      'Market Research',
      'SEO',
      'Email Marketing'
    ]
  }
};

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+'
];

const timelines = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Ongoing'
];

const projectTypes = [
  'New Project',
  'Existing Project Enhancement',
  'Maintenance & Support',
  'Consultation'
];

const hearAboutUsOptions = [
  'Google Search',
  'Social Media',
  'Referral',
  'Professional Network',
  'Other'
];

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdrd1ponppoDD7VsHMnlDAqj_uXIRcZsacdK1N1hueQU8bTwg/formresponse";

const FORM_FIELDS = {
  name: "entry.514246039",
  email: "entry.254160850",
  company: "entry.1157862969",
  serviceCategory: "entry.546083322",
  subService: "entry.395983724",
  phone: "entry.YOUR_PHONE_FIELD_ID",
  budget: "entry.YOUR_BUDGET_FIELD_ID",
  timeline: "entry.YOUR_TIMELINE_FIELD_ID",
  projectType: "entry.YOUR_PROJECT_TYPE_FIELD_ID",
  hearAboutUs: "entry.YOUR_HEAR_ABOUT_US_FIELD_ID",
  message: "entry.YOUR_MESSAGE_FIELD_ID"
};

// Function to build the URL with parameters
const buildFormUrl = (formData: FormData) => {
  const params = new URLSearchParams({
    'usp': 'pp_url',
    [FORM_FIELDS.name]: formData.name,
    [FORM_FIELDS.email]: formData.email,
    [FORM_FIELDS.company]: formData.company,
    [FORM_FIELDS.serviceCategory]: formData.serviceCategory,
    [FORM_FIELDS.subService]: formData.subService,
    // ... add other fields
  });

  return `${GOOGLE_FORM_URL}?${params.toString()}`;
};

export const Contact: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceCategory: '',
    subService: '',
    budget: '',
    timeline: '',
    projectType: '',
    message: '',
    hearAboutUs: ''
  });

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.serviceCategory) {
      errors.serviceCategory = 'Please select a service category';
    }

    if (!formData.subService) {
      errors.subService = 'Please select a specific service';
    }

    if (!formData.budget) {
      errors.budget = 'Please select a budget range';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 20) {
      errors.message = 'Please provide more details about your project (minimum 20 characters)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowThankYou(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        serviceCategory: '',
        subService: '',
        budget: '',
        timeline: '',
        projectType: '',
        message: '',
        hearAboutUs: ''
      });
      setFormErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'serviceCategory') {
        newData.subService = '';
      }
      
      return newData;
    });

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputStyles = "w-full px-4 py-2.5 bg-zinc-900/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-red-500 text-white text-sm transition-colors";
  const labelStyles = "block text-sm font-medium text-gray-300 mb-2";
  const errorStyles = "text-xs text-red-500 mt-1";
  const selectStyles = clsx(
    inputStyles,
    "appearance-none bg-no-repeat bg-right pr-10",
    "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSIjNkI3MjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')]"
  );

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-zinc-900">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-red-600/10 text-red-500 font-semibold text-sm mb-4 sm:mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Let's Build Something Amazing
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            Tell us about your project and we'll help bring your vision to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold">Contact Information</h3>
              <motion.div 
                className={clsx(
                  "flex items-center gap-3 sm:gap-4",
                  isRTL && 'flex-row-reverse'
                )}
                whileHover={{ x: isRTL ? -10 : 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <RTLIcon className="text-red-500">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                </RTLIcon>
                <span className="text-sm sm:text-base text-gray-300">hi@tedred.com</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold">Connect With Us</h3>
              <div className="flex gap-4 sm:gap-6">
                {[
                  { icon: <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />, label: "LinkedIn" },
                  { icon: <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />, label: "Twitter" },
                  { icon: <Github className="h-5 w-5 sm:h-6 sm:w-6" />, label: "GitHub" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <RTLIcon className="text-red-500">
                      {social.icon}
                    </RTLIcon>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold">Why Choose Us</h3>
              <div className="grid gap-4">
                {[
                  { 
                    icon: <Code className="h-5 w-5 text-red-500" />,
                    title: "Expert Team", 
                    desc: "Skilled professionals with years of experience" 
                  },
                  { 
                    icon: <Zap className="h-5 w-5 text-purple-500" />,
                    title: "Custom Solutions", 
                    desc: "Tailored to your specific needs" 
                  },
                  { 
                    icon: <Award className="h-5 w-5 text-yellow-500" />,
                    title: "Proven Track Record", 
                    desc: "Successful projects across industries" 
                  },
                  { 
                    icon: <Headphones className="h-5 w-5 text-green-500" />,
                    title: "Ongoing Support", 
                    desc: "We're with you every step of the way" 
                  },
                  { 
                    icon: <Shield className="h-5 w-5 text-blue-500" />,
                    title: "Security First", 
                    desc: "Your data is always protected" 
                  },
                  { 
                    icon: <Gauge className="h-5 w-5 text-indigo-500" />,
                    title: "Fast Delivery", 
                    desc: "Quick turnaround without compromising quality" 
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-zinc-800/50 p-4 rounded-lg hover:bg-zinc-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3">
                      <RTLIcon>
                        {item.icon}
                      </RTLIcon>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-zinc-800/50 rounded-2xl p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {showThankYou ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-400 mb-6">Your message has been successfully sent. We'll get back to you within 24 hours!</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => setShowThankYou(false)}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className={labelStyles}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={clsx(inputStyles, formErrors.name && "border-red-500")}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <p className={errorStyles}>{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelStyles}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={clsx(inputStyles, formErrors.email && "border-red-500")}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className={errorStyles}>{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="phone" className={labelStyles}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={clsx(inputStyles, formErrors.phone && "border-red-500")}
                        placeholder="+1 (555) 123-4567"
                      />
                      {formErrors.phone && (
                        <p className={errorStyles}>{formErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="company" className={labelStyles}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputStyles}
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="serviceCategory" className={labelStyles}>
                        Service Category *
                      </label>
                      <select
                        id="serviceCategory"
                        name="serviceCategory"
                        value={formData.serviceCategory}
                        onChange={handleChange}
                        className={clsx(selectStyles, formErrors.serviceCategory && "border-red-500")}
                      >
                        <option value="">Select a category</option>
                        {Object.entries(serviceCategories).map(([key, category]) => (
                          <option key={key} value={key}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {formErrors.serviceCategory && (
                        <p className={errorStyles}>{formErrors.serviceCategory}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="subService" className={labelStyles}>
                        Specific Service *
                      </label>
                      <select
                        id="subService"
                        name="subService"
                        value={formData.subService}
                        onChange={handleChange}
                        className={clsx(selectStyles, formErrors.subService && "border-red-500")}
                        disabled={!formData.serviceCategory}
                      >
                        <option value="">Select a service</option>
                        {formData.serviceCategory && serviceCategories[formData.serviceCategory as keyof typeof serviceCategories].subServices.map((service, index) => (
                          <option key={index} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {formErrors.subService && (
                        <p className={errorStyles}>{formErrors.subService}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="budget" className={labelStyles}>
                        Budget Range *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={clsx(selectStyles, formErrors.budget && "border-red-500")}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                      {formErrors.budget && (
                        <p className={errorStyles}>{formErrors.budget}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="timeline" className={labelStyles}>
                        Project Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className={selectStyles}
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline, index) => (
                          <option key={index} value={timeline}>
                            {timeline}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="projectType" className={labelStyles}>
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={selectStyles}
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="hearAboutUs" className={labelStyles}>
                        How did you hear about us?
                      </label>
                      <select
                        id="hearAboutUs"
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleChange}
                        className={selectStyles}
                      >
                        <option value="">Select option</option>
                        {hearAboutUsOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="message" className={labelStyles}>
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={clsx(inputStyles, "resize-none", formErrors.message && "border-red-500")}
                      placeholder="Please describe your project, goals, and any specific requirements..."
                    />
                    {formErrors.message && (
                      <p className={errorStyles}>{formErrors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx(
                      "w-full px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg transition-all duration-300",
                      isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:from-red-500 hover:to-red-400"
                    )}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : "Send Message"}
                  </motion.button>

                  {/* Privacy Notice */}
                  <p className="text-xs text-gray-400 text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="#" className="text-red-500 hover:text-red-400">Privacy Policy</a>{' '}
                    and{' '}
                    <a href="#" className="text-red-500 hover:text-red-400">Terms of Service</a>.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};