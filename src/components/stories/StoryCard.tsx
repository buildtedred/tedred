import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { RTLIcon } from '../shared/RTLIcon';

interface StoryCardProps {
  story: {
    title: string;
    excerpt: string;
    image: string;
    category: string;
    author: string;
    readTime: string;
    slug: string;
  };
  index: number;
  isRTL: boolean;
}

export const StoryCard = ({ story, index, isRTL }: StoryCardProps) => {
  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-4 left-4 px-3 py-1 bg-red-500 rounded-full text-sm font-medium">
          {story.category}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {story.author}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {story.readTime}
          </div>
        </div>

        <h2 className="text-2xl font-bold hover:text-red-500 transition-colors">
          {story.title}
        </h2>

        <p className="text-gray-400">
          {story.excerpt}
        </p>

        <motion.a
          href={`/stories/${story.slug}`}
          className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
          whileHover={{ x: isRTL ? -10 : 10 }}
        >
          Read More
          <RTLIcon>
            <ArrowRight className="h-4 w-4" />
          </RTLIcon>
        </motion.a>
      </div>
    </motion.article>
  );
}; 