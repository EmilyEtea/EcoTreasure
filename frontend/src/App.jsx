import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UpcyclingTutorialsPage from './pages/UpcyclingTutorialsPage';
import TutorialPage from './pages/TutorialPage';
import UploadTutorialPage from './pages/UploadTutorialPage';
import RecyclingGuidePage from './pages/RecyclingGuidePage';
import LearnPage from './pages/LearnPage';
import AppContextProvider from './context/AppContext';
import { TutorialProvider } from './context/TutorialContext';
import { ValidationProvider } from './context/ValidationContext';


const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <AppContextProvider>
      <TutorialProvider>
        <ValidationProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
              {/* Toast notifications */}
              <Toaster 
                position="top-center" 
                reverseOrder={false} 
                gutter={8}
                toastOptions={{
                  duration: 5000,
                  style: {
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    color: '#333',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#00b24d',
                      secondary: '#FFFFFF',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ff4b4b',
                      secondary: '#FFFFFF',
                    },
                  },
                }}
              />
              
              {/* Navigation */}
              <Navbar />
              
              {/* Main content */}
              <main className="flex-grow pb-8 pt-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tutorials" element={<UpcyclingTutorialsPage />} />
                  <Route path="/tutorials/:id" element={<TutorialPage />} /> {/* Add the new tutorial detail route */}
                  <Route path="/upload" element={<UploadTutorialPage />} />
                  <Route path="/recycling-guide" element={<RecyclingGuidePage />} />
                  <Route path="/learn" element={<LearnPage />} />
                  {/* Add additional routes as needed */}
                  <Route path="*" element={
                    <div className="container mx-auto px-4 py-20 text-center">
                      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                      <p className="text-lg text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn-primary inline-block">Return Home</a>
                    </div>
                  } />
                </Routes>
              </main>
              
              {/* Footer */}
              <Footer />
            </div>
          </Router>
        </ValidationProvider>
      </TutorialProvider>
    </AppContextProvider>
  );
}

export default App;