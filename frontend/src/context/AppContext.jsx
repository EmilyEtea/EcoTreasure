import React, { createContext, useState } from 'react';
import { ValidationProvider } from './ValidationContext';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const [theme, setTheme] = useState('light'); 

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      <ValidationProvider>
        {children}
      </ValidationProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;