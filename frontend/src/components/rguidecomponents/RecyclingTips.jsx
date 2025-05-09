import React from 'react';
import { motion } from 'framer-motion';
import { FaRecycle } from 'react-icons/fa';

const RecyclingTips = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-16"
    >
      <div className="glass p-8 md:p-12 rounded-2xl bg-gradient-to-r from-green-50 to-lime-50">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <FaRecycle className="text-green-700 text-3xl" />
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-green-900">General Recycling Tips</h2>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white bg-opacity-50 backdrop-blur-sm p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-green-800">Clean Before Recycling</h3>
            <p className="text-gray-700">Rinse containers and remove food residue. Dirty items can contaminate entire batches of recyclables, leading to more waste rather than reuse.</p>
          </div>
          
          <div className="bg-white bg-opacity-50 backdrop-blur-sm p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-green-800">Know Your Local Rules</h3>
            <p className="text-gray-700">Recycling guidelines vary by location. Check with your local waste management authority for specific instructions on what can and cannot be recycled.</p>
          </div>
          
          <div className="bg-white bg-opacity-50 backdrop-blur-sm p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-green-800">Reduce First, Then Recycle</h3>
            <p className="text-gray-700">Remember that reducing consumption and reusing items are even better for the environment than recycling. Always prioritize reducing and reusing over recycling.</p>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="https://www.epa.gov/recycle" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors duration-300 font-medium inline-flex items-center gap-2"
          >
            Learn More About Recycling <FaRecycle />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default RecyclingTips;