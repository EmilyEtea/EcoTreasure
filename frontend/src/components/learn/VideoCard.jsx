import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const VideoCard = ({ video }) => {
  const [showVideo, setShowVideo] = useState(false);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-56 bg-gradient-to-br from-secondary-100 to-secondary-300 flex items-center justify-center">
        {showVideo ? (
          <iframe
            className="w-full h-full absolute top-0 left-0"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <img 
              src={video.imageUrl}
              alt={video.title}
              className="w-full h-full object-cover absolute top-0 left-0"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center cursor-pointer"
                onClick={() => setShowVideo(true)}
              >
                <FaPlay className="text-secondary-500 ml-1" size={20} />
              </motion.div>
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-secondary-100 text-secondary-700 rounded-full">
            {video.categoryTitle}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{video.summary}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-auto">
          <span>{video.duration}</span>
          <span>By {video.creator}</span>
        </div>
        {!showVideo && (
          <button 
            onClick={() => setShowVideo(true)}
            className="mt-4 btn-glass text-sm w-full"
          >
            Watch Video
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default VideoCard;