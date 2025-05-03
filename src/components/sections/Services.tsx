import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bot, Globe, Smartphone, Database, Palette, Brush, PenTool, Layers, Video, MessageCircle, Share2, Lightbulb, BarChart, Users, Target, Mail, X, Blocks, Cpu, Workflow, Bot as BotIcon, Mic, Zap, Settings, Wand2 } from 'lucide-react';
import clsx from 'clsx';
import { RTLIcon } from '../shared/RTLIcon';

// Types with better organization
interface ServiceItem {
  icon: JSX.Element;
  name: string;
  desc: string;
  features: string[];
  technologies: string[];
  benefits?: string[];
  useCases?: string[];
}

interface ServiceCategory {
  title: string;
  description: string;
  longDescription: string;
  items: ServiceItem[];
  icon?: JSX.Element;
  color?: string;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 }
};

// Component
export const Services: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedService, setSelectedService] = React.useState<ServiceItem | null>(null);

  // Enhanced tech services with AI focus
  const services: Record<string, ServiceCategory> = {
    tech: {
      title: "TedRed Tech",
      description: "Cutting-edge technology solutions",
      longDescription: "Empowering businesses with advanced AI, automation, and enterprise solutions",
      icon: <Wand2 className="text-red-500" />,
      color: "red",
      items: [
        {
          icon: <Cpu />,
          name: "AI & Automation",
          desc: "Intelligent automation solutions",
          features: [
            "Custom AI Agent Development",
            "Workflow Automation",
            "Process Optimization",
            "Chatbots & Virtual Assistants",
            "Intelligent Document Processing"
          ],
          technologies: [
            "OpenAI", "LangChain", "Botpress",
            "Make.com", "n8n", "Power Automate"
          ],
          useCases: [
            "Customer Service Automation",
            "Sales Process Automation",
            "Document Processing",
            "Data Analysis & Reporting"
          ]
        },
        {
          icon: <Settings />,
          name: "ERP Solutions",
          desc: "Enterprise resource planning",
          features: [
            "Business Process Management",
            "Financial Management",
            "Inventory Control",
            "HR Management",
            "Custom Module Development"
          ],
          technologies: [
            "Odoo", "ERPNext",
            "Zoho One", "SAP Business One",
            "Microsoft Dynamics"
          ],
          useCases: [
            "Manufacturing",
            "Retail & E-commerce",
            "Professional Services",
            "Distribution & Logistics"
          ]
        },
        {
          icon: <Blocks />,
          name: "No-Code Development",
          desc: "Rapid application development",
          features: [
            "Visual App Development",
            "Database Design",
            "Workflow Automation", 
            "API Integration",
            "Custom Plugins"
          ],
          technologies: [
            "Bubble.io", "Webflow",
            "Airtable", "Adalo",
            "FlutterFlow"
          ]
        },
        {
          icon: <Globe />,
          name: "Web Development",
          desc: "Custom web applications",
          features: [
            "Full-stack Development",
            "Progressive Web Apps",
            "E-commerce Solutions",
            "CMS Development",
            "API Integration"
          ],
          technologies: [
            "React", "Node.js",
            "Python", "MongoDB",
            "AWS"
          ]
        },
        {
          icon: <Smartphone />,
          name: "Mobile Apps",
          desc: "Native and cross-platform apps",
          features: [
            "iOS Development",
            "Android Development",
            "Cross-platform Solutions",
            "App Store Optimization",
            "Mobile UI/UX Design"
          ],
          technologies: [
            "React Native", "Flutter",
            "Swift", "Kotlin",
            "Firebase"
          ]
        },
        {
          icon: <Database />,
          name: "Cloud Solutions",
          desc: "Scalable cloud infrastructure",
          features: [
            "Cloud Migration",
            "Serverless Architecture",
            "DevOps Implementation",
            "Microservices",
            "Cloud Security"
          ],
          technologies: [
            "AWS", "Azure",
            "Google Cloud", "Docker",
            "Kubernetes"
          ]
        }
      ]
    },
    design: {
      title: "TedRed Design",
      description: "Creative design solutions",
      longDescription: "We create stunning visual experiences that captivate audiences and strengthen brand identity through innovative design solutions.",
      items: [
        {
          icon: <Palette />,
          name: "UI/UX Design",
          desc: "User-centered design solutions",
          features: [
            "User Research & Analysis",
            "Wireframing & Prototyping",
            "Interaction Design",
            "Usability Testing",
            "Design Systems"
          ],
          technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"]
        },
        {
          icon: <Brush />,
          name: "Brand Identity",
          desc: "Comprehensive branding",
          features: [
            "Logo Design",
            "Brand Guidelines",
            "Visual Identity",
            "Brand Strategy",
            "Marketing Collateral"
          ],
          technologies: ["Adobe Creative Suite", "Illustrator", "Photoshop", "After Effects", "InDesign"]
        },
        {
          icon: <PenTool />,
          name: "Graphic Design",
          desc: "Visual content creation",
          features: [
            "Print Design",
            "Digital Graphics",
            "Illustration",
            "Packaging Design",
            "Infographic Design"
          ],
          technologies: ["Illustrator", "Photoshop", "Procreate", "Affinity Designer", "CorelDRAW"]
        },
        {
          icon: <Layers />,
          name: "Motion Design",
          desc: "Animated content",
          features: [
            "2D Animation",
            "Motion Graphics",
            "Video Effects",
            "Character Animation",
            "Animated Logos"
          ],
          technologies: ["After Effects", "Cinema 4D", "Premiere Pro", "Blender", "DaVinci Resolve"]
        }
      ]
    },
    media: {
      title: "TedRed Media",
      description: "Engaging media content",
      longDescription: "We create compelling media content that engages audiences and drives meaningful connections across all digital platforms.",
      items: [
        {
          icon: <Video />,
          name: "Video Production",
          desc: "Professional video content",
          features: [
            "Commercial Production",
            "Corporate Videos",
            "Product Showcases",
            "Event Coverage",
            "Aerial Videography"
          ],
          technologies: ["Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "RED Cameras", "DJI Drones"]
        },
        {
          icon: <MessageCircle />,
          name: "Social Media",
          desc: "Social media management",
          features: [
            "Content Strategy",
            "Community Management",
            "Social Analytics",
            "Influencer Partnerships",
            "Campaign Management"
          ],
          technologies: ["Hootsuite", "Buffer", "Sprout Social", "Later", "Canva"]
        },
        {
          icon: <Share2 />,
          name: "Content Creation",
          desc: "Digital content strategy",
          features: [
            "Blog Writing",
            "Copywriting",
            "Content Planning",
            "SEO Content",
            "Technical Writing"
          ],
          technologies: ["WordPress", "Contentful", "Grammarly", "SEMrush", "Yoast SEO"]
        },
        {
          icon: <Lightbulb />,
          name: "Creative Strategy",
          desc: "Strategic planning",
          features: [
            "Brand Storytelling",
            "Campaign Planning",
            "Market Analysis",
            "Audience Research",
            "Performance Tracking"
          ],
          technologies: ["Google Analytics", "Tableau", "Asana", "Miro", "Monday.com"]
        }
      ]
    },
    marketing: {
      title: "TedRed Marketing",
      description: "Results-driven marketing",
      longDescription: "We deliver data-driven marketing strategies that increase visibility, engage customers, and drive sustainable business growth.",
      items: [
        {
          icon: <BarChart />,
          name: "Digital Marketing",
          desc: "Online marketing campaigns",
          features: [
            "PPC Advertising",
            "Social Media Marketing",
            "Content Marketing",
            "Display Advertising",
            "Conversion Optimization"
          ],
          technologies: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "HubSpot", "Mailchimp"]
        },
        {
          icon: <Users />,
          name: "Market Research",
          desc: "Data-driven insights",
          features: [
            "Market Analysis",
            "Competitor Research",
            "Consumer Behavior",
            "Trend Analysis",
            "Brand Positioning"
          ],
          technologies: ["SurveyMonkey", "Qualtrics", "Google Analytics", "SEMrush", "Ahrefs"]
        },
        {
          icon: <Target />,
          name: "SEO",
          desc: "Search engine optimization",
          features: [
            "Technical SEO",
            "On-page Optimization",
            "Link Building",
            "Local SEO",
            "Content Strategy"
          ],
          technologies: ["SEMrush", "Ahrefs", "Moz", "Screaming Frog", "Google Search Console"]
        },
        {
          icon: <Mail />,
          name: "Email Marketing",
          desc: "Email campaign management",
          features: [
            "Campaign Strategy",
            "Email Automation",
            "List Management",
            "A/B Testing",
            "Performance Analytics"
          ],
          technologies: ["Mailchimp", "Klaviyo", "SendGrid", "ActiveCampaign", "Constant Contact"]
        }
      ]
    }
  };

  // Styles
  const sectionStyles = "py-16 sm:py-24 md:py-32 bg-black overflow-hidden";
  const containerStyles = "container mx-auto px-4 sm:px-6 lg:px-8";
  const headerStyles = "text-center mb-12 sm:mb-16 md:mb-20";
  const badgeStyles = "inline-block px-4 py-2 rounded-full bg-red-600/10 text-red-500 font-semibold text-sm mb-6";
  const titleStyles = "text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6";
  const subtitleStyles = "text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4";
  const gridStyles = clsx(
    "grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8",
    isRTL && 'md:grid-flow-row-reverse'
  );
  const cardStyles = clsx(
    "bg-zinc-900/50 p-6 sm:p-8 rounded-xl border border-zinc-800",
    "hover:border-red-500/30 transition-all duration-300 cursor-pointer",
    "transform hover:-translate-y-2",
    isRTL && 'md:grid-flow-row-reverse'
  );

  const serviceGridStyles = clsx(
    "grid grid-cols-2 gap-4",
    isRTL && 'flex-row-reverse text-right'
  );

  // Modal Styles
  const modalOverlayStyles = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80";
  const modalContentStyles = clsx(
    "bg-zinc-900 rounded-2xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto",
    isRTL && "rtl"
  );

  return (
    <section id="services" className={sectionStyles}>
      <div className={containerStyles}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={headerStyles}
        >
          <motion.span
            className={badgeStyles}
            whileHover={{ scale: 1.05 }}
          >
            Our Services
          </motion.span>
          <h2 className={titleStyles}>
            Comprehensive Solutions
          </h2>
          <p className={subtitleStyles}>
            Transform your business with our integrated services
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className={gridStyles}>
          {Object.entries(services).map(([key, service], index) => (
            <motion.div
              key={key}
              className={cardStyles}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCategory(key)}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{service.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-6">{service.description}</p>
              
              <div className={serviceGridStyles}>
                {service.items.slice(0, 4).map((item, i) => (
                  <motion.div
                    key={i}
                    className="p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
                  >
                    <RTLIcon className="text-red-500 flex-shrink-0 mb-2">
                      {item.icon}
                    </RTLIcon>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{item.name}</span>
                      <span className="text-gray-400 text-xs">{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className={clsx(
                  "mt-6 text-red-500 flex items-center text-sm sm:text-base",
                  "hover:text-red-400 transition-colors",
                  isRTL ? "flex-row-reverse" : "flex-row"
                )}
                whileHover={{ x: isRTL ? -10 : 10 }}
              >
                Learn More 
                <RTLIcon className={clsx("h-4 w-4", isRTL ? "mr-2" : "ml-2")}>
                  {isRTL ? "←" : "→"}
                </RTLIcon>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={modalOverlayStyles}
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={modalContentStyles}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {services[selectedCategory].title}
                  </h3>
                  <p className="text-gray-400">
                    {services[selectedCategory].longDescription}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {services[selectedCategory].items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-zinc-800/50 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 text-red-500">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-300 mb-2">
                        Key Features
                      </h5>
                      <ul className="space-y-2">
                        {item.features?.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="text-sm font-semibold text-gray-300 mb-2">
                        Technologies
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <a
                  href="#contact"
                  onClick={() => setSelectedCategory(null)}
                  className="block w-full py-3 px-6 bg-red-500 hover:bg-red-600 text-white text-center font-semibold rounded-lg transition-colors"
                >
                  Get Started with {services[selectedCategory].title}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};