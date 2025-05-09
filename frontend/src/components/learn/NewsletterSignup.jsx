import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      // In a real app, this would be an actual API call
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="glass p-8 rounded-xl text-center"
    >
      <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Subscribe to our newsletter for the latest educational resources, upcycling tutorials, 
        and sustainability tips delivered straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg bg-white bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={status === 'loading' || status === 'success'}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`btn-primary sm:whitespace-nowrap ${status === 'loading' ? 'opacity-70' : ''}`}
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </motion.button>
        </div>
        {status === 'success' && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 mt-2"
          >
            Thank you for subscribing!
          </motion.p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </motion.div>
  );
};

export default NewsletterSignup;