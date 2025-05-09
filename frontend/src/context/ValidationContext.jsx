import React, { createContext, useContext, useState, useCallback } from 'react';
import * as yup from 'yup';

const ValidationContext = createContext({});

const tutorialBaseSchema = yup.object({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  description: yup.string().required('Description is required').min(20, 'Description should be at least 20 characters'),
  category: yup.string().required('Category is required'),
  difficulty: yup.string().required('Difficulty level is required'),
  timeRequired: yup.string().required('Time estimation is required'),
  createdBy: yup.string().required('Creator name is required'),
  materials: yup.array().of(
    yup.object({
      name: yup.string().required('Material name is required'),
      quantity: yup.string().required('Quantity is required')
    })
  ).min(1, 'At least one material is required'),
  steps: yup.array().of(
    yup.object({
      instruction: yup.string().required('Instruction is required'),
      imageUrl: yup.string() 
    })
  ).min(1, 'At least one step is required'),
  imageUrl: yup.string(),
  videoUrl: yup.string(),
  toolsRequired: yup.string(),
  environmentalImpact: yup.string(),
});


const basicsSchema = yup.object({
  title: tutorialBaseSchema.fields.title,
  description: tutorialBaseSchema.fields.description,
  category: tutorialBaseSchema.fields.category,
  difficulty: tutorialBaseSchema.fields.difficulty,
  timeRequired: tutorialBaseSchema.fields.timeRequired,
  createdBy: tutorialBaseSchema.fields.createdBy,
  imageUrl: tutorialBaseSchema.fields.imageUrl,
  videoUrl: tutorialBaseSchema.fields.videoUrl,
});

const materialsSchema = yup.object({
  materials: tutorialBaseSchema.fields.materials,
  toolsRequired: tutorialBaseSchema.fields.toolsRequired,
});

const stepsSchema = yup.object({
  steps: tutorialBaseSchema.fields.steps,
  environmentalImpact: tutorialBaseSchema.fields.environmentalImpact,
});

export const ValidationProvider = ({ children }) => {

  const [sectionValidated, setSectionValidated] = useState({
    basics: false,
    materials: false,
    steps: false
  });
  
  const [sectionProgress, setSectionProgress] = useState({
    basics: 0,
    materials: 0,
    steps: 0
  });


  const updateSectionProgress = useCallback((section, progress) => {
    setSectionProgress(prev => {
      if (prev[section] === progress) return prev;
      return {
        ...prev,
        [section]: progress
      };
    });
  }, []);

  const updateSectionValidity = useCallback((section, isValid) => {
    setSectionValidated(prev => {
      if (prev[section] === isValid) return prev;
      return {
        ...prev,
        [section]: isValid
      };
    });
  }, []);

  const checkSectionValidity = useCallback(async (section, values) => {
    try {
      if (section === 'basics') {
        await basicsSchema.validate({
          title: values.title,
          description: values.description,
          category: values.category,
          difficulty: values.difficulty,
          timeRequired: values.timeRequired,
          createdBy: values.createdBy,
          imageUrl: values.imageUrl,
          videoUrl: values.videoUrl,
        }, { abortEarly: false });
        return true;
      } else if (section === 'materials') {
  
        const validMaterials = values.materials.filter(
          m => m.name && m.quantity && m.name.trim() !== '' && m.quantity.trim() !== ''
        );
        return validMaterials.length > 0;
      } else if (section === 'steps') {

        const validSteps = values.steps.filter(
          s => s.instruction && s.instruction.trim() !== ''
        );
        return validSteps.length > 0;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, []);

  const calculateTotalProgress = useCallback(() => {
    const { basics, materials, steps } = sectionProgress;
    return Math.round((basics + materials + steps) / 3);
  }, [sectionProgress]);

  const getProgressColor = useCallback((percentage) => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-yellow-500';
    return 'bg-green-600';
  }, []);


  const value = {
    sectionValidated,
    sectionProgress,
    tutorialBaseSchema,
    updateSectionProgress,
    updateSectionValidity,
    checkSectionValidity,
    calculateTotalProgress,
    getProgressColor,
  };

  return <ValidationContext.Provider value={value}>{children}</ValidationContext.Provider>;
};


export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};