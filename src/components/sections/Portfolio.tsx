import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Car, Globe, ShoppingCart, Code, 
  Zap, Shield, Users, BarChart, X, ExternalLink,
  Building, Palette, ChevronRight, Tag, ArrowUpRight,
  Briefcase, Database, Bot, Search, FileText
} from 'lucide-react';
import clsx from 'clsx';
import { RTLIcon } from '../shared/RTLIcon';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  stats: {
    value: string;
    label: string;
    trend: 'up' | 'down';
  }[];
  technologies: string[];
  timeline: string;
  challenge: string;
  solution: string;
  results: string[];
  features?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    image: string;
  };
}

export const Portfolio: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const projects: Project[] = [
    {
      id: 'alromaih-cars',
      title: 'Alromaih Cars',
      subtitle: 'Website Transformation & Scaling',
      description: 'Complete digital transformation from Webflow to Next.js custom webapp',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80',
      stats: [
        { value: '+180%', label: 'Page Load Speed', trend: 'up' },
        { value: '+150%', label: 'User Engagement', trend: 'up' },
        { value: '-60%', label: 'Bounce Rate', trend: 'down' }
      ],
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
      timeline: '4 months',
      challenge: 'Alromaih Cars needed to scale their digital presence beyond the limitations of their Webflow site while maintaining SEO rankings and improving performance.',
      solution: 'We developed a custom Next.js application with server-side rendering, dynamic routing, and optimized performance while ensuring a smooth migration from Webflow.',
      features: [
        'Server-side rendering for optimal SEO',
        'Dynamic inventory management',
        'Advanced search and filtering',
        'Real-time availability updates',
        'Multi-language support (Arabic/English)',
        'Integrated booking system'
      ],
      results: [
        'Improved page load speed by 180%',
        'Increased user engagement by 150%',
        'Reduced bounce rate by 60%',
        'Maintained SEO rankings during migration',
        'Enhanced mobile experience with PWA features'
      ]
    },
    {
      id: 'odoo-implementation',
      title: 'Enterprise ERP Implementation',
      subtitle: 'Odoo Integration & Customization',
      description: 'Comprehensive Odoo implementation with custom modules and integrations',
      category: 'Enterprise',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
      stats: [
        { value: '+200%', label: 'Process Efficiency', trend: 'up' },
        { value: '-40%', label: 'Operational Costs', trend: 'down' },
        { value: '99.9%', label: 'System Uptime', trend: 'up' }
      ],
      technologies: ['Odoo', 'Python', 'PostgreSQL', 'XML', 'JavaScript'],
      timeline: '6 months',
      challenge: 'The client needed a unified system to manage their business operations with custom requirements that off-the-shelf solutions couldn\'t address.',
      solution: 'Implemented a customized Odoo ERP system with tailored modules, workflows, and integrations specific to the client\'s business processes.',
      features: [
        'Custom module development',
        'Automated workflows',
        'Real-time reporting',
        'Integration with existing systems',
        'Mobile accessibility',
        'Advanced security features'
      ],
      results: [
        'Doubled process efficiency',
        'Reduced operational costs by 40%',
        'Achieved 99.9% system uptime',
        'Streamlined operations across departments',
        'Improved data accuracy and reporting'
      ]
    },
    {
      id: 'finance-cars',
      title: 'Finance Cars Management',
      subtitle: 'Integrated Odoo & Web Solution',
      description: 'Custom Odoo-based system for managing car financing applications',
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80',
      stats: [
        { value: '+300%', label: 'Application Processing', trend: 'up' },
        { value: '-70%', label: 'Processing Time', trend: 'down' },
        { value: '+250%', label: 'Customer Satisfaction', trend: 'up' }
      ],
      technologies: ['Odoo', 'Python', 'REST API', 'React', 'PostgreSQL'],
      timeline: '5 months',
      challenge: 'The client needed an efficient system to manage car financing applications with integration between their website and back-office operations.',
      solution: 'Developed a comprehensive solution combining Odoo\'s robust backend with a custom web interface for application processing and management.',
      features: [
        'Automated application processing',
        'Credit scoring integration',
        'Document management system',
        'Real-time status tracking',
        'Customer portal',
        'Automated notifications'
      ],
      results: [
        'Tripled application processing capacity',
        'Reduced processing time by 70%',
        'Increased customer satisfaction by 250%',
        'Improved application accuracy',
        'Enhanced compliance tracking'
      ]
    },
    {
      id: 'seo-automation',
      title: 'Dynamic SEO & Lead Management',
      subtitle: 'No-Code Automation & WhatsApp Integration',
      description: 'Comprehensive automation system for SEO and lead management using no-code tools',
      category: 'Digital Marketing',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80',
      stats: [
        { value: '+450%', label: 'Lead Conversion', trend: 'up' },
        { value: '+320%', label: 'Response Rate', trend: 'up' },
        { value: '-85%', label: 'Response Time', trend: 'down' }
      ],
      technologies: [
        'Make.com',
        'n8n',
        'WhatsApp Business API',
        'Airtable',
        'Zapier'
      ],
      timeline: '2 months',
      challenge: 'The client needed an efficient system to automate their SEO content generation and lead management process while providing instant responses through WhatsApp.',
      solution: 'Implemented a no-code automation ecosystem using Make.com and n8n, integrated with WhatsApp Business API for automated lead management and customer segmentation.',
      features: [
        'Automated content publishing workflow',
        'WhatsApp Business API integration',
        'Lead scoring and segmentation',
        'Automated response system',
        'Custom audience targeting',
        'Performance analytics dashboard'
      ],
      results: [
        'Increased lead conversion by 450%',
        'Improved response rate by 320%',
        'Reduced response time by 85%',
        'Automated 95% of routine tasks',
        'Enhanced lead qualification accuracy'
      ],
      testimonial: {
        quote: "The automation system has transformed our lead management process. We're now able to handle 5x more leads with better conversion rates.",
        author: "Sarah Martinez",
        role: "Marketing Director",
        company: "TechGrowth Inc",
        image: "https://randomuser.me/api/portraits/women/4.jpg"
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web development', label: 'Web Development' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'finance', label: 'Finance' },
    { id: 'digital marketing', label: 'Digital Marketing' }
  ];

  return (
    <section id="our-work" className="py-12 sm:py-20 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-black to-zinc-900/50" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii4wMiIvPjwvZz48L3N2Zz4=')] opacity-10" />

      <div className="container px-4 sm:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <motion.span
            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-600/10 text-red-500 font-semibold text-xs sm:text-sm mb-4 sm:mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Client Results
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Transforming Businesses
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Trackable results for clients across dozens of industries.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={clsx(
                "px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all",
                activeCategory === category.id.toLowerCase()
                  ? "bg-red-500 text-white"
                  : "bg-zinc-800/50 text-gray-400 hover:bg-zinc-700/50"
              )}
              onClick={() => setActiveCategory(category.id.toLowerCase())}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {projects
            .filter(project => 
              activeCategory === 'all' || project.category.toLowerCase() === activeCategory
            )
            .map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer relative"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Card */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900/50 border border-zinc-800 hover:border-red-500/20 transition-all duration-300">
                  <div className="p-4 sm:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400">{project.subtitle}</p>
                      </div>
                      <span className="px-3 sm:px-4 py-1 rounded-full bg-red-500/10 text-red-500 text-xs sm:text-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                      {project.stats.map((stat, i) => (
                        <div key={i} className="text-center p-2 sm:p-4 rounded-lg bg-zinc-800/50">
                          <div className={clsx(
                            "text-lg sm:text-2xl font-bold mb-1",
                            stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          )}>
                            {stat.value}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-3 py-1 rounded-full bg-zinc-800 text-xs sm:text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      className="p-2 rounded-full bg-red-500 text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-4 sm:my-8"
            >
              <div className="p-4 sm:p-8">
                {/* Modal Header */}
                <div className="flex justify-between items-start mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">{selectedProject.title}</h3>
                    <p className="text-sm sm:text-base text-gray-400">{selectedProject.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    <X className="h-4 sm:h-5 w-4 sm:w-5" />
                  </button>
                </div>

                {/* Project Details */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-6">
                    {selectedProject.stats.map((stat, i) => (
                      <div key={i} className="text-center p-3 sm:p-6 rounded-xl bg-zinc-800/50">
                        <div className={clsx(
                          "text-xl sm:text-3xl font-bold mb-1 sm:mb-2",
                          stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        )}>
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-base text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-lg sm:text-xl font-semibold">The Challenge</h4>
                      <p className="text-sm sm:text-base text-gray-400">{selectedProject.challenge}</p>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <h4 className="text-lg sm:text-xl font-semibold">Our Solution</h4>
                      <p className="text-sm sm:text-base text-gray-400">{selectedProject.solution}</p>
                    </div>
                  </div>

                  {/* Features */}
                  {selectedProject.features && (
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Key Features</h4>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {selectedProject.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-zinc-800/50"
                          >
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results */}
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Key Results</h4>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      {selectedProject.results.map((result, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-zinc-800/50"
                        >
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          <span className="text-sm sm:text-base text-gray-300">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  {selectedProject.testimonial && (
                    <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-purple-500/10 border border-red-500/20">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <img
                          src={selectedProject.testimonial.image}
                          alt={selectedProject.testimonial.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="text-center sm:text-left">
                          <p className="text-base sm:text-lg text-gray-300 italic mb-3 sm:mb-4">
                            "{selectedProject.testimonial.quote}"
                          </p>
                          <div>
                            <p className="font-semibold">{selectedProject.testimonial.author}</p>
                            <p className="text-xs sm:text-sm text-gray-400">
                              {selectedProject.testimonial.role}, {selectedProject.testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};