import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bot, Globe, Smartphone, Database, Palette, Brush, PenTool, Video, BarChart, Users, Target, Mail, Blocks, Cpu, Settings, Briefcase, Landmark, User, LineChart, Coffee, Lightbulb } from 'lucide-react';

type DepartmentStepProps = {
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

// Department data structure
const departments = [
  {
    category: "Tech Division",
    teams: [
      { id: "ai_automation", name: "AI & Automation", icon: <Cpu size={20} />, description: "Develop intelligent solutions that automate business processes" },
      { id: "erp_solutions", name: "ERP Solutions", icon: <Settings size={20} />, description: "Build and implement enterprise resource planning systems" },
      { id: "web_dev", name: "Web Development", icon: <Globe size={20} />, description: "Create responsive web applications and sites" },
      { id: "mobile_dev", name: "Mobile Development", icon: <Smartphone size={20} />, description: "Develop native and cross-platform mobile apps" },
      { id: "cloud_solutions", name: "Cloud Solutions", icon: <Database size={20} />, description: "Architect scalable cloud infrastructure" },
      { id: "no_code", name: "No-Code Development", icon: <Blocks size={20} />, description: "Build applications using visual development platforms" }
    ]
  },
  {
    category: "Creative Division",
    teams: [
      { id: "ui_ux", name: "UI/UX Design", icon: <Palette size={20} />, description: "Design intuitive user interfaces and experiences" },
      { id: "brand_identity", name: "Brand Identity", icon: <Brush size={20} />, description: "Create comprehensive visual brand identities" },
      { id: "graphic_design", name: "Graphic Design", icon: <PenTool size={20} />, description: "Produce visual content for digital and print media" },
      { id: "video_production", name: "Video Production", icon: <Video size={20} />, description: "Create engaging video content and motion graphics" }
    ]
  },
  {
    category: "Marketing Division",
    teams: [
      { id: "digital_marketing", name: "Digital Marketing", icon: <BarChart size={20} />, description: "Develop and execute online marketing campaigns" },
      { id: "market_research", name: "Market Research", icon: <Users size={20} />, description: "Analyze markets, competitors, and customer needs" },
      { id: "seo", name: "SEO", icon: <Target size={20} />, description: "Optimize digital content for search engines" },
      { id: "email_marketing", name: "Email Marketing", icon: <Mail size={20} />, description: "Design and implement email marketing strategies" }
    ]
  },
  {
    category: "Business Operations",
    teams: [
      { id: "finance", name: "Finance & Accounting", icon: <Landmark size={20} />, description: "Manage financial records, reporting, and budgeting" },
      { id: "hr", name: "Human Resources", icon: <User size={20} />, description: "Oversee recruitment, employee relations, and development" },
      { id: "business_dev", name: "Business Development", icon: <LineChart size={20} />, description: "Identify growth opportunities and build partnerships" },
      { id: "admin", name: "Admin Operations", icon: <Briefcase size={20} />, description: "Support day-to-day operations and logistics" },
      { id: "customer_support", name: "Customer Support", icon: <Coffee size={20} />, description: "Provide assistance and resolve client issues" }
    ]
  }
];

export const DepartmentStep = ({ formData, updateFormData, onNext, onPrevious }: DepartmentStepProps) => {
  const { t } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState<string>(formData.department || "");
  const [interests, setInterests] = useState<string[]>(formData.interests || []);
  const [errors, setErrors] = useState<{ department?: string }>({});
  const [showRecommendations, setShowRecommendations] = useState(true);

  const hasIkigaiResults = formData.ikigaiResults && 
                          formData.ikigaiResults.departmentRecommendations && 
                          formData.ikigaiResults.departmentRecommendations.length > 0;

  // Get category ID from department name
  const getCategoryId = (departmentName: string): string => {
    switch (departmentName) {
      case "Tech Division": return "tech";
      case "Creative Division": return "creative";
      case "Marketing Division": return "marketing";
      case "Business Operations": return "operations";
      default: return "";
    }
  };

  // Get recommended team IDs based on Ikigai results
  const getRecommendedTeamIds = (): string[] => {
    if (!hasIkigaiResults || !formData.ikigaiResults.teamSuggestions) return [];

    const teamIds: string[] = [];
    const teamSuggestions = formData.ikigaiResults.teamSuggestions;

    // Map team names to team IDs
    departments.forEach(category => {
      category.teams.forEach(team => {
        if (teamSuggestions.includes(team.name)) {
          teamIds.push(team.id);
        }
      });
    });

    return teamIds;
  };

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    updateFormData({ department: departmentId });
    setErrors({});
  };

  const handleInterestToggle = (interest: string) => {
    const updatedInterests = interests.includes(interest)
      ? interests.filter(i => i !== interest)
      : [...interests, interest];
    
    setInterests(updatedInterests);
    updateFormData({ interests: updatedInterests });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDepartment) {
      setErrors({ department: "Please select a department" });
      return;
    }
    
    onNext();
  };

  const findDepartmentName = () => {
    for (const category of departments) {
      const team = category.teams.find(team => team.id === selectedDepartment);
      if (team) return team.name;
    }
    return "";
  };

  // If the user has Ikigai results, highlight recommended departments
  useEffect(() => {
    if (hasIkigaiResults && !selectedDepartment) {
      const topRecommendation = formData.ikigaiResults.departmentRecommendations[0];
      const categoryId = getCategoryId(topRecommendation.department);
      
      // Find a team in the recommended department
      const recommendedTeams = getRecommendedTeamIds();
      if (recommendedTeams.length > 0) {
        handleDepartmentSelect(recommendedTeams[0]);
      } else {
        // Select first team in the department if no specific team recommendation
        const department = departments.find(d => d.category === topRecommendation.department);
        if (department && department.teams.length > 0) {
          handleDepartmentSelect(department.teams[0].id);
        }
      }
    }
  }, []);

  // Helper function to check if a team is recommended
  const isRecommendedTeam = (teamId: string): boolean => {
    if (!hasIkigaiResults) return false;
    return getRecommendedTeamIds().includes(teamId);
  };

  // Helper function to check if a department is recommended
  const isRecommendedDepartment = (categoryName: string): boolean => {
    if (!hasIkigaiResults) return false;
    return formData.ikigaiResults.departmentRecommendations.some(
      (rec: {department: string}) => rec.department === categoryName
    );
  };

  return (
    <div className="mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8 mt-1 sm:mt-2">Department Selection</h2>
      <form onSubmit={handleSubmit}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-zinc-300 mb-4 text-sm sm:text-base">
              Select the department where you would like to intern. This helps us match you with the right team and projects.
            </p>
            
            {hasIkigaiResults && showRecommendations && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={18} className="text-red-400" />
                  <h3 className="text-red-400 font-medium">Based on your Ikigai assessment</h3>
                </div>
                <p className="text-zinc-300 text-sm mb-3">
                  We've highlighted departments and teams that align with your strengths and interests.
                </p>
                <button 
                  type="button"
                  onClick={() => setShowRecommendations(false)}
                  className="text-xs text-red-400 hover:text-red-300 underline"
                >
                  Hide recommendations
                </button>
              </div>
            )}
            
            {errors.department && (
              <p className="text-red-500 text-sm mb-4">{errors.department}</p>
            )}
          </motion.div>

          {departments.map((category, index) => (
            <motion.div 
              key={category.category} 
              variants={itemVariants}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg sm:text-xl font-medium">{category.category}</h3>
                {isRecommendedDepartment(category.category) && showRecommendations && (
                  <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {category.teams.map(team => (
                  <div 
                    key={team.id}
                    onClick={() => handleDepartmentSelect(team.id)}
                    className={`
                      bg-zinc-900/50 border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200 relative
                      ${selectedDepartment === team.id 
                        ? 'border-red-500 bg-red-500/10' 
                        : isRecommendedTeam(team.id) && showRecommendations
                          ? 'border-red-500/30 hover:border-red-500'
                          : 'border-zinc-800 hover:border-zinc-600'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`text-${selectedDepartment === team.id ? 'red' : 'zinc'}-500`}>
                        {team.icon}
                      </div>
                      <h4 className="font-medium text-sm sm:text-base">{team.name}</h4>
                    </div>
                    <p className="text-zinc-400 text-xs sm:text-sm">{team.description}</p>
                    
                    {isRecommendedTeam(team.id) && showRecommendations && (
                      <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                        <span className="flex h-4 w-4 items-center justify-center bg-red-500 text-white text-xs rounded-full">
                          <Lightbulb size={10} />
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {selectedDepartment && (
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <h3 className="text-lg sm:text-xl font-medium mb-4">Areas of Interest</h3>
              <p className="text-zinc-300 mb-4 text-sm sm:text-base">
                What specific areas within {findDepartmentName()} interest you? Select all that apply.
              </p>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {getInterestsByDepartment(selectedDepartment).map(interest => (
                  <div
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`
                      px-3 py-1.5 rounded-full text-xs sm:text-sm cursor-pointer transition-colors duration-200
                      ${interests.includes(interest)
                        ? 'bg-red-500 text-white'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }
                    `}
                  >
                    {interest}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          <motion.div className="flex justify-between mt-8 sm:mt-10" variants={itemVariants}>
            <button
              type="button"
              onClick={onPrevious}
              className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 flex items-center text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
              </svg>
              Back
            </button>
            
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition-colors duration-200 flex items-center text-sm sm:text-base"
            >
              Next
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
};

// Helper function to get interests based on selected department
function getInterestsByDepartment(departmentId: string): string[] {
  switch (departmentId) {
    case 'ai_automation':
      return ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Chatbots', 'Workflow Automation', 'Process Optimization'];
    case 'erp_solutions':
      return ['Financial Systems', 'Inventory Management', 'CRM Integration', 'Business Process Design', 'Custom Module Development'];
    case 'web_dev':
      return ['Frontend Development', 'Backend Development', 'Full-stack Development', 'E-commerce', 'Progressive Web Apps', 'API Design'];
    case 'mobile_dev':
      return ['iOS Development', 'Android Development', 'Cross-platform Apps', 'Mobile UI/UX', 'App Store Optimization'];
    case 'cloud_solutions':
      return ['Cloud Architecture', 'DevOps', 'Serverless Computing', 'Microservices', 'Cloud Security', 'Migration Strategies'];
    case 'no_code':
      return ['Visual App Development', 'Database Design', 'Workflow Automation', 'API Integration', 'Plugin Development'];
    case 'ui_ux':
      return ['User Research', 'Wireframing', 'Prototyping', 'Interaction Design', 'User Testing', 'Design Systems'];
    case 'brand_identity':
      return ['Logo Design', 'Visual Identity', 'Brand Guidelines', 'Brand Strategy', 'Marketing Collateral'];
    case 'graphic_design':
      return ['Digital Graphics', 'Print Design', 'Illustration', 'Packaging Design', 'Infographics'];
    case 'video_production':
      return ['Video Editing', 'Animation', 'Motion Graphics', 'Product Videos', 'Event Coverage'];
    case 'digital_marketing':
      return ['PPC Advertising', 'Social Media Marketing', 'Content Marketing', 'Analytics & Reporting', 'Campaign Management'];
    case 'market_research':
      return ['Competitor Analysis', 'Consumer Behavior', 'Market Trends', 'Data Analysis', 'Focus Groups'];
    case 'seo':
      return ['Technical SEO', 'On-page Optimization', 'Link Building', 'Content Strategy', 'Local SEO'];
    case 'email_marketing':
      return ['Campaign Strategy', 'Email Automation', 'A/B Testing', 'List Management', 'Performance Analytics'];
    case 'finance':
      return ['Accounting', 'Financial Analysis', 'Budgeting', 'Accounts Payable', 'Tax Planning'];
    case 'hr':
      return ['Recruitment', 'Employee Relations', 'Benefits Administration', 'Training & Development', 'HR Policy'];
    case 'business_dev':
      return ['Lead Generation', 'Partnership Building', 'Market Expansion', 'Sales Strategy', 'Client Relations'];
    case 'admin':
      return ['Office Management', 'Document Management', 'Process Improvement', 'Vendor Management', 'Resource Coordination'];
    case 'customer_support':
      return ['Customer Service', 'Technical Support', 'Client Onboarding', 'Problem Resolution', 'Knowledge Base Creation'];
    default:
      return [];
  }
} 