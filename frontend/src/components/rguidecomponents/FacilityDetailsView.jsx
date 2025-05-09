import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaPhone, FaMapMarkerAlt, FaGlobeAmericas, FaClock, FaExclamationCircle, FaCheck } from 'react-icons/fa';

const FacilityDetailsView = ({ facility, onBack }) => {
  
  // Format hours string if available as an object
  const formatHours = (hours) => {
    if (!hours) return null;
    
    // Handle case where hours is already a formatted string
    if (typeof hours === 'string') return hours;
    
    // Handle case where hours is an object with day keys
    if (typeof hours === 'object') {
      const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      return days
        .filter(day => hours[day])
        .map(day => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours[day]}`)
        .join(', ');
    }
    
    return null;
  };
  
  // Generate materials list from various possible API return formats
  const getMaterials = () => {
    if (facility.materials && Array.isArray(facility.materials)) {
      return facility.materials;
    }
    
    // If we have material_ids as an object with material details
    if (facility.materials_details) {
      return Object.values(facility.materials_details).map(material => material.description);
    }
    
    // If we have a list of material IDs but no details
    if (facility.material_ids && Array.isArray(facility.material_ids)) {
      return facility.material_ids.map(id => `Material ${id}`);
    }
    
    // Fallback to empty array if no materials information
    return [];
  };
  
  // Format phone number with area code if available
  const formatPhone = (phone) => {
    if (!phone) return null;
    
    // If phone already includes formatting, return as is
    if (phone.includes('(') || phone.includes('-')) return phone;
    
    // Format as (XXX) XXX-XXXX if 10 digits
    if (phone.length === 10) {
      return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`;
    }
    
    return phone;
  };
  
  // Get formatted address
  const getFormattedAddress = () => {
    if (facility.address) return facility.address;
    
    const addressParts = [];
    if (facility.street) addressParts.push(facility.street);
    if (facility.city) addressParts.push(facility.city);
    if (facility.province) addressParts.push(facility.province);
    if (facility.postal_code) addressParts.push(facility.postal_code);
    
    return addressParts.join(', ') || 'Address not available';
  };
  
  // Get the website URL
  const getWebsiteUrl = () => {
    if (!facility.url) return null;
    return facility.url.startsWith('http') ? facility.url : `http://${facility.url}`;
  };

  // Display either formatted hours or default message
  const hoursDisplay = formatHours(facility.hours) || 'Hours not specified';
  
  // Get materials list
  const materialsList = getMaterials();
  
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
          <FaArrowLeft className="mr-2" /> Back to Results
        </button>
      </div>
      
      <div className="glass-card p-8 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">{facility.name}</h2>
            <p className="text-gray-600 text-lg">{getFormattedAddress()}</p>
            {facility.distance && (
              <span className="inline-block mt-2 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                {facility.distance} away
              </span>
            )}
          </div>
          
          <div className="flex gap-3">
            {formatPhone(facility.phone) && (
              <a 
                href={`tel:${facility.phone}`} 
                className="px-4 py-2 bg-white border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
              >
                <FaPhone /> Call
              </a>
            )}
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(getFormattedAddress() || facility.name)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <FaMapMarkerAlt /> Get Directions
            </a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">Contact Information</h3>
            <div className="space-y-3 text-gray-700">
              {formatPhone(facility.phone) && (
                <p className="flex items-start">
                  <FaPhone className="text-green-700 mt-1 mr-2 flex-shrink-0" />
                  <span>{formatPhone(facility.phone)}</span>
                </p>
              )}
              {getWebsiteUrl() && (
                <p className="flex items-start">
                  <FaGlobeAmericas className="text-green-700 mt-1 mr-2 flex-shrink-0" />
                  <a 
                    href={getWebsiteUrl()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {facility.url}
                  </a>
                </p>
              )}
              <p className="flex items-start">
                <FaClock className="text-green-700 mt-1 mr-2 flex-shrink-0" />
                <span>{hoursDisplay}</span>
              </p>
              <p className="flex items-start">
                <FaMapMarkerAlt className="text-green-700 mt-1 mr-2 flex-shrink-0" />
                <span>{getFormattedAddress()}</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-green-800 mb-4">Accepted Materials</h3>
            {materialsList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {materialsList.map((material, index) => (
                  <span 
                    key={index} 
                    className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm flex items-center"
                  >
                    <FaCheck className="mr-1.5 text-xs" /> {material}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic flex items-center">
                <FaExclamationCircle className="mr-2" />
                Information about accepted materials not available.
              </p>
            )}
            
            {(facility.notes || facility.description) && (
              <div className="mt-6">
                <h4 className="font-medium text-green-800 mb-2">Notes:</h4>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-gray-700">{facility.notes || facility.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FacilityDetailsView;