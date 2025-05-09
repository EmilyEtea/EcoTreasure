import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const tutorialService = {

  getAllTutorials: async () => {
    try {
      const response = await apiClient.get('/tutorials');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      throw error;
    }
  },

  getTutorialById: async (id) => {
    try {
      const response = await apiClient.get(`/tutorials/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching tutorial with id ${id}:`, error);
      throw error;
    }
  },

  createTutorial: async (tutorialData) => {
    try {
      const response = await apiClient.post('/tutorials', tutorialData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating tutorial:', error);
      throw error;
    }
  },


  updateTutorial: async (id, tutorialData) => {
    try {
      const response = await apiClient.put(`/tutorials/${id}`, tutorialData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating tutorial with id ${id}:`, error);
      throw error;
    }
  },


  deleteTutorial: async (id) => {
    try {
      await apiClient.delete(`/tutorials/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting tutorial with id ${id}:`, error);
      throw error;
    }
  }
};

const osmAPI = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  headers: {
    'User-Agent': 'EmilyEtea-RecyclingApp/1.0'
  }
});

const overpassAPI = axios.create({
  baseURL: 'https://overpass-api.de/api/interpreter',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export const recyclingService = {

  searchMaterials: async (query) => {
    try {

      return [];
    } catch (error) {
      console.error('Error searching materials:', error);
      throw error;
    }
  },

  
  getMaterialDetails: async (materialId) => {
    try {

      return null;
    } catch (error) {
      console.error('Error getting material details:', error);
      throw error;
    }
  },


  searchLocations: async (latitude, longitude, materialIds = [], maxDistance = 25, maxResults = 25) => {
    try {

      if (!latitude || !longitude) {
        console.error('Invalid location parameters:', { latitude, longitude });
        throw new Error('Valid latitude and longitude are required');
      }
      
      // Convert distance to meters for Overpass API (1 mile ≈ 1609 meters)
      const radiusInMeters = maxDistance * 1609;
      
      // Build Overpass query to find recycling facilities
      // This queries for nodes/ways with amenity=recycling, recycling_type=centre, 
      // or with recycling:* tags within the specified radius
      const overpassQuery = `
        [out:json];
        (
          node["amenity"="recycling"](around:${radiusInMeters},${latitude},${longitude});
          way["amenity"="recycling"](around:${radiusInMeters},${latitude},${longitude});
          relation["amenity"="recycling"](around:${radiusInMeters},${latitude},${longitude});
          node["recycling_type"="centre"](around:${radiusInMeters},${latitude},${longitude});
          way["recycling_type"="centre"](around:${radiusInMeters},${latitude},${longitude});
          relation["recycling_type"="centre"](around:${radiusInMeters},${latitude},${longitude});
        );
        out body;
        >;
        out skel qt;
      `;

      console.log('Searching with Overpass API query:', overpassQuery);
      
      const response = await overpassAPI.post('', `data=${encodeURIComponent(overpassQuery)}`);
      
      console.log('Overpass API response:', response.data);
      
      if (!response.data || !response.data.elements || response.data.elements.length === 0) {
        console.warn('No recycling facilities found via Overpass API');
        return {};
      }
      
   
      const result = {};
      
      response.data.elements.forEach((element, index) => {
        if (!element.tags || !element.tags.amenity || element.tags.amenity !== 'recycling') {
          return;
        }

        const distance = calculateDistance(
          latitude, 
          longitude, 
          element.lat || (element.center ? element.center.lat : 0), 
          element.lon || (element.center ? element.center.lon : 0)
        );
        

        if (distance <= maxDistance) {
          const locationId = `osm-${element.id}`;

          const materials = [];
          const materialTags = Object.keys(element.tags).filter(tag => tag.startsWith('recycling:'));
          materialTags.forEach(tag => {
            if (element.tags[tag] === 'yes') {
              materials.push(tag.replace('recycling:', ''));
            }
          });
          
          result[locationId] = {
            name: element.tags.name || `Recycling Center ${index + 1}`,
            address: element.tags.address || '',
            city: element.tags['addr:city'] || '',
            province: element.tags['addr:state'] || '',
            postal_code: element.tags['addr:postcode'] || '',
            phone: element.tags.phone || '',
            latitude: element.lat || (element.center ? element.center.lat : 0),
            longitude: element.lon || (element.center ? element.center.lon : 0),
            distance: distance,
            materials: materials,
            hours: element.tags.opening_hours || '',
            notes: element.tags.description || '',
            url: element.tags.website || ''
          };
        }
      });
      

      const sortedLocationIds = Object.keys(result)
        .sort((a, b) => result[a].distance - result[b].distance)
        .slice(0, maxResults);
      

      const finalResult = {};
      sortedLocationIds.forEach(id => {
        finalResult[id] = result[id];
      });
      
      return finalResult;
    } catch (error) {
      console.error('Error searching locations with Overpass API:', error);

      if (error.response) {
        console.error('API response data:', error.response.data);
        console.error('API response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received from API');
      }
      throw error;
    }
  },


  getLocationDetails: async (locationId) => {
    try {

      if (locationId.startsWith('osm-')) {

        return null;
      }
      return null;
    } catch (error) {
      console.error('Error getting location details:', error);
      throw error;
    }
  }
};


function calculateDistance(lat1, lon1, lat2, lon2) {

  const radLat1 = (Math.PI * lat1) / 180;
  const radLon1 = (Math.PI * lon1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLon2 = (Math.PI * lon2) / 180;
  

  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(radLat1) * Math.cos(radLat2) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  

  const R = 3958.8;
  

  return R * c;
}

export default apiClient;