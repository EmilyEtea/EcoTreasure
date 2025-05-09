import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaLightbulb, FaUpload, FaBookOpen, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink = ({ to, children, icon: Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  >
    <Link to={to} className="flex items-center text-green-50 hover:text-lime-300 px-3 py-2 rounded-lg transition-colors duration-300">
      {Icon && <Icon className="mr-2" />} {children}
    </Link>
  </motion.div>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-green-900/90 backdrop-blur-md shadow-lg py-2' : 'bg-green-900/70 py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center text-white">
            <FaRecycle className="mr-2 text-lime-300" /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-green-100">
              Trash to Treasure
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            <NavLink to="/" icon={FaHome}>Home</NavLink>
            <NavLink to="/tutorials" icon={FaLightbulb}>Tutorials</NavLink>
            <NavLink to="/upload" icon={FaUpload}>Upload</NavLink>
            <NavLink to="/recycling-guide" icon={FaRecycle}>Recycling Guide</NavLink>
            <NavLink to="/learn" icon={FaBookOpen}>Learn</NavLink>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-green-50 hover:text-lime-300 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-green-800/90 mt-4 rounded-lg"
            >
              <div className="flex flex-col py-4 space-y-2">
                <NavLink to="/" icon={FaHome}>Home</NavLink>
                <NavLink to="/tutorials" icon={FaLightbulb}>Tutorials</NavLink>
                <NavLink to="/upload" icon={FaUpload}>Upload</NavLink>
                <NavLink to="/recycling-guide" icon={FaRecycle}>Recycling Guide</NavLink>
                <NavLink to="/learn" icon={FaBookOpen}>Learn</NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;