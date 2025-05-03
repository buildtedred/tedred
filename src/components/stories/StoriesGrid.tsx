import { StoryCard } from './StoryCard';

interface StoriesGridProps {
  stories: Array<{
    title: string;
    excerpt: string;
    image: string;
    category: string;
    author: string;
    readTime: string;
    slug: string;
  }>;
  isRTL: boolean;
}

export const StoriesGrid = ({ stories, isRTL }: StoriesGridProps) => {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <StoryCard 
              key={index}
              story={story}
              index={index}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 