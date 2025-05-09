import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { tutorialService } from '../services/api';


const TutorialContext = createContext();

export const TutorialProvider = ({ children }) => {
  const [tutorials, setTutorials] = useState([]);
  const [featuredTutorials, setFeaturedTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedTutorials, setSavedTutorials] = useState([]);
  

  const loadTutorials = async () => {
    setIsLoading(true);
    try {
      const data = await tutorialService.getAllTutorials();
      setTutorials(data || []);
      setFeaturedTutorials(data ? data.filter(t => t.featured) : []);
      setError(null);
    } catch (err) {
      console.error('Error loading tutorials:', err);
      setError('Failed to load tutorials. Please try again later.');
      toast.error('Failed to load tutorials');
      setTutorials([]);
      setFeaturedTutorials([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadSavedTutorials = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('savedTutorials') || '[]');
        setSavedTutorials(saved);
      } catch (err) {
        console.error('Error loading saved tutorials:', err);
        setSavedTutorials([]);
      }
    };
    
    loadTutorials();
    loadSavedTutorials();
  }, []);
  

  const getTutorialById = (id) => {
    return tutorials.find(tutorial => tutorial.id === id || tutorial._id === id) || null;
  };
  
  const addTutorial = async (tutorialData) => {
    try {
      const newTutorial = await tutorialService.createTutorial(tutorialData);
      setTutorials(prev => [newTutorial, ...prev]);
      if (newTutorial.featured) {
        setFeaturedTutorials(prev => [newTutorial, ...prev]);
      }
      return newTutorial;
    } catch (error) {
      console.error('Error adding tutorial:', error);
      throw error;
    }
  };

  const refreshTutorials = () => {
    loadTutorials();
  };

  const toggleSavedTutorial = (tutorialId) => {
    setSavedTutorials(prev => {
      const isCurrentlySaved = prev.includes(tutorialId);
      let newSaved;
      
      if (isCurrentlySaved) {
        newSaved = prev.filter(id => id !== tutorialId);
        toast.success('Tutorial removed from saved items');
      } else {
        newSaved = [...prev, tutorialId];
        toast.success('Tutorial saved to your collection');
      }
      
      localStorage.setItem('savedTutorials', JSON.stringify(newSaved));
      return newSaved;
    });
  };
  

  const getSavedTutorialsData = () => {
    return tutorials.filter(tutorial => savedTutorials.includes(tutorial.id || tutorial._id));
  };

  return (
    <TutorialContext.Provider value={{
      tutorials,
      featuredTutorials,
      isLoading,
      error,
      savedTutorials,
      getTutorialById,
      toggleSavedTutorial,
      getSavedTutorialsData,
      addTutorial,
      refreshTutorials
    }}>
      {children}
    </TutorialContext.Provider>
  );
};


export const useTutorials = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorials must be used within a TutorialProvider');
  }
  return context;
};

export default TutorialContext;