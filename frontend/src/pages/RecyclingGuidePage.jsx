import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { recyclingService } from '../services/api';

import SearchFilter from '../components/rguidecomponents/SearchFilter';
import MaterialCard from '../components/rguidecomponents/MaterialCard';
import RecyclingTips from '../components/rguidecomponents/RecyclingTips';
import LocationFinder from '../components/rguidecomponents/LocationFinder';
import MaterialDetailsView from '../components/rguidecomponents/MaterialDetailsView';
import FacilityDetailsView from '../components/rguidecomponents/FacilityDetailsView';

import { FALLBACK_MATERIALS, MATERIAL_CATEGORIES, FALLBACK_FACILITIES } from '../components/rguidecomponents/recyclingData';
import { FaSearch } from 'react-icons/fa';

const RecyclingGuidePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [materials, setMaterials] = useState([]);
  const [recyclingFacilities, setRecyclingFacilities] = useState([]);
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(false);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedMaterialDetails, setSelectedMaterialDetails] = useState(null);
  const [selectedLocationDetails, setSelectedLocationDetails] = useState(null);
  const [manualLocation, setManualLocation] = useState('');
  const [isLocationInputVisible, setIsLocationInputVisible] = useState(false);
  

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoadingMaterials(true);
      try {
        // Since we're no longer using Earth911 API, just use our local data
        console.log('Using local materials data');
        setMaterials(FALLBACK_MATERIALS);
      } catch (error) {
        console.error('Error setting materials:', error);
        toast.error('Failed to load materials. Using local data instead.');
        setMaterials(FALLBACK_MATERIALS);
      } finally {
        setIsLoadingMaterials(false);
      }
    };
    
    fetchMaterials();
  }, []);
  
  // Request user location
  const requestUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          fetchNearbyFacilities(location.lat, location.lng);
          toast.success('Location found! Select a material to see nearby recycling facilities.');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not get your location. Please enter your ZIP code or address instead.');
          setIsLocationInputVisible(true);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
      setIsLocationInputVisible(true);
    }
  };

  // manual location submission
  const handleManualLocationSubmit = async (e) => {
    e.preventDefault();
    
    if (!manualLocation.trim()) {
      toast.error('Please enter a ZIP code, city, or address');
      return;
    }
    
    setIsLoadingFacilities(true);
    
    try {
      // Geocode the address using Nominatim/OpenStreetMap
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(manualLocation)}`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding service error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Geocoding response:', data);
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lon);
        
        // Verify we have valid coordinates
        if (isNaN(parsedLat) || isNaN(parsedLng)) {
          throw new Error('Invalid coordinates returned from geocoding service');
        }
        
        // Set the user location with the valid coordinates
        setUserLocation({ lat: parsedLat, lng: parsedLng });
        toast.success(`Location set to: ${data[0].display_name}`);
        
        // If a material is already selected, fetch facilities for this material and location
        if (selectedMaterial) {
          fetchNearbyFacilities(parsedLat, parsedLng, selectedMaterial.material_id);
        } else {
          // Just fetch general facilities nearby
          fetchNearbyFacilities(parsedLat, parsedLng);
        }
      } else {
        toast.error('Could not find the location. Please try a different address or ZIP code.');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      toast.error('Failed to find location. Please try again with a more specific address.');
    } finally {
      setIsLoadingFacilities(false);
    }
  };
  
  // Fetch nearby facilities based on user location
  const fetchNearbyFacilities = async (latitude, longitude, materialId = null) => {
    setIsLoadingFacilities(true);
    try {
      console.log(`Fetching facilities near ${latitude}, ${longitude} for material: ${materialId || 'all materials'}`);
      
      // Prepare material IDs array for API call - though Overpass API doesn't use them the same way
      const materialIds = materialId ? [materialId] : [];
      
      // Call the API to get nearby facilities
      const locationsResult = await recyclingService.searchLocations(latitude, longitude, materialIds);
      
      // Debug the API response
      console.log('Raw locations API response:', locationsResult);
      
      // Check if we got a valid response with facilities
      if (locationsResult && Object.keys(locationsResult).length > 0) {
        try {
          // Transform object-based response into array with added properties
          const facilitiesArray = Object.keys(locationsResult).map(key => ({
            ...locationsResult[key],
            location_id: key,
            distance: `${locationsResult[key].distance.toFixed(1)} miles`
          }));
          
          console.log(`Successfully processed ${facilitiesArray.length} facilities:`, facilitiesArray);
          setRecyclingFacilities(facilitiesArray);
          
          // Show success message with count of facilities found
          if (facilitiesArray.length > 0) {
            toast.success(`Found ${facilitiesArray.length} recycling facilities near ${manualLocation || 'you'}!`);
          } else {
            // Edge case: We got a result object but it had no real facilities
            toast.info('No recycling facilities found for this location. Using sample data instead.');
            const fallbackFacilities = FALLBACK_FACILITIES(manualLocation || 'your location');
            setRecyclingFacilities(fallbackFacilities);
          }
        } catch (processingError) {
          // This catches errors in processing the API response
          console.error('Error processing facility data:', processingError);
          const fallbackFacilities = FALLBACK_FACILITIES(manualLocation || 'your location');
          setRecyclingFacilities(fallbackFacilities);
          toast.error('Error processing facility data. Using sample data instead.');
        }
      } else {
        console.log('No facilities found from API, using fallback data');
        // Use fallback data with the manual location as reference
        const fallbackFacilities = FALLBACK_FACILITIES(manualLocation || 'your location');
        setRecyclingFacilities(fallbackFacilities);
        toast.info('No recycling facilities found in this area. Using sample data instead.');
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
      // Use fallback data with error notification
      const fallbackFacilities = FALLBACK_FACILITIES(manualLocation || 'your location');
      setRecyclingFacilities(fallbackFacilities);
      toast.error(`Could not retrieve recycling facilities: ${error.message}. Using sample data instead.`);
    } finally {
      setIsLoadingFacilities(false);
    }
  };
  

  const fetchMaterialDetails = async (materialId) => {
    // Since we're no longer using Earth911 API, get material details from local data
    const fallbackMaterial = FALLBACK_MATERIALS.find(m => m.material_id === materialId);
    if (fallbackMaterial) {
      setSelectedMaterialDetails({
        description: fallbackMaterial.description,
        long_description: fallbackMaterial.long_description,
        how_to_recycle: fallbackMaterial.how_to_recycle || "Check with your local recycling program for specific guidelines."
      });
    }
  };
  

  const fetchLocationDetails = async (locationId) => {
    // For OSM locations, we already have all details from the search
    // Just use the data we already have in the recyclingFacilities array
    const facilityBasicInfo = recyclingFacilities.find(f => f.location_id === locationId);
    if (facilityBasicInfo) {
      setSelectedLocationDetails(facilityBasicInfo);
    }
  };
  
  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    fetchMaterialDetails(material.material_id);
    
    // If we have user location, fetch nearby facilities for this material
    if (userLocation) {
      fetchNearbyFacilities(userLocation.lat, userLocation.lng, material.material_id);
    }
  };
  

  const handleLocationSelect = (location) => {
    fetchLocationDetails(location.location_id);
  };

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || 
                           material.material_id.startsWith(selectedCategory) ||
                           material.material_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  

  const resetSelections = () => {
    setSelectedMaterial(null);
    setSelectedMaterialDetails(null);
    setSelectedLocationDetails(null);
  };
  
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-white">
      <div className="section-container max-w-screen-xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Recycling & Disposal Guide</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find local recycling centers, donation spots, and proper waste disposal guidelines based on your location.
          </p>
        </motion.div>
      
        {/* Main Content */}
        {selectedLocationDetails ? (
          <FacilityDetailsView 
            facility={selectedLocationDetails} 
            onBack={() => setSelectedLocationDetails(null)} 
          />
        ) : selectedMaterial ? (
          <MaterialDetailsView 
            material={selectedMaterial}
            materialDetails={selectedMaterialDetails}
            facilities={recyclingFacilities} 
            isLoading={isLoadingFacilities}
            onBack={resetSelections}
            onSelectFacility={handleLocationSelect}
            requestLocation={requestUserLocation}
            hasLocation={!!userLocation}
            manualLocation={manualLocation}
            setManualLocation={setManualLocation}
            isLocationInputVisible={isLocationInputVisible}
            setIsLocationInputVisible={setIsLocationInputVisible}
            handleManualLocationSubmit={handleManualLocationSubmit}
          />
        ) : (
          <>
            {/* Find Recycling Centers Near Me - Moved to top for better UX flow */}
            <LocationFinder 
              isLocationInputVisible={isLocationInputVisible}
              setIsLocationInputVisible={setIsLocationInputVisible}
              manualLocation={manualLocation}
              setManualLocation={setManualLocation}
              requestUserLocation={requestUserLocation}
              handleManualLocationSubmit={handleManualLocationSubmit}
              isLoadingFacilities={isLoadingFacilities}
            />

            {/* User location indicator */}
            {userLocation && (
              <div className="mb-8 text-center">
                <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <span className="flex h-3 w-3 relative mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Location set - Select a material below to find nearby recycling facilities
                </div>
              </div>
            )}
            
            {/* Search and Filter */}
            <SearchFilter 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={MATERIAL_CATEGORIES}
            />
          
            {/* Materials List */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-green-900">Recycling Materials</h2>
                <div className="text-gray-600">
                  Showing {filteredMaterials.length} of {materials.length} materials
                </div>
              </div>
              
              {isLoadingMaterials ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMaterials.map((material, index) => (
                    <MaterialCard 
                      key={material.material_id}
                      material={material}
                      onClick={handleMaterialSelect}
                      index={index}
                    />
                  ))}
                </div>
              )}
              
              {!isLoadingMaterials && filteredMaterials.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass p-16 rounded-2xl text-center bg-white bg-opacity-70"
                >
                  <FaSearch className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-2xl text-gray-500 mb-4">No materials found matching your search</p>
                  <p className="text-gray-500 mb-6">Try adjusting your search term or selecting a different category</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 font-medium"
                  >
                    Reset Search
                  </button>
                </motion.div>
              )}
            </div>
            
            {/* Recycling Tips */}
            <RecyclingTips />
          </>
        )}
      </div>
    </div>
  );
};

export default RecyclingGuidePage;