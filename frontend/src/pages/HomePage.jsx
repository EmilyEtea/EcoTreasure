import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaRecycle, FaLightbulb, FaArrowRight, FaGlobeAmericas, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTutorials } from '../context/TutorialContext';

import NatureLaptop from '../assets/NatureLaptop.jpg';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card p-6 border-t-4 border-green-600 h-full flex flex-col"
  >
    <div className="rounded-full bg-green-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
      <Icon className="text-green-700 text-2xl" />
    </div>
    <h3 className="text-xl font-semibold text-green-800 mb-3">{title}</h3>
    <p className="text-gray-600 flex-grow">{description}</p>
  </motion.div>
);

const TutorialPreviewCard = ({ title, category, difficulty, image, id, delay }) => {
  const getDifficultyColor = (level) => {
    const colors = {
      'Beginner': 'bg-emerald-100 text-emerald-800',
      'Intermediate': 'bg-amber-100 text-amber-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay || 0, duration: 0.5 }}
      className="glass-card overflow-hidden h-full flex flex-col"
    >
      <div className="h-48 bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
        ) : (
          <div className="text-center text-white">
            <FaRecycle className="text-4xl mb-2 mx-auto" />
            <p className="text-green-50">Tutorial Image</p>
          </div>
        )}
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
            {category}
          </span>
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-green-800">{title}</h3>
        <Link 
          to={`/tutorials/${id}`} 
          className="mt-auto text-green-700 font-medium flex items-center hover:text-green-600 transition-colors group"
        >
          View Tutorial 
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const { tutorials, isLoading } = useTutorials();
  
  // Get latest tutorials (up to 3)
  const latestTutorials = tutorials
    .slice(0, 3)
    .map(tutorial => ({
      id: tutorial._id,
      title: tutorial.title,
      category: tutorial.category,
      difficulty: tutorial.difficulty,
      image: tutorial.imageUrl
    }));

  return (
    <>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-b from-green-50 to-green-100"
      >
        {/* floating shapes */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0]
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-10 w-32 h-32 rounded-full bg-green-300 bg-opacity-20 blur-xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -8, 0]
          }} 
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-lime-300 bg-opacity-20 blur-xl"
        />
        
        <div className="section-container relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Transform Waste into
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-lime-500 block mt-2">
                    Creative Treasures
                  </span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Join our community dedicated to sustainable living through upcycling, 
                  creative reuse, and responsible recycling.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/tutorials">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary flex items-center"
                    >
                      Explore Tutorials <FaArrowRight className="ml-2" />
                    </motion.button>
                  </Link>
                  <Link to="/recycling-guide">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-glass flex items-center"
                    >
                      Recycling Guide <FaRecycle className="ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass p-3 rounded-2xl shadow-glass"
              >
                <div className="relative overflow-hidden rounded-lg aspect-video">
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={NatureLaptop} 
                      alt="Nature and sustainability" 
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = NatureLaptop;
                        e.target.parentNode.className = "bg-gradient-to-br from-green-300 to-green-600 w-full h-full rounded-lg flex items-center justify-center";
                        e.target.parentNode.innerHTML = '<div class="text-white text-center p-4"><div class="text-6xl mb-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="mx-auto"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><p class="text-xl font-medium">Sustainable Future</p><p class="mt-2">Join our community and make a difference</p></div>';
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="section-container py-20">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-green-900"
          >
            Why Upcycle with Us?
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Discover the benefits of joining our sustainable community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={FaLeaf} 
            title="Reduce Environmental Impact" 
            description="By reusing materials, you're helping reduce waste and conserve natural resources, contributing to a healthier planet for future generations."
            delay={0.2}
          />
          <FeatureCard 
            icon={FaLightbulb} 
            title="Unleash Your Creativity" 
            description="Transform ordinary items into extraordinary creations with our detailed tutorials, saving money while expressing your unique style."
            delay={0.4}
          />
          <FeatureCard 
            icon={FaRecycle} 
            title="Learn Proper Recycling" 
            description="Discover the correct ways to recycle different materials when upcycling isn't an option, maximizing your positive environmental impact."
            delay={0.6}
          />
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-gradient-to-r from-green-900 to-green-800 text-white">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-50 mb-2">Our Collective Impact</h2>
            <p className="text-green-200">Together, we're making a difference through sustainable practices</p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaRecycle />, value: '2,540', label: 'Items Upcycled' },
              { icon: <FaLeaf />, value: '12.8', label: 'Tons of Waste Diverted' },
              { icon: <FaGlobeAmericas />, value: '316', label: 'Community Members' },
              { icon: <FaTools />, value: '84', label: 'DIY Tutorials' },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-lime-300 text-2xl">{stat.icon}</span>
                </div>
                <h3 className="text-3xl font-bold text-lime-300 mb-2">{stat.value}</h3>
                <p className="text-green-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Tutorials Preview */}
      <section className="py-20 bg-green-50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-green-900 mb-2">Latest Tutorials</h2>
              <p className="text-gray-600">Get inspired with our newest upcycling projects</p>
            </motion.div>
            <Link to="/tutorials">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-green-700 font-medium mt-4 md:mt-0"
              >
                View All <FaArrowRight className="ml-2" />
              </motion.div>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={index} className="glass-card h-64 animate-pulse">
                  <div className="h-40 bg-gray-300"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : latestTutorials.length > 0 ? (
              // Real tutorials from database
              latestTutorials.map((tutorial, index) => (
                <TutorialPreviewCard 
                  key={tutorial.id}
                  id={tutorial.id}
                  title={tutorial.title}
                  category={tutorial.category}
                  difficulty={tutorial.difficulty}
                  image={tutorial.image}
                  delay={0.2 * index}
                />
              ))
            ) : (
              // Fallback content when no tutorials are available
              <div className="col-span-3 text-center py-10">
                <FaTools className="mx-auto text-3xl text-gray-400 mb-3" />
                <p className="text-gray-600">No tutorials available yet. Check back soon or <Link to="/upload" className="text-green-700 hover:underline">create one yourself!</Link></p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sustainable Living Tips */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-green-50">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-900 mb-2">Sustainable Living Tips</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple ways to reduce your environmental footprint in everyday life
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Reduce Single-Use Plastics',
                tip: 'Switch to reusable water bottles, shopping bags, and food containers to minimize plastic waste.',
                color: 'from-blue-50 to-blue-100 border-blue-200'
              },
              {
                title: 'Compost Food Scraps',
                tip: 'Turn food waste into nutrient-rich soil for your garden instead of sending it to landfill.',
                color: 'from-amber-50 to-amber-100 border-amber-200'
              },
              {
                title: 'Thrift Before Buying New',
                tip: 'Check thrift stores and online marketplaces for second-hand items before purchasing new.',
                color: 'from-green-50 to-green-100 border-green-200'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className={`bg-gradient-to-br ${item.color} p-6 rounded-xl border shadow-sm`}
              >
                <h3 className="text-xl font-semibold mb-3 text-green-900">{item.title}</h3>
                <p className="text-gray-700">{item.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass p-10 md:p-16 rounded-3xl text-center bg-gradient-to-r from-green-900 to-green-800"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Upcycling?</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join our community today and discover how you can turn trash into treasure while making a positive impact on the environment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tutorials">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary bg-lime-600 hover:bg-lime-700"
                >
                  Browse Tutorials
                </motion.button>
              </Link>
              <Link to="/upload">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-900 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Share Your Ideas
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;