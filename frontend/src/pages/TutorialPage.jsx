import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaRegClock, 
  FaRegUser, 
  FaRegCalendarAlt,
  FaExclamationTriangle,
  FaYoutube,
  FaCheckCircle
} from 'react-icons/fa';
import { tutorialService } from '../services/api';

// Helper function to convert YouTube URLs to embed format
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  
  // Handle various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

const TutorialPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState(null);
  
  // Load tutorial data when id changes
  useEffect(() => {
    const fetchTutorialData = async () => {
      if (!id) {
        setError('Tutorial ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        console.log(`Fetching tutorial with ID: ${id}`);
        setIsLoading(true);
        const data = await tutorialService.getTutorialById(id);
        
        if (!data) {
          console.error('No tutorial data returned from API');
          setError('Tutorial not found. It may have been removed or is unavailable.');
          setIsLoading(false);
          return;
        }
        
        console.log('Tutorial data received:', data);
        setTutorial(data);
        
        // Process YouTube URL if present
        if (data.videoUrl && data.videoUrl.trim() !== '') {
          const embedUrl = getYouTubeEmbedUrl(data.videoUrl);
          console.log('YouTube embed URL generated:', embedUrl);
          setYoutubeEmbedUrl(embedUrl);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching tutorial:', err);
        setError('Failed to load tutorial. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTutorialData();
  }, [id]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-700"></div>
      </div>
    );
  }
  
  // Show error state
  if (error || !tutorial) {
    return (
      <div className="pt-24 pb-16 section-container">
        <div className="glass p-8 rounded-xl text-center">
          <FaExclamationTriangle className="text-amber-500 text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-700 mb-6">{error || 'Tutorial not found'}</p>
          <Link to="/tutorials">
            <button className="btn-primary">Return to Tutorials</button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        {/* Back Button */}
        <Link to="/tutorials" className="inline-flex items-center text-green-700 hover:text-green-900 mb-6 transition-colors duration-300">
          <FaArrowLeft className="mr-2" /> Back to Tutorials
        </Link>
        
        {/* Tutorial Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10">
          {/* Tutorial Image */}
          <div className="h-80 bg-gradient-to-r from-green-700 to-green-900 flex items-center justify-center relative">
            {tutorial.imageUrl ? (
              <img src={tutorial.imageUrl} alt={tutorial.title} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-white">
                <p className="text-2xl font-medium">{tutorial.title}</p>
                <p className="text-sm opacity-70">{tutorial.category}</p>
              </div>
            )}
          </div>
          
          {/* Tutorial Info */}
          <div className="p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {tutorial.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                tutorial.difficulty === 'Beginner' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : tutorial.difficulty === 'Intermediate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                {tutorial.difficulty}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{tutorial.title}</h1>
            
            <p className="text-lg text-gray-700 mb-6">{tutorial.description}</p>
            
            <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <FaRegClock className="mr-2 text-green-600" />
                <span>{tutorial.timeRequired || 'Not specified'}</span>
              </div>
              <div className="flex items-center">
                <FaRegUser className="mr-2 text-green-600" />
                <span>By {tutorial.createdBy}</span>
              </div>
              <div className="flex items-center">
                <FaRegCalendarAlt className="mr-2 text-green-600" />
                <span>{new Date(tutorial.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tutorial Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Video Section - Only show if YouTube embed URL exists */}
            {youtubeEmbedUrl ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FaYoutube className="text-red-600 mr-2" />
                  Video Tutorial
                </h2>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe 
                    src={youtubeEmbedUrl} 
                    title={tutorial.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            ) : tutorial.videoUrl && tutorial.videoUrl.trim() !== '' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h2 className="text-2xl font-bold mb-4">Video Issue</h2>
                <p className="text-amber-600">
                  We couldn't embed the video. Please check the URL format or view it directly:
                </p>
                <a 
                  href={tutorial.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline block mt-2"
                >
                  Open Video Link
                </a>
              </motion.div>
            ) : null}
            
            {/* Action Steps Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-6 bg-gradient-to-r from-blue-50 to-green-50"
            >
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <div className="flex flex-col gap-4 mt-3">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mr-3">1</span>
                  <span className="font-medium">Gather all materials listed below</span>
                </div>
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mr-3">2</span>
                  <span className="font-medium">Follow the step-by-step instructions</span>
                </div>
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mr-3">3</span>
                  <span className="font-medium">Share your creation with #TrashToTreasure</span>
                </div>
              </div>
            </motion.div>
            
            {/* Steps Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-2xl font-bold mb-6">Instructions</h2>
              {tutorial.steps && tutorial.steps.length > 0 ? (
                <ol className="space-y-8">
                  {tutorial.steps.map((step, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="text-lg mb-3">{step.instruction}</p>
                        {step.imageUrl && (
                          <div className="mt-2 rounded-lg overflow-hidden">
                            <img src={step.imageUrl} alt={`Step ${index + 1}`} className="w-full" />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-600">No steps provided for this tutorial.</p>
              )}
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Materials */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-bold mb-4">Materials Needed</h2>
              {tutorial.materials && tutorial.materials.length > 0 ? (
                <ul className="space-y-3">
                  {tutorial.materials.map((material, index) => (
                    <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-800 flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" /> 
                        {material.name}
                      </span>
                      <span className="text-gray-600 text-sm">{material.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No materials specified for this tutorial.</p>
              )}
            </motion.div>
            
            {/* Time Estimate */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-xl font-bold mb-4">Time Estimate</h2>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <FaRegClock className="text-indigo-700 text-xl" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{tutorial.timeRequired || 'Not specified'}</p>
                  <p className="text-sm text-gray-600">Estimated completion time</p>
                </div>
              </div>
            </motion.div>
            
            {/* Sustainability Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 bg-gradient-to-br from-green-50 to-lime-50"
            >
              <h2 className="text-xl font-bold mb-4">Sustainability Impact</h2>
              <div className="space-y-3 text-gray-700">
                {tutorial.environmentalImpact ? (
                  <p>{tutorial.environmentalImpact}</p>
                ) : (
                  <>
                    <p className="flex items-start">
                      <span className="w-5 h-5 flex-shrink-0 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5">✓</span>
                      Reduces waste by reusing materials
                    </p>
                    <p className="flex items-start">
                      <span className="w-5 h-5 flex-shrink-0 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5">✓</span>
                      Uses eco-friendly techniques
                    </p>
                    <p className="flex items-start">
                      <span className="w-5 h-5 flex-shrink-0 rounded-full bg-green-100 text-green-700 flex items-center justify-center mr-2 mt-0.5">✓</span>
                      Saves money on buying new items
                    </p>
                  </>
                )}
              </div>
            </motion.div>
            
            {/* Tools Required - Only show if tools are specified */}
            {tutorial.toolsRequired && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 mt-6"
              >
                <h2 className="text-xl font-bold mb-4">Tools Required</h2>
                <p className="text-gray-700">
                  {tutorial.toolsRequired}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;