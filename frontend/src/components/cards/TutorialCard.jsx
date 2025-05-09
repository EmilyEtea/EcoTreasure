import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTools, FaArrowRight, FaRegClock, FaUser } from 'react-icons/fa';

/**
 * A reusable card component for displaying upcycling tutorials
 * 
 * @param {Object} tutorial - The tutorial data
 * @param {String} tutorial.id - Unique identifier
 * @param {String} tutorial.title - Tutorial title
 * @param {String} tutorial.description - Brief description
 * @param {String} tutorial.category - Tutorial category
 * @param {String} tutorial.difficulty - Difficulty level
 * @param {String} tutorial.imageUrl - Image URL
 * @param {String} tutorial.createdBy - Author name
 * @param {String} tutorial.createdAt - Creation date
 * @param {String} tutorial.timeRequired - Time required to complete
 * @param {Number} delay - Animation delay
 * @param {Boolean} compact - Whether to show compact version of the card
 */
const TutorialCard = ({ tutorial, delay = 0, compact = false }) => {
  const {
    id,
    _id,
    title,
    description,
    category = '',
    difficulty = 'Beginner',
    imageUrl,
    createdBy,
    createdAt,
    timeRequired,
    videoUrl
  } = tutorial;

  const tutorialId = _id || id;


  const getRelativeTime = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };
  
  //difficulty badge color
  const getDifficultyColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Card component
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay || 0, duration: 0.4 }}
        className="glass-card overflow-hidden flex h-24"
      >
        {/* Image Section */}
        <div className="w-24 overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
              <FaTools className="text-white text-xl" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-3 flex flex-col justify-center flex-grow">
          <h3 className="font-semibold text-base line-clamp-1 text-gray-800">{title}</h3>
          <div className="flex items-center mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            {category && (
              <span className="ml-2 text-xs text-gray-500">{category}</span>
            )}
          </div>
        </div>
        
        {/* Action */}
        <div className="flex items-center pr-3">
          <Link 
            to={`/tutorials/${tutorialId}`}
            className="p-2 rounded-full hover:bg-green-100 transition-colors"
          >
            <FaArrowRight className="text-green-700" />
          </Link>
        </div>
      </motion.div>
    );
  }

  // Standard card layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay || 0, duration: 0.4 }}
      className="glass-card overflow-hidden flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="h-48 overflow-hidden relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center">
            <FaTools className="text-white text-4xl" />
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 inline-block px-3 py-1 text-xs font-semibold bg-white/80 backdrop-blur-sm text-green-800 rounded-full">
            {category}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Difficulty */}
        <span className={`inline-block px-3 py-1 text-xs font-semibold ${getDifficultyColor(difficulty)} rounded-full mb-2 self-start`}>
          {difficulty}
        </span>
        
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
          <Link to={`/tutorials/${tutorialId}`} 
                className="hover:text-green-700 transition-colors">
            {title}
          </Link>
        </h3>
        
        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {description}
          </p>
        )}
        
        {/* Meta information */}
        <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 mt-auto">
          {createdBy && (
            <span className="flex items-center mb-1">
              <FaUser className="mr-1" /> {createdBy}
            </span>
          )}
          {timeRequired && (
            <span className="flex items-center mb-1">
              <FaRegClock className="mr-1" /> {timeRequired}
            </span>
          )}
          {createdAt && (
            <span className="flex items-center mb-1">
              {getRelativeTime(createdAt)}
            </span>
          )}
        </div>
        
        {/* Call to action button */}
        <Link to={`/tutorials/${tutorialId}`} 
              className="mt-4 px-4 py-2 rounded-lg text-center transition-all btn-glass text-sm w-full">
          View Tutorial
        </Link>
      </div>
    </motion.div>
  );
};

export default TutorialCard;