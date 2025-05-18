import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaRecycle, FaHeart, FaLeaf, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-50 mt-16 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center text-xl font-bold mb-4">
              <FaRecycle className="mr-2 text-lime-300" /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-green-100">
                Trash to Treasure
              </span>
            </Link>
            <p className="text-green-200 mb-4">
              Promoting sustainability through creative upcycling and responsible recycling.
               <br />
               <br />
              Developed by Emily, Max, Arkin, Bernice, and Rogi.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-green-300 hover:text-lime-300 transform hover:scale-110 transition-all duration-300">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="text-green-300 hover:text-lime-300 transform hover:scale-110 transition-all duration-300">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="text-green-300 hover:text-lime-300 transform hover:scale-110 transition-all duration-300">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="text-green-300 hover:text-lime-300 transform hover:scale-110 transition-all duration-300">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-lime-200">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-green-200 hover:text-lime-300 transition-colors flex items-center">
                  <span className="mr-2 text-xs">▸</span> Home
                </Link>
              </li>
              <li>
                <Link to="/tutorials" className="text-green-200 hover:text-lime-300 transition-colors flex items-center">
                  <span className="mr-2 text-xs">▸</span> Tutorials
                </Link>
              </li>
              <li>
                <Link to="/recycling-guide" className="text-green-200 hover:text-lime-300 transition-colors flex items-center">
                  <span className="mr-2 text-xs">▸</span> Recycling Guide
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-green-200 hover:text-lime-300 transition-colors flex items-center">
                  <span className="mr-2 text-xs">▸</span> Learn
                </Link>
              </li>
            </ul>
          </div>

          {/* SDG */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-lime-200">Sustainable Development Goals</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaGlobe className="text-lime-300 mr-2 mt-1 flex-shrink-0" />
                <span className="text-green-200">SDG 11: Sustainable Cities and Communities</span>
              </li>
              <li className="flex items-start">
                <FaLeaf className="text-lime-300 mr-2 mt-1 flex-shrink-0" />
                <span className="text-green-200">SDG 13: Climate Action</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4 text-lime-200">Join Our Newsletter</h3>
            <p className="text-green-200 mb-4">Stay updated with our latest tutorials and sustainability tips.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="p-2 rounded-l-lg bg-green-800 border border-green-700 text-green-100 focus:outline-none focus:ring-2 focus:ring-lime-300 flex-grow"
              />
              <button className="bg-lime-600 hover:bg-lime-500 transition-colors duration-300 text-white px-4 rounded-r-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-10 pt-8 text-center">
          <p className="text-green-300">
            &copy; {new Date().getFullYear()} Trash to Treasure: Upcycle & Reuse Hub. All rights reserved.
          </p>
          <p className="flex items-center justify-center mt-3 text-sm text-green-400">
            Made with <FaHeart className="text-red-400 mx-1" /> for a sustainable future
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;