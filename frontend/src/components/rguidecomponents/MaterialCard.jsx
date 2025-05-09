import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';

const MaterialCard = ({ material, onClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onClick={() => onClick(material)}
      className="glass-card p-6 border-l-4 border-green-500 cursor-pointer hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-xl font-semibold mb-3">{material.description}</h3>
      <p className="text-gray-600 line-clamp-3">
        {material.long_description || 'Click for more details on how to recycle this item properly.'}
      </p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-green-700 font-medium">Material ID: {material.material_id}</span>
        <span className="text-green-700 hover:text-green-900 font-medium flex items-center">
          View Details <FaExternalLinkAlt className="ml-1" size={12} />
        </span>
      </div>
    </motion.div>
  );
};

export default MaterialCard;