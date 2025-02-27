import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Code, Palette, BarChart as ChartBar, Target } from 'lucide-react';
import { RTLIcon } from '../shared/RTLIcon';
import { Position } from '../../types/careers';
import clsx from 'clsx';

export const OpenPositions = () => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [filter, setFilter] = useState('all');

  const positions: Position[] = [
    {
      id: "swe-001",
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      icon: <Code />,
      description: "Join our engineering team to build cutting-edge solutions that transform businesses.",
      responsibilities: [
        "Design and implement scalable web applications",
        "Lead technical architecture decisions",
        "Mentor junior developers",
        "Collaborate with cross-functional teams",
        "Drive innovation and best practices"
      ],
      requirements: [
        "5+ years of full-stack development experience",
        "Strong expertise in React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/Azure/GCP)",
        "Knowledge of microservices architecture",
        "Excellent problem-solving skills"
      ],
      benefits: [
        "Competitive salary and equity",
        "Remote-first culture",
        "Health insurance",
        "Learning budget",
        "Flexible hours"
      ]
    },
    // ... other positions
  ];

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Open Positions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Find your perfect role and help us shape the future of digital transformation.
          </p>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['all', 'Engineering', 'Design', 'Marketing', 'Product'].map((dept) => (
              <motion.button
                key={dept}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  filter === dept.toLowerCase() 
                    ? "bg-red-500 text-white" 
                    : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                )}
                onClick={() => setFilter(dept.toLowerCase())}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {dept === 'all' ? 'All Departments' : dept}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Position Cards */}
        <div className="grid gap-6">
          {positions
            .filter(position => 
              filter === 'all' || position.department.toLowerCase() === filter
            )
            .map((position, index) => (
              <motion.div
                key={position.id}
                className="p-6 sm:p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700 hover:border-red-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <RTLIcon className="text-red-500">
                      {position.icon}
                    </RTLIcon>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                      <p className="text-gray-400">{position.department}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 rounded-full bg-zinc-700 text-sm">
                      {position.location}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-zinc-700 text-sm">
                      {position.type}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-zinc-700 text-sm">
                      {position.experience}
                    </span>
                    <motion.button
                      className="px-4 py-1 rounded-full bg-red-500 text-sm font-medium hover:bg-red-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPosition(position)}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Position Details Modal */}
      <AnimatePresence>
        {selectedPosition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedPosition(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal content */}
              {/* ... existing modal content ... */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}; 