import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaInfoCircle, FaMapMarkerAlt, FaSearch, FaExternalLinkAlt, FaExclamationCircle, FaRecycle } from 'react-icons/fa';

const MaterialDetailsView = ({ 
  material, 
  materialDetails, 
  facilities, 
  isLoading, 
  onBack, 
  onSelectFacility, 
  requestLocation, 
  hasLocation,
  manualLocation,
  setManualLocation,
  isLocationInputVisible,
  setIsLocationInputVisible,
  handleManualLocationSubmit 
}) => {
  // Function to format facility address
  const getFacilityAddress = (facility) => {
    if (facility.address) return facility.address;
    
    const addressParts = [];
    if (facility.street) addressParts.push(facility.street);
    if (facility.city) addressParts.push(facility.city);
    if (facility.province) addressParts.push(facility.province);
    if (facility.postal_code) addressParts.push(facility.postal_code);
    
    return addressParts.join(', ') || 'Address not available';
  };

  // Format distance to have consistent display
  const getFormattedDistance = (facility) => {
    if (!facility.distance) return null;
    
    // If distance is already a string with "miles" in it, return as is
    if (typeof facility.distance === 'string' && facility.distance.includes('mile')) {
      return facility.distance;
    }
    
    // If it's a number, format it with miles
    if (typeof facility.distance === 'number') {
      return `${facility.distance.toFixed(1)} miles`;
    }
    
    // Otherwise, parse the string as a number and format
    const distance = parseFloat(facility.distance);
    if (!isNaN(distance)) {
      return `${distance.toFixed(1)} miles`;
    }
    
    return facility.distance;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Materials List
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Material Details */}
        <div className="md:col-span-2">
          <div className="glass-card p-8 rounded-xl mb-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold text-green-900">{material.description}</h2>
              <span className={`inline-flex items-center px-4 py-2 rounded-full ${material.recyclable !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} font-medium`}>
                <FaRecycle className="mr-2" /> {material.recyclable !== false ? 'Recyclable' : 'Not Recyclable'}
              </span>
            </div>
            
            <div className="prose prose-green max-w-none">
              {materialDetails ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">Description</h3>
                    <p>{materialDetails.description || material.long_description || "No detailed description available."}</p>
                  </div>
                  
                  {materialDetails.long_description && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-green-800 mb-2">Detailed Information</h3>
                      <p>{materialDetails.long_description}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-center py-6">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-700"></div>
                </div>
              )}
              
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400 mb-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">How to Recycle</h3>
                <p>{material.how_to_recycle || materialDetails?.how_to_recycle || "Empty, clean, and dry before recycling. Check with your local recycling program for specific guidelines."}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Facilities List */}
        <div className="md:col-span-1">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">Where to Recycle</h3>
            
            {!hasLocation ? (
              <div className="text-center py-6">
                <FaMapMarkerAlt className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">Share your location or enter your address to find recycling centers near you</p>
                {!isLocationInputVisible ? (
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={requestLocation}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FaMapMarkerAlt className="inline mr-2" /> Share Location
                    </button>
                    <button
                      onClick={() => setIsLocationInputVisible(true)}
                      className="px-4 py-2 bg-white border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <FaSearch className="inline mr-2" /> Enter Address
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleManualLocationSubmit} className="w-full px-4">
                    <div className="flex flex-col gap-2">
                      <input 
                        type="text"
                        placeholder="Enter ZIP code or address..."
                        value={manualLocation}
                        onChange={(e) => setManualLocation(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                      />
                      <div className="flex gap-2">
                        <button 
                          type="button"
                          onClick={() => setIsLocationInputVisible(false)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors duration-300 flex-1"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex-1"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            ) : isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-700"></div>
              </div>
            ) : facilities.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {facilities.map((facility) => (
                  <div 
                    key={facility.location_id}
                    onClick={() => onSelectFacility(facility)}
                    className="p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:shadow-md cursor-pointer transition-all duration-200"
                  >
                    <h4 className="font-semibold">{facility.name}</h4>
                    {facility.distance && (
                      <p className="text-sm text-green-700 mb-1">{getFormattedDistance(facility)}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-2">{getFacilityAddress(facility)}</p>
                    <span className="text-green-700 hover:text-green-900 text-sm font-medium flex items-center">
                      View Details <FaExternalLinkAlt className="ml-1" size={10} />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FaExclamationCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No recycling centers found for this material in your area</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MaterialDetailsView;