import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSearch, FaSortAmountDown, FaSortAmountUp, FaTimes } from 'react-icons/fa';
import TutorialCard from '../components/cards/TutorialCard';
import { useTutorials } from '../context/TutorialContext';

const UpcyclingTutorialsPage = () => {
  const { tutorials, isLoading, error, savedTutorials, toggleSavedTutorial } = useTutorials();
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    difficulty: [],
    duration: []
  });
  const [sortOrder, setSortOrder] = useState('newest');

  const availableCategories = [...new Set(tutorials.map(t => t.category))];
  const availableDifficulties = [...new Set(tutorials.map(t => t.difficulty))];
  

  const durationRanges = [
    { id: 'quick', label: 'Quick (< 30 min)', check: (t) => {
      const timeStr = t.timeRequired || '';
      const minutes = parseInt(timeStr.match(/\d+/)?.[0] || '0');
      return minutes < 30;
    }},
    { id: 'medium', label: 'Medium (30-60 min)', check: (t) => {
      const timeStr = t.timeRequired || '';
      const minutes = parseInt(timeStr.match(/\d+/)?.[0] || '0');
      return minutes >= 30 && minutes <= 60;
    }},
    { id: 'long', label: 'Long (> 60 min)', check: (t) => {
      const timeStr = t.timeRequired || '';
      const minutes = parseInt(timeStr.match(/\d+/)?.[0] || '0');
      return minutes > 60;
    }}
  ];

  useEffect(() => {
    if (isLoading) return;
    
    let result = [...tutorials];
    
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(lowercaseSearch) || 
        t.description.toLowerCase().includes(lowercaseSearch)
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter(t => filters.categories.includes(t.category));
    }
    

    if (filters.difficulty.length > 0) {
      result = result.filter(t => filters.difficulty.includes(t.difficulty));
    }

    if (filters.duration.length > 0) {
      result = result.filter(t => {
        return filters.duration.some(durId => {
          const durRange = durationRanges.find(d => d.id === durId);
          return durRange && durRange.check(t);
        });
      });
    }
    

    result = applySorting(result, sortOrder);
    
    setFilteredTutorials(result);
  }, [tutorials, searchTerm, filters, sortOrder, isLoading]);
  
  // Sorting function
  const applySorting = (items, order) => {
    switch (order) {
      case 'newest':
        return [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return [...items].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'az':
        return [...items].sort((a, b) => a.title.localeCompare(b.title));
      case 'za':
        return [...items].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return items;
    }
  };
  
 
  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {

        return { ...prev, [type]: [...current, value] };
      } else {

        current.splice(index, 1);
        return { ...prev, [type]: current };
      }
    });
  };
  

  const clearFilters = () => {
    setFilters({
      categories: [],
      difficulty: [],
      duration: []
    });
    setSearchTerm('');
  };
  

  const activeFiltersCount = 
    filters.categories.length + 
    filters.difficulty.length + 
    filters.duration.length + 
    (searchTerm ? 1 : 0);
  
  return (
    <div className="pt-24 pb-16">
      <div className="section-container">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Upcycling Tutorials</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover creative ways to transform everyday items into beautiful and useful things.
          </p>
        </motion.div>
        
        {/* Search and Filter Controls */}
        <div className="glass p-4 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tutorials..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            {/* Filter Toggle Button */}
            <button 
              onClick={() => setFiltersVisible(!filtersVisible)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                filtersVisible 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-white border border-gray-300'
              }`}
            >
              <FaFilter className="mr-2" /> 
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            
            {/* Sort Order Dropdown */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-white border border-gray-300 px-4 py-2 pl-10 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {sortOrder === 'oldest' || sortOrder === 'za' ? <FaSortAmountUp /> : <FaSortAmountDown />}
              </div>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {filtersVisible && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-2 text-gray-700">Categories</h3>
                  <div className="space-y-2">
                    {availableCategories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => handleFilterChange('categories', category)}
                          className="rounded text-green-700 focus:ring-green-500"
                        />
                        <span className="ml-2">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Difficulty */}
                <div>
                  <h3 className="font-medium mb-2 text-gray-700">Difficulty</h3>
                  <div className="space-y-2">
                    {availableDifficulties.map(diff => (
                      <label key={diff} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(diff)}
                          onChange={() => handleFilterChange('difficulty', diff)}
                          className="rounded text-green-700 focus:ring-green-500"
                        />
                        <span className="ml-2">{diff}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Duration */}
                <div>
                  <h3 className="font-medium mb-2 text-gray-700">Duration</h3>
                  <div className="space-y-2">
                    {durationRanges.map(dur => (
                      <label key={dur.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.duration.includes(dur.id)}
                          onChange={() => handleFilterChange('duration', dur.id)}
                          className="rounded text-green-700 focus:ring-green-500"
                        />
                        <span className="ml-2">{dur.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Tools Required - New filter section */}
                <div>
                  <h3 className="font-medium mb-2 text-gray-700">Has Tools Specified</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.hasTools === true}
                        onChange={() => {
                          setFilters(prev => ({
                            ...prev,
                            hasTools: prev.hasTools === true ? undefined : true
                          }))
                        }}
                        className="rounded text-green-700 focus:ring-green-500"
                      />
                      <span className="ml-2">Show tutorials with tool lists</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Clear Filters Button */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={clearFilters}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
        
        {/* Featured Tutorials */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">DIY Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {isLoading ? (
              // Loading skeleton
              [...Array(2)].map((_, i) => (
                <div key={i} className="glass-card h-64 animate-pulse">
                  <div className="h-40 bg-gray-300"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              // Featured tutorials
              tutorials
                .filter(tutorial => tutorial.featured)
                .slice(0, 2)
                .map((tutorial, index) => (
                  <TutorialCard
                    key={tutorial.id}
                    tutorial={tutorial}
                    savedTutorials={savedTutorials}
                    toggleSaved={toggleSavedTutorial}
                    delay={0.1 * index}
                  />
                ))
            )}
          </div>
        </div>
        
        {/* Tutorial Results */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-semibold">All Tutorials</h2>
            <p className="text-gray-600">
              {filteredTutorials.length} {filteredTutorials.length === 1 ? 'result' : 'results'}
            </p>
          </div>
          
          {isLoading ? (
            // Loading skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-card h-64 animate-pulse">
                  <div className="h-40 bg-gray-300"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-primary">
                Try Again
              </button>
            </div>
          ) : filteredTutorials.length === 0 ? (
            // No results state
            <div className="text-center py-12 glass-card">
              <h3 className="text-2xl font-semibold mb-2">No tutorials found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            // Tutorial grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial, index) => (
                <TutorialCard
                  key={tutorial.id}
                  tutorial={tutorial}
                  savedTutorials={savedTutorials}
                  toggleSaved={toggleSavedTutorial}
                  delay={0.05 * (index % 6)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Newsletter Signup */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 glass p-8 rounded-xl text-center"
        >
          <h2 className="text-2xl font-semibold mb-3">Never Miss a New Tutorial</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Sign up to receive notifications when new upcycling tutorials are posted. 
            Get inspired and be part of our sustainable community.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UpcyclingTutorialsPage;