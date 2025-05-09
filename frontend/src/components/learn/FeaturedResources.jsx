import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const FeaturedResources = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Resources</h2>
      
      <div className="glass p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">The SDGs: Our North Star</h3>
            <p className="text-gray-600 mb-6">
              The Sustainable Development Goals (SDGs) provide a shared blueprint for peace and prosperity 
              for people and the planet, now and into the future. This project focuses on SDG 11 (Sustainable 
              Cities and Communities) and SDG 13 (Climate Action), aiming to make our cities more sustainable 
              through responsible consumption and waste reduction.
            </p>
            <a 
              href="https://sdgs.un.org/goals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              Learn more about SDGs <FaExternalLinkAlt className="ml-2" />
            </a>
          </div>
          
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white p-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">Sustainable Development Goals</h3>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                  <p className="font-bold">SDG 11</p>
                  <p>Sustainable Cities and Communities</p>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
                  <p className="font-bold">SDG 13</p>
                  <p>Climate Action</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedResources;