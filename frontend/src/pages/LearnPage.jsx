import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import modular components
import ArticleCard from '../components/learn/ArticleCard';
import VideoCard from '../components/learn/VideoCard';
import ContentAccordion from '../components/learn/ContentAccordion';
import NewsletterSignup from '../components/learn/NewsletterSignup';
import FeaturedResources from '../components/learn/FeaturedResources';

// Import services
import { getAllEducationalContent, EDUCATIONAL_CATEGORIES } from '../services/education/educationService';

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'articles', 'videos'
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({
    articles: [],
    videos: []
  });
  
  useEffect(() => {
    // Fetch educational content
    const fetchContent = async () => {
      try {
        setLoading(true);
        const result = await getAllEducationalContent();
        
        // Process the data to add category titles to each item
        const articlesWithCategory = result.articles.map(article => ({
          ...article,
          categoryTitle: EDUCATIONAL_CATEGORIES.find(cat => cat.id === article.category)?.title || 'Uncategorized'
        }));
        
        const videosWithCategory = result.videos.map(video => ({
          ...video,
          categoryTitle: EDUCATIONAL_CATEGORIES.find(cat => cat.id === video.category)?.title || 'Uncategorized'
        }));
        
        setContent({
          articles: articlesWithCategory,
          videos: videosWithCategory
        });
      } catch (error) {
        console.error('Failed to fetch educational content:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);
  
  // Filter content based on active tab
  const filteredContent = activeTab === 'all' 
    ? [...content.articles, ...content.videos]
    : activeTab === 'articles' 
      ? content.articles 
      : content.videos;
  
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Learn About Sustainability</h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore educational resources about upcycling, recycling, and sustainable living practices.
          </p>
        </motion.div>
        
        {/* Featured Resources component */}
        <FeaturedResources />
        
        {/* Content Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('all')}
              className={`py-3 px-6 font-medium ${
                activeTab === 'all' 
                ? 'text-primary-600 border-b-2 border-primary-500' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Resources
            </button>
            <button 
              onClick={() => setActiveTab('articles')}
              className={`py-3 px-6 font-medium ${
                activeTab === 'articles' 
                ? 'text-primary-600 border-b-2 border-primary-500' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Articles
            </button>
            <button 
              onClick={() => setActiveTab('videos')}
              className={`py-3 px-6 font-medium ${
                activeTab === 'videos' 
                ? 'text-primary-600 border-b-2 border-primary-500' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Videos
            </button>
          </div>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        )}
        
        {/* Category Accordions */}
        {!loading && EDUCATIONAL_CATEGORIES.map((category) => {
          // Filter content for this category based on active tab
          const categoryContent = filteredContent.filter(item => item.category === category.id);
          
          // Don't display empty categories
          if (categoryContent.length === 0) return null;
          
          return (
            <ContentAccordion 
              key={category.id} 
              title={category.title}
              description={category.description}
              initiallyOpen={category.id === 'basics'} // Open the first category by default
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryContent.map((item) => (
                  <motion.div
                    key={`${item.type}-${item.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.type === 'article' ? (
                      <ArticleCard article={item} />
                    ) : (
                      <VideoCard video={item} />
                    )}
                  </motion.div>
                ))}
              </div>
            </ContentAccordion>
          );
        })}
        
        {/* Newsletter Subscription */}
        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
};

export default LearnPage;