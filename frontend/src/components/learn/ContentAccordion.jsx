import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const ContentAccordion = ({ title, description, children, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  
  return (
    <div className="mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass p-4 flex justify-between items-center rounded-xl transition-all hover:bg-primary-50"
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-6">
          {description && <p className="text-gray-600 mb-6">{description}</p>}
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default ContentAccordion;