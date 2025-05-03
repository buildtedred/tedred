import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Star, Globe, DollarSign, Lightbulb, Users, MessageSquare } from 'lucide-react';

type IkigaiStepProps = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
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

// Ikigai questions
const ikigaiQuestions = {
  passion: [
    { id: "passion_1", text: "I enjoy solving complex problems and finding innovative solutions." },
    { id: "passion_2", text: "I find joy in creating visual content and expressing ideas through design." },
    { id: "passion_3", text: "I love analyzing data and uncovering meaningful insights." },
    { id: "passion_4", text: "I am passionate about understanding people and helping them achieve their goals." }
  ],
  mission: [
    { id: "mission_1", text: "I want to build technologies that make people's lives easier." },
    { id: "mission_2", text: "I believe effective communication and storytelling can change perspectives." },
    { id: "mission_3", text: "I aim to help organizations grow and reach their full potential." },
    { id: "mission_4", text: "I want to create systems that make businesses run more efficiently." }
  ],
  profession: [
    { id: "profession_1", text: "I have strong technical and logical thinking skills." },
    { id: "profession_2", text: "I have a good eye for aesthetics and creativity." },
    { id: "profession_3", text: "I excel at strategic thinking and planning." },
    { id: "profession_4", text: "I am good at organizing information and managing tasks." }
  ],
  vocation: [
    { id: "vocation_1", text: "I believe technical skills will be increasingly valuable in the future." },
    { id: "vocation_2", text: "I think creative roles offer fulfilling career opportunities." },
    { id: "vocation_3", text: "I see growth potential in marketing and business development." },
    { id: "vocation_4", text: "I value stability and essential operational functions." }
  ],
  softSkills: [
    { id: "soft_1", text: "I have excellent written and verbal communication skills." },
    { id: "soft_2", text: "I work well in a team and can collaborate effectively with others." },
    { id: "soft_3", text: "I am adaptable and can quickly adjust to new situations and challenges." },
    { id: "soft_4", text: "I have strong problem-solving abilities and critical thinking skills." }
  ],
  languages: [
    { id: "lang_eng", text: "English", placeholder: "Select proficiency level" },
    { id: "lang_urdu", text: "Urdu", placeholder: "Select proficiency level" },
    { id: "lang_pashto", text: "Pashto", placeholder: "Select proficiency level" },
    { id: "lang_punjabi", text: "Punjabi", placeholder: "Select proficiency level" },
    { id: "lang_sindhi", text: "Sindhi", placeholder: "Select proficiency level" },
    { id: "lang_balochi", text: "Balochi", placeholder: "Select proficiency level" },
    { id: "lang_saraiki", text: "Saraiki", placeholder: "Select proficiency level" },
    { id: "lang_kashmiri", text: "Kashmiri", placeholder: "Select proficiency level" },
    { id: "lang_arabic", text: "Arabic", placeholder: "Select proficiency level" },
    { id: "lang_hindi", text: "Hindi", placeholder: "Select proficiency level" },
    { id: "lang_oth", text: "Other", placeholder: "Specify language and level" }
  ]
};

// Language proficiency levels
const languageProficiencyLevels = [
  { value: "", label: "Not applicable" },
  { value: "beginner", label: "Beginner / A1-A2" },
  { value: "intermediate", label: "Intermediate / B1-B2" },
  { value: "advanced", label: "Advanced / C1-C2" },
  { value: "native", label: "Native / Fluent" }
];

// Department mapping based on Ikigai responses
const getDepartmentRecommendations = (answers: Record<string, number>) => {
  const scores = {
    tech: 0,
    creative: 0,
    marketing: 0,
    operations: 0
  };

  // Calculate scores based on answers
  Object.entries(answers).forEach(([id, value]) => {
    if (id.includes('passion_1') || id.includes('mission_1') || id.includes('profession_1') || id.includes('vocation_1')) {
      scores.tech += value;
    }
    if (id.includes('passion_2') || id.includes('mission_2') || id.includes('profession_2') || id.includes('vocation_2')) {
      scores.creative += value;
    }
    if (id.includes('passion_3') || id.includes('mission_3') || id.includes('profession_3') || id.includes('vocation_3')) {
      scores.marketing += value;
    }
    if (id.includes('passion_4') || id.includes('mission_4') || id.includes('profession_4') || id.includes('vocation_4')) {
      scores.operations += value;
    }
  });

  // Sort scores to find top recommendations
  const sortedDepartments = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([dept]) => dept);

  // Map to actual department names
  const departmentMap: Record<string, string> = {
    tech: "Tech Division",
    creative: "Creative Division",
    marketing: "Marketing Division",
    operations: "Business Operations"
  };

  // Return recommendations with department names
  return sortedDepartments.map(dept => ({
    department: departmentMap[dept],
    score: scores[dept as keyof typeof scores],
    key: dept
  }));
};

// Team recommendations based on specific question responses
const getTeamRecommendations = (answers: Record<string, number>, topDepartment: string) => {
  const teamRecommendations: Record<string, string[]> = {
    tech: [],
    creative: [],
    marketing: [],
    operations: []
  };

  // Technical team recommendations
  if (answers.passion_1 >= 4 && answers.profession_1 >= 4) {
    teamRecommendations.tech.push("AI & Automation", "Cloud Solutions");
  } else if (answers.mission_1 >= 4) {
    teamRecommendations.tech.push("Web Development", "Mobile Development");
  } else {
    teamRecommendations.tech.push("ERP Solutions", "No-Code Development");
  }

  // Creative team recommendations
  if (answers.passion_2 >= 4 && answers.profession_2 >= 4) {
    teamRecommendations.creative.push("UI/UX Design", "Brand Identity");
  } else {
    teamRecommendations.creative.push("Graphic Design", "Video Production");
  }

  // Marketing team recommendations
  if (answers.passion_3 >= 4 && answers.mission_3 >= 4) {
    teamRecommendations.marketing.push("Digital Marketing", "Market Research");
  } else {
    teamRecommendations.marketing.push("SEO", "Email Marketing");
  }

  // Operations team recommendations
  if (answers.profession_4 >= 4) {
    teamRecommendations.operations.push("Finance & Accounting", "Admin Operations");
  } else {
    teamRecommendations.operations.push("Human Resources", "Business Development");
  }

  // Return the recommendations for the top department
  const deptKey = Object.entries(departmentMap).find(([, name]) => name === topDepartment)?.[0] || "tech";
  return teamRecommendations[deptKey as keyof typeof teamRecommendations];
};

// Update recommendation function to consider soft skills
const enhanceRecommendationsWithSoftSkills = (
  recommendations: any[], 
  softSkillAnswers: Record<string, number>,
  languages: {language: string, level: string}[]
) => {
  // Clone the recommendations to avoid mutating the original
  const enhancedRecs = [...recommendations];
  
  // Check for language proficiencies
  const hasMultipleLanguages = languages.length >= 2;
  const hasAdvancedLanguages = languages.some(l => l.level === "Advanced" || l.level === "Native/Fluent");
  
  // Check for specific languages
  const southAsianLanguages = ["Urdu", "Hindi", "Pashto", "Punjabi", "Sindhi", "Balochi", "Saraiki", "Kashmiri"];
  const pakistaniLanguages = ["Urdu", "Pashto", "Punjabi", "Sindhi", "Balochi", "Saraiki", "Kashmiri"];
  
  const hasSouthAsianLanguages = languages.some(l => southAsianLanguages.includes(l.language));
  const hasPakistaniLanguages = languages.some(l => pakistaniLanguages.includes(l.language));
  const hasArabic = languages.some(l => l.language === "Arabic");
  
  // Enhance scores based on soft skills and languages
  enhancedRecs.forEach(rec => {
    // Communication skills boost for creative and marketing
    if ((rec.key === 'creative' || rec.key === 'marketing') && softSkillAnswers.soft_1 >= 4) {
      rec.score += 2;
      rec.enhancements = [...(rec.enhancements || []), "Strong communication skills"];
    }
    
    // Team collaboration boost for all departments
    if (softSkillAnswers.soft_2 >= 4) {
      rec.score += 1;
      rec.enhancements = [...(rec.enhancements || []), "Team collaboration"];
    }
    
    // Adaptability particularly boosts tech roles
    if (rec.key === 'tech' && softSkillAnswers.soft_3 >= 4) {
      rec.score += 2;
      rec.enhancements = [...(rec.enhancements || []), "Adaptability"];
    }
    
    // Critical thinking boosts all roles but especially operations
    if (softSkillAnswers.soft_4 >= 4) {
      rec.score += rec.key === 'operations' ? 2 : 1;
      rec.enhancements = [...(rec.enhancements || []), "Critical thinking"];
    }
    
    // Language skills boost for international roles
    if (hasMultipleLanguages) {
      if (rec.key === 'marketing' || rec.key === 'business') {
        rec.score += 3;
        rec.enhancements = [...(rec.enhancements || []), "Multilingual skills"];
      } else {
        rec.score += 1;
        rec.enhancements = [...(rec.enhancements || []), "Language diversity"];
      }
    }
    
    // South Asian language skills (Urdu, Hindi, Pashto, etc.)
    if (hasSouthAsianLanguages && (rec.key === 'marketing' || rec.key === 'business')) {
      rec.score += 2;
      rec.enhancements = [...(rec.enhancements || []), "South Asian language skills"];
    }
    
    // Specific boost for Pakistani languages
    if (hasPakistaniLanguages) {
      if (rec.key === 'marketing') {
        rec.score += 1;
        rec.enhancements = [...(rec.enhancements || []), "Pakistani language skills"];
      } else if (rec.key === 'business') {
        rec.score += 1;
        if (!rec.enhancements?.includes("Pakistani language skills")) {
          rec.enhancements = [...(rec.enhancements || []), "Pakistani language skills"];
        }
      }
    }

    // Arabic language skills
    if (hasArabic && (rec.key === 'marketing' || rec.key === 'business')) {
      rec.score += 2;
      rec.enhancements = [...(rec.enhancements || []), "Arabic language skills"];
    }
  });
  
  // Re-sort based on new scores
  return enhancedRecs.sort((a, b) => b.score - a.score);
};

// Department name mapping
const departmentMap: Record<string, string> = {
  tech: "Tech Division",
  creative: "Creative Division",
  marketing: "Marketing Division",
  operations: "Business Operations"
};

// Get language name from key
const getLangNameFromKey = (key: string): string => {
  const langMap: Record<string, string> = {
    lang_eng: "English",
    lang_urdu: "Urdu",
    lang_pashto: "Pashto",
    lang_punjabi: "Punjabi",
    lang_sindhi: "Sindhi",
    lang_balochi: "Balochi",
    lang_saraiki: "Saraiki",
    lang_kashmiri: "Kashmiri",
    lang_arabic: "Arabic",
    lang_hindi: "Hindi"
  };
  
  return langMap[key] || key.replace('lang_', '');
};

export const IkigaiStep = ({ formData, updateFormData, onNext, onPrevious }: IkigaiStepProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>(formData.ikigaiAnswers || {});
  const [languages, setLanguages] = useState<Array<{language: string, level: string}>>(
    formData.languages || []
  );
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [teamSuggestions, setTeamSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [newLanguage, setNewLanguage] = useState("");
  const [newLevel, setNewLevel] = useState("");

  const ikigaiSections = [
    { title: "What you love", description: "Select how much you agree with each statement about your passions", icon: <Heart size={20} />, questions: ikigaiQuestions.passion, color: "text-red-500" },
    { title: "What the world needs", description: "Select how much you agree with each statement about your mission", icon: <Globe size={20} />, questions: ikigaiQuestions.mission, color: "text-blue-500" },
    { title: "What you're good at", description: "Select how much you agree with each statement about your skills", icon: <Star size={20} />, questions: ikigaiQuestions.profession, color: "text-yellow-500" },
    { title: "What you can be paid for", description: "Select how much you agree with each statement about career opportunities", icon: <DollarSign size={20} />, questions: ikigaiQuestions.vocation, color: "text-green-500" },
    { title: "Soft Skills", description: "Rate your interpersonal abilities and adaptability skills", icon: <Users size={20} />, questions: ikigaiQuestions.softSkills, color: "text-purple-500" },
    { title: "Language Proficiency", description: "Add your language proficiencies", icon: <MessageSquare size={20} />, questions: [], color: "text-indigo-500", isLanguageSection: true },
    { title: "Your Ikigai Results", description: "Based on your responses, here are your recommended departments", icon: <Lightbulb size={20} />, questions: [], color: "text-amber-500" }
  ];

  // Handle rating selection for standard questions
  const handleRatingChange = (questionId: string, rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  // Handle adding a new language
  const handleAddLanguage = () => {
    if (newLanguage && newLevel) {
      setLanguages([...languages, {
        language: newLanguage,
        level: newLevel
      }]);
      setNewLanguage("");
      setNewLevel("");
    }
  };

  // Handle removing a language
  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  // Calculate recommendations when reaching the results step
  useEffect(() => {
    if (step === 6) { // Results step
      setLoading(true);
      // Simulate processing time
      setTimeout(() => {
        let deptRecommendations = getDepartmentRecommendations(answers);
        
        // Enhance recommendations with soft skills and language data
        deptRecommendations = enhanceRecommendationsWithSoftSkills(
          deptRecommendations, 
          answers,
          languages
        );
        
        setRecommendations(deptRecommendations);
        
        if (deptRecommendations.length > 0) {
          const topDept = deptRecommendations[0].department;
          const teams = getTeamRecommendations(answers, topDept);
          setTeamSuggestions(teams);
        }
        
        setLoading(false);
        
        // Save Ikigai results to form data
        updateFormData({
          ikigaiAnswers: answers,
          languages: languages,
          ikigaiResults: {
            departmentRecommendations: deptRecommendations,
            teamSuggestions: teamSuggestions,
            softSkills: getTopSoftSkills(answers),
            languages: languages
          }
        });
      }, 1500);
    }
  }, [step, answers, languages]);

  // Get top soft skills based on ratings
  const getTopSoftSkills = (answers: Record<string, number>) => {
    const softSkillMap = {
      soft_1: "Communication",
      soft_2: "Teamwork",
      soft_3: "Adaptability",
      soft_4: "Critical Thinking"
    };
    
    return Object.entries(answers)
      .filter(([key, value]) => key.startsWith('soft_') && value >= 4)
      .map(([key]) => softSkillMap[key as keyof typeof softSkillMap]);
  };

  // Handle next button
  const handleNext = () => {
    // Check if current section is complete
    const currentQuestions = ikigaiSections[step].questions;
    const isComplete = currentQuestions.length === 0 || 
      currentQuestions.every(q => Object.keys(answers).includes(q.id));
    
    if (isComplete) {
      if (step < ikigaiSections.length - 1) {
        setStep(step + 1);
      } else {
        onNext();
      }
    }
  };

  // Handle previous button
  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onPrevious();
    }
  };

  const handleSkipIkigai = () => {
    // Skip ikigai assessment and go to next step
    onNext();
  };

  // Get current section
  const currentSection = ikigaiSections[step];

  return (
    <div className="mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8 mt-1 sm:mt-2">Discover Your Strengths</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className={`${currentSection.color}`}>
                {currentSection.icon}
              </div>
              <h3 className="text-lg font-medium">{currentSection.title}</h3>
            </div>
            <p className="text-zinc-300 mb-6 text-sm sm:text-base">
              {currentSection.description}
            </p>
          </motion.div>

          {/* Standard question sections (steps 0-4) */}
          {step >= 0 && step <= 4 && (
            <div className="mb-8">
              {currentSection.questions.map((question) => (
                <motion.div 
                  key={question.id} 
                  variants={itemVariants}
                  className="mb-6 bg-zinc-900/50 p-4 sm:p-5 rounded-lg border border-zinc-800"
                >
                  <p className="mb-3 text-sm sm:text-base">{question.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Strongly Disagree</span>
                    <div className="flex gap-2 sm:gap-3">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(question.id, rating)}
                          className={`
                            w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm transition-all
                            ${answers[question.id] === rating 
                              ? 'bg-red-500 text-white' 
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}
                          `}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500">Strongly Agree</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Language proficiency section (step 5) */}
          {step === 5 && (
            <div className="mb-8">
              <p className="text-zinc-300 mb-4 text-sm">
                Add your language proficiencies below. Type in each language and select your proficiency level.
              </p>
              
              {/* Language list */}
              <div className="space-y-3 mb-5">
                {languages.map((lang, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-center gap-2 bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                    <div className="w-full sm:w-auto text-sm font-medium flex-1">{lang.language}</div>
                    <div className="text-sm text-zinc-400 flex-1">{lang.level}</div>
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(index)}
                      className="p-2 text-zinc-500 hover:text-red-500 rounded"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Add language form */}
              <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                <div className="flex flex-col space-y-3">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Enter language (e.g. Urdu, Pashto, English)"
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                  />
                  
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white"
                  >
                    <option value="">Select proficiency level</option>
                    <option value="Beginner / A1-A2">Beginner / A1-A2</option>
                    <option value="Intermediate / B1-B2">Intermediate / B1-B2</option>
                    <option value="Advanced / C1-C2">Advanced / C1-C2</option>
                    <option value="Native/Fluent">Native/Fluent</option>
                  </select>
                  
                  <button
                    type="button"
                    onClick={handleAddLanguage}
                    disabled={!newLanguage || !newLevel}
                    className="w-full p-3 bg-red-500 hover:bg-red-600 disabled:bg-zinc-700 text-white rounded-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Language
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results section (step 6) */}
          {step === 6 && (
            <motion.div variants={itemVariants} className="mb-8">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-10">
                  <div className="w-12 h-12 border-4 border-zinc-800 border-t-red-500 rounded-full animate-spin mb-4"></div>
                  <p>Analyzing your responses...</p>
                </div>
              ) : (
                <>
                  <div className="bg-zinc-900/50 p-4 sm:p-6 rounded-lg border border-zinc-800 mb-6">
                    <h4 className="text-base sm:text-lg font-medium mb-3">Department Recommendations</h4>
                    <p className="text-sm text-zinc-300 mb-4">Based on your Ikigai assessment, here are the departments that align with your strengths and interests:</p>
                    
                    <div className="space-y-3">
                      {recommendations.map((rec, index) => (
                        <div 
                          key={rec.key} 
                          className={`p-3 rounded-lg border ${index === 0 ? 'bg-red-500/10 border-red-500' : 'bg-zinc-800/50 border-zinc-700'}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-sm sm:text-base font-medium ${index === 0 ? 'text-red-400' : 'text-zinc-300'}`}>
                              {rec.department}
                            </span>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  size={14} 
                                  className={`${star <= Math.round(rec.score / 4) ? (index === 0 ? 'text-red-500' : 'text-zinc-400') : 'text-zinc-800'}`} 
                                  fill={star <= Math.round(rec.score / 4) ? 'currentColor' : 'none'} 
                                />
                              ))}
                            </div>
                          </div>
                          
                          {index === 0 && teamSuggestions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-red-500/30">
                              <p className="text-xs text-zinc-400 mb-2">Recommended Teams:</p>
                              <div className="flex flex-wrap gap-2">
                                {teamSuggestions.map(team => (
                                  <span key={team} className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-full">
                                    {team}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {rec.enhancements && rec.enhancements.length > 0 && (
                            <div className="mt-2 text-xs">
                              <span className="text-zinc-500">Strengths: </span>
                              <span className={index === 0 ? "text-red-300" : "text-zinc-400"}>
                                {rec.enhancements.join(', ')}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Display key skills and languages */}
                  <div className="bg-zinc-900/50 p-4 sm:p-6 rounded-lg border border-zinc-800 mb-6">
                    <h4 className="text-base sm:text-lg font-medium mb-3">Your Profile</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-zinc-300 mb-2">Key Strengths</h5>
                        <div className="flex flex-wrap gap-2">
                          {getTopSoftSkills(answers).map(skill => (
                            <span key={skill} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-zinc-300 mb-2">Languages</h5>
                        {languages.length > 0 ? (
                          <div className="space-y-1">
                            {languages.map((lang, index) => (
                              <div key={index} className="flex justify-between text-xs">
                                <span className="text-zinc-300">{lang.language}</span>
                                <span className="text-indigo-400">{lang.level}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-zinc-500">No languages selected</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-900/50 p-4 sm:p-6 rounded-lg border border-zinc-800">
                    <h4 className="text-base sm:text-lg font-medium mb-3">What's Next?</h4>
                    <p className="text-sm text-zinc-300 mb-3">
                      In the next step, you'll select your preferred department and specific areas of interest.
                    </p>
                    <p className="text-sm text-zinc-300">
                      Consider these recommendations as you make your selection, but feel free to choose any department that interests you.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          )}
          
          <motion.div className="flex justify-between mt-8 sm:mt-10" variants={itemVariants}>
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 flex items-center text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
            </button>
            
            <div className="flex gap-3">
              {step === 0 && (
                <button
                  type="button"
                  onClick={handleSkipIkigai}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                >
                  Skip
                </button>
              )}
              
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 flex items-center text-sm sm:text-base"
              >
                {step < 6 ? 'Next' : 'Continue'}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
};