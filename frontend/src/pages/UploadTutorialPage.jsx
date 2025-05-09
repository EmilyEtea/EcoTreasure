import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaPlus, FaTrash, FaCamera, FaUpload, FaTimes, FaYoutube, FaClock, FaInfoCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTutorials } from '../context/TutorialContext';

// validation schema
const tutorialSchema = yup.object({
  title: yup.string().required('Title is required').max(100, 'Title must be less than 100 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  category: yup.string().required('Category is required'),
  difficulty: yup.string().required('Difficulty level is required'),
  timeRequired: yup.string().required('Time required is required'),
  createdBy: yup.string().required('Your name is required'),
  videoUrl: yup.string().url('Must be a valid URL').nullable().transform(value => value === "" ? null : value),
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
  ).min(1, 'At least one step is required')
});

const UploadTutorialPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [mainImageData, setMainImageData] = useState(null);
  const [stepImagePreviews, setStepImagePreviews] = useState({});
  const [currentSection, setCurrentSection] = useState('basics'); // 'basics', 'materials', 'steps'
  const { addTutorial } = useTutorials();
  
  // Form 
  const { register, control, handleSubmit, formState: { errors, isValid }, reset, setValue, getValues, trigger } = useForm({
    resolver: yupResolver(tutorialSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      difficulty: 'Beginner',
      timeRequired: '30-60 minutes',
      materials: [{ name: '', quantity: '' }],
      steps: [{ instruction: '', imageUrl: '' }],
      createdBy: '',
      imageUrl: '',
      videoUrl: '',
      toolsRequired: '',
      environmentalImpact: '',
    },
    mode: 'onChange'
  });
  
  // dynamic material inputs
  const { 
    fields: materialFields, 
    append: appendMaterial, 
    remove: removeMaterial 
  } = useFieldArray({
    control,
    name: 'materials'
  });
  
  // dynamic step inputs
  const { 
    fields: stepFields, 
    append: appendStep, 
    remove: removeStep 
  } = useFieldArray({
    control,
    name: 'steps'
  });

  // image upload with compression
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size validation (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Create a new FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create an image element to use for resizing
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // If image is larger than 1200x800, resize it
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 800;
          
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the resized image as data URL
          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          setMainImagePreview(resizedBase64);
          setMainImageData(resizedBase64);
          setValue('imageUrl', resizedBase64);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Step image handling with compression
  const handleStepImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      // File size validation (3MB)
      if (file.size > 3 * 1024 * 1024) {
        toast.error('Step image size should be less than 3MB');
        return;
      }

      // Create a new FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create an image element to use for resizing
        const img = new Image();
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // If image is larger than 800x600, resize it
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get the resized image as data URL
          const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          
          setStepImagePreviews(prev => ({
            ...prev,
            [index]: resizedBase64
          }));
          
          setValue(`steps.${index}.imageUrl`, resizedBase64);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove a step image
  const removeStepImage = (index) => {
    setStepImagePreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });
    
    setValue(`steps.${index}.imageUrl`, '');
  };

  // Navigation between form sections
  const goToNextSection = async (nextSection) => {
    const values = getValues();
    
    let shouldProceed = false;
    
    if (currentSection === 'basics') {
      const isValid = await trigger(['title', 'description', 'category', 'difficulty', 'timeRequired', 'createdBy']);
      shouldProceed = isValid;
    } else if (currentSection === 'materials') {
      const isValid = await trigger('materials');
      shouldProceed = isValid;
    }
    
    if (shouldProceed) {
      setCurrentSection(nextSection);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error(`Please complete all required fields in this section`);
    }
  };

  // Go back to previous section
  const goToPreviousSection = (prevSection) => {
    setCurrentSection(prevSection);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form submission
  const onSubmit = async (data) => {
    const isStepsValid = await trigger('steps');
    
    if (!isStepsValid) {
      toast.error('Please complete all required fields in the Tutorial Steps section');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Handle the main image
      if (mainImageData) {
        data.imageUrl = mainImageData;
      } else {
        toast.warning('Consider adding a main image for better visibility');
      }
      
      // Set creation date
      data.createdAt = new Date().toISOString();
      
      // Upload tutorial using the context function
      const createdTutorial = await addTutorial(data);
      
      toast.success('Tutorial uploaded successfully!');
      reset(); 
      setMainImagePreview(null);
      setMainImageData(null);
      setStepImagePreviews({});
      setCurrentSection('basics');
      
      // Navigate to the new tutorial page
      setTimeout(() => {
        navigate(`/tutorials/${createdTutorial._id}`);
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading tutorial:', error);
      toast.error(error.response?.data?.error || 'Failed to upload tutorial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress indicator calculation
  const getProgressPercentage = () => {
    switch(currentSection) {
      case 'basics': return 33;
      case 'materials': return 66;
      case 'steps': return 100;
      default: return 0;
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="section-container max-w-4xl mx-auto form-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Share Your Upcycling Idea</h1>
          <p className="text-lg text-gray-600 mb-6">
            Contribute to our community by sharing your creative upcycling tutorial.
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
            <div 
              className="bg-green-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          
          {/* Section Navigation */}
          <div className="flex mb-8 border-b overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setCurrentSection('basics')}
              className={`py-2 px-4 font-medium mr-4 border-b-2 flex items-center ${
                currentSection === 'basics' ? 'text-green-700 border-green-700' : 'text-gray-500 border-transparent'
              }`}
            >
              <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs ${
                currentSection === 'basics' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              Basic Info
            </button>
            <button
              type="button"
              onClick={() => currentSection !== 'basics' ? setCurrentSection('materials') : null}
              className={`py-2 px-4 font-medium mr-4 border-b-2 flex items-center ${
                currentSection === 'materials' ? 'text-green-700 border-green-700' : 'text-gray-500 border-transparent'
              }`}
            >
              <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs ${
                currentSection === 'materials' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              Materials
            </button>
            <button
              type="button"
              onClick={() => currentSection === 'steps' ? setCurrentSection('steps') : null}
              className={`py-2 px-4 font-medium border-b-2 flex items-center ${
                currentSection === 'steps' ? 'text-green-700 border-green-700' : 'text-gray-500 border-transparent'
              }`}
            >
              <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs ${
                currentSection === 'steps' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              Steps
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="glass p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            {currentSection === 'basics' && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-bold mr-2">1</span>
                  Basic Information
                </h2>
                
                <div className="form-group">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Tutorial Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...register('title')}
                    className={`w-full p-3 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="E.g., Mason Jar Herb Garden"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    {...register('description')}
                    className={`w-full p-3 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Describe your tutorial in detail. What will people create? What's special about it?"
                    rows={4}
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                    <select
                      id="category"
                      {...register('category')}
                      className={`w-full p-3 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select a category</option>
                      <option value="Home Decor">Home Decor</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Garden">Garden</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Tech">Tech</option>
                      <option value="Kids">Kids</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level*</label>
                    <select
                      id="difficulty"
                      {...register('difficulty')}
                      className={`w-full p-3 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.difficulty ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="Beginner">Beginner (no special skills required)</option>
                      <option value="Intermediate">Intermediate (some skills helpful)</option>
                      <option value="Advanced">Advanced (specific skills needed)</option>
                    </select>
                    {errors.difficulty && <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="form-group">
                    <label htmlFor="timeRequired" className="block text-sm font-medium text-gray-700 mb-1">
                      Time Required*
                    </label>
                    <div className="relative">
                      <select
                        id="timeRequired"
                        {...register('timeRequired')}
                        className={`w-full p-3 pl-10 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none ${errors.timeRequired ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="Under 30 minutes">Under 30 minutes</option>
                        <option value="30-60 minutes">30-60 minutes</option>
                        <option value="1-2 hours">1-2 hours</option>
                        <option value="2-4 hours">2-4 hours</option>
                        <option value="Over 4 hours">Over 4 hours</option>
                        <option value="Multiple days">Multiple days</option>
                      </select>
                      <div className="absolute left-3 top-3">
                        <FaClock className="text-gray-500" />
                      </div>
                    </div>
                    {errors.timeRequired && <p className="mt-1 text-sm text-red-600">{errors.timeRequired.message}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700 mb-1">Your Name*</label>
                    <input
                      type="text"
                      id="createdBy"
                      {...register('createdBy')}
                      className={`w-full p-3 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.createdBy ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your name or username"
                    />
                    {errors.createdBy && <p className="mt-1 text-sm text-red-600">{errors.createdBy.message}</p>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
                  <div className={`border-2 border-dashed rounded-lg p-4 text-center ${mainImagePreview ? 'border-green-300' : 'border-gray-300'}`}>
                    {mainImagePreview ? (
                      <div className="relative">
                        <img src={mainImagePreview} alt="Preview" className="max-h-60 mx-auto rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            setMainImagePreview(null);
                            setMainImageData(null);
                            setValue('imageUrl', '');
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FaTimes size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FaCamera className="mx-auto text-gray-400 text-4xl" />
                        <p className="text-gray-500">Upload a main image for your tutorial</p>
                        <p className="text-xs text-gray-400">Recommended size: 1200 x 800px, max 5MB</p>
                        <div className="relative">
                          <input
                            type="file"
                            id="mainImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <button
                            type="button"
                            className="btn-glass inline-flex items-center"
                          >
                            <FaUpload className="mr-2" /> Browse Files
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="videoUrl" className="flex items-center space-x-1 text-sm font-medium text-gray-700 mb-1">
                    <FaYoutube className="text-red-600" />
                    <span>YouTube Video URL (Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="videoUrl"
                    {...register('videoUrl')}
                    className={`w-full p-3 border rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.videoUrl ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="E.g., https://youtube.com/watch?v=..."
                  />
                  {errors.videoUrl && <p className="mt-1 text-sm text-red-600">{errors.videoUrl.message}</p>}
                  <p className="mt-1 text-xs text-gray-500">Enter the URL of a YouTube video that demonstrates your tutorial</p>
                </div>

                <div className="form-group">
                  <label htmlFor="toolsRequired" className="block text-sm font-medium text-gray-700 mb-1">Tools Required (Optional)</label>
                  <textarea
                    id="toolsRequired"
                    {...register('toolsRequired')}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="List any tools needed for this project, e.g., scissors, hot glue gun, etc."
                    rows={2}
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="environmentalImpact" className="block text-sm font-medium text-gray-700 mb-1">Environmental Impact (Optional)</label>
                  <textarea
                    id="environmentalImpact"
                    {...register('environmentalImpact')}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Describe how this project helps the environment"
                    rows={2}
                  ></textarea>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => goToNextSection('materials')}
                    className="btn-primary px-8 py-3 flex items-center"
                  >
                    Continue to Materials 
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Materials Section */}
            {currentSection === 'materials' && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-bold mr-2">2</span>
                  Materials Needed
                </h2>
                
                <div className="bg-green-50 rounded-lg p-4 mb-4 border-l-4 border-green-500">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        List all materials needed for your tutorial. Be specific about quantities and sizes.
                      </p>
                    </div>
                  </div>
                </div>
                
                {materialFields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="flex-grow grid md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Material Name*
                        </label>
                        <input
                          type="text"
                          {...register(`materials.${index}.name`)}
                          className={`w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.materials?.[index]?.name ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="E.g., Empty glass jar"
                        />
                        {errors.materials?.[index]?.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.materials[index].name.message}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity/Size*
                        </label>
                        <input
                          type="text"
                          {...register(`materials.${index}.quantity`)}
                          className={`w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.materials?.[index]?.quantity ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="E.g., 1 large (16oz)"
                        />
                        {errors.materials?.[index]?.quantity && (
                          <p className="mt-1 text-sm text-red-600">{errors.materials[index].quantity.message}</p>
                        )}
                      </div>
                    </div>
                    {materialFields.length > 1 && (
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeMaterial(index)}
                        className="mt-8 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                      >
                        <FaTrash size={16} />
                      </motion.button>
                    )}
                  </div>
                ))}
                
                <div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => appendMaterial({ name: '', quantity: '' })}
                    className="btn-glass inline-flex items-center"
                  >
                    <FaPlus className="mr-2" /> Add Material
                  </motion.button>
                </div>
                {errors.materials && !Array.isArray(errors.materials) && (
                  <p className="mt-1 text-sm text-red-600">{errors.materials.message}</p>
                )}
                
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => goToPreviousSection('basics')}
                    className="btn-glass px-8 py-3 flex items-center"
                  >
                    <FaArrowLeft className="mr-2" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => goToNextSection('steps')}
                    className="btn-primary px-8 py-3 flex items-center"
                  >
                    Continue to Steps
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Steps Section */}
            {currentSection === 'steps' && (
              <div className="space-y-5">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center font-bold mr-2">3</span>
                  Tutorial Steps
                </h2>
                
                <div className="bg-green-50 rounded-lg p-4 mb-4 border-l-4 border-green-500">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaInfoCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        Break down your tutorial into clear, easy-to-follow steps. Add an image for each step if possible.
                      </p>
                    </div>
                  </div>
                </div>
                
                {stepFields.map((field, index) => (
                  <div key={field.id} className="glass-card p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium flex items-center">
                        <span className="w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center font-bold mr-2 text-sm">
                          {index + 1}
                        </span>
                        Step {index + 1}
                      </h3>
                      {stepFields.length > 1 && (
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeStep(index)}
                          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                        >
                          <FaTrash size={16} />
                        </motion.button>
                      )}
                    </div>
                    
                    <div className="form-group mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instructions*
                      </label>
                      <textarea
                        {...register(`steps.${index}.instruction`)}
                        className={`w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.steps?.[index]?.instruction ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Describe this step in detail..."
                        rows={3}
                      ></textarea>
                      {errors.steps?.[index]?.instruction && (
                        <p className="mt-1 text-sm text-red-600">{errors.steps[index].instruction.message}</p>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Step Image (Optional)
                      </label>
                      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${stepImagePreviews[index] ? 'border-green-300' : 'border-gray-300'}`}>
                        {stepImagePreviews[index] ? (
                          <div className="relative">
                            <img src={stepImagePreviews[index]} alt={`Step ${index + 1}`} className="max-h-60 mx-auto rounded-lg" />
                            <button
                              type="button"
                              onClick={() => removeStepImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <FaTimes size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <FaCamera className="mx-auto text-gray-400 text-2xl" />
                            <p className="text-gray-500 text-sm mt-1">Upload an image for this step</p>
                            <p className="text-xs text-gray-400">Max size: 3MB</p>
                            <div className="relative mt-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleStepImageChange(e, index)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <button
                                type="button"
                                className="px-4 py-2 bg-white bg-opacity-70 text-sm border border-gray-300 rounded-lg hover:bg-opacity-100"
                              >
                                <FaUpload className="inline mr-2" /> Browse Files
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => appendStep({ instruction: '', imageUrl: '' })}
                    className="btn-glass inline-flex items-center"
                  >
                    <FaPlus className="mr-2" /> Add Step
                  </motion.button>
                </div>
                {errors.steps && !Array.isArray(errors.steps) && (
                  <p className="mt-1 text-sm text-red-600">{errors.steps.message}</p>
                )}
                
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => goToPreviousSection('materials')}
                    className="btn-glass px-8 py-3 flex items-center"
                  >
                    <FaArrowLeft className="mr-2" /> Back
                  </button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    className={`btn-primary px-8 py-3 flex items-center ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FaUpload className="mr-2" /> Publish Tutorial
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadTutorialPage;