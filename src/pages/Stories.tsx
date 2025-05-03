import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/stories/HeroSection';
import { StoriesGrid } from '../components/stories/StoriesGrid';

export const Stories: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stories = [
    {
      title: "Transforming E-commerce with AI",
      excerpt: "How we helped a leading retailer increase sales by 200% using AI-powered recommendations",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      category: "Case Study",
      author: "Sarah Johnson",
      date: "Mar 15, 2024",
      readTime: "5 min read",
      slug: "transforming-ecommerce-with-ai"
    },
    {
      title: "Building Scalable Cloud Infrastructure",
      excerpt: "A deep dive into our cloud-first approach for enterprise clients",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
      category: "Technical",
      author: "Michael Chen",
      date: "Mar 12, 2024",
      readTime: "8 min read",
      slug: "building-scalable-cloud-infrastructure"
    },
    {
      title: "The Future of Digital Marketing",
      excerpt: "Insights from our latest research on emerging marketing trends",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80",
      category: "Industry Insights",
      author: "Emma Davis",
      date: "Mar 10, 2024",
      readTime: "6 min read",
      slug: "future-of-digital-marketing"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StoriesGrid stories={stories} isRTL={isRTL} />
      </main>
      <Footer />
    </div>
  );
};