import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaSearch, FaGlobeAmericas } from 'react-icons/fa';

const LocationFinder = ({
  isLocationInputVisible,
  setIsLocationInputVisible,
  manualLocation,
  setManualLocation,
  requestUserLocation,
  handleManualLocationSubmit,
  isLoadingFacilities
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mb-16"
    >
      <div className="glass p-8 md:p-12 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100">
        <div className="text-center mb-8">
          <FaGlobeAmericas className="text-4xl text-green-700 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-green-900">Find Recycling Centers Near You</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Locate nearby recycling facilities that accept specific materials. Share your location or enter your address.
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          {!isLocationInputVisible ? (
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
              <button 
                onClick={requestUserLocation} 
                className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-colors duration-300 font-medium flex items-center justify-center gap-2 flex-grow"
              >
                <FaMapMarkerAlt /> Use My Current Location
              </button>
              <button 
                onClick={() => setIsLocationInputVisible(true)} 
                className="px-8 py-4 bg-white border border-green-600 text-green-700 hover:bg-green-50 rounded-lg shadow-lg transition-colors duration-300 font-medium flex items-center justify-center gap-2 flex-grow"
              >
                <FaSearch /> Enter Location Manually
              </button>
            </div>
          ) : (
            <form onSubmit={handleManualLocationSubmit} className="w-full max-w-xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Enter ZIP code, city, or address..."
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setIsLocationInputVisible(false)}
                    className="px-4 py-4 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoadingFacilities}
                    className={`px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition-colors duration-300 font-medium flex items-center gap-2 ${isLoadingFacilities ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoadingFacilities ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>
            </form>
          )}
          
          <p className="text-sm text-gray-500 mt-4">
            We'll only use your location to find nearby recycling facilities.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationFinder;