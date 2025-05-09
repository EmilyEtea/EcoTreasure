import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen } from 'react-icons/fa';

const ArticleCard = ({ article }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden flex flex-col h-full"
    >
      <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center overflow-hidden">
        {article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover" 
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3";
            }}
          />
        ) : (
          <FaBookOpen className="text-white text-4xl" />
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full">
            {article.categoryTitle}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{article.summary}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
          <span>{article.readTime}</span>
          <span>By {article.author}</span>
        </div>
        <a 
          href={article.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-4 btn-glass text-sm w-full text-center block"
        >
          Read Article
        </a>
      </div>
    </motion.div>
  );
};

export default ArticleCard;