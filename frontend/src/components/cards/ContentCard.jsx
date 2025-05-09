import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaExternalLinkAlt, FaRegClock } from 'react-icons/fa';

/**
 * A reusable card component for displaying articles and other content
 * 
 * @param {Object} content - The content data
 * @param {String} content.id - Unique identifier
 * @param {String} content.title - Content title
 * @param {String} content.summary - Brief description
 * @param {String} content.category - Content category
 * @param {String} content.imageUrl - Image URL (optional)
 * @param {String} content.readTime - Reading time (optional)
 * @param {String} content.author - Author name (optional)
 * @param {String} content.url - URL to navigate to (optional)
 * @param {Number} delay - Animation delay
 */
const ContentCard = ({ content, delay = 0 }) => {
  const {
    id,
    title,
    summary,
    category = '',
    imageUrl,
    readTime,
    author,
    url 
  } = content;

  const isExternal = url && (url.startsWith('http://') || url.startsWith('https://'));
  

  const CardLink = ({ children, className = '' }) => {
    if (isExternal) {
      return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link 
        to={url || `/content/${id}`}
        className={className}
      >
        {children}
      </Link>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay || 0, duration: 0.4 }}
      className="glass-card overflow-hidden h-full flex flex-col"
    >
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <CardLink className="block h-full">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center">
              <FaBookOpen className="text-white text-4xl" />
            </div>
          )}
        </CardLink>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Category */}
        {category && (
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full mb-3">
            {category}
          </span>
        )}
        
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          <CardLink className="hover:text-primary-700 transition-colors">
            {title}
          </CardLink>
        </h3>
        
        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {summary}
        </p>
        
        {/* Meta information */}
        {(readTime || author) && (
          <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
            {readTime && (
              <span className="flex items-center">
                <FaRegClock className="mr-1" /> {readTime}
              </span>
            )}
            {author && <span>By {author}</span>}
          </div>
        )}
        
        {/* Call to action button */}
        <CardLink className={`
          mt-4 px-4 py-2 rounded-lg text-center 
          ${isExternal 
            ? 'text-primary-700 border border-primary-500 hover:bg-primary-50 flex items-center justify-center' 
            : 'btn-glass text-sm w-full'
          }
        `}>
          {isExternal 
            ? <><span>Read Article</span> <FaExternalLinkAlt className="ml-2" size={12} /></> 
            : 'Read Article'
          }
        </CardLink>
      </div>
    </motion.div>
  );
};

export default ContentCard;