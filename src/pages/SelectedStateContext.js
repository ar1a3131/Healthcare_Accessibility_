import React, { createContext, useState, useContext } from 'react';

// Create the context
const SelectedStateContext = createContext();

// Create a provider component
export const SelectedStateProvider = ({ children }) => {
  const [selectedState, setSelectedState] = useState('');

  return (
    <SelectedStateContext.Provider value={{ selectedState, setSelectedState }}>
      {children}
    </SelectedStateContext.Provider>
  );
};

// Custom hook to use the SelectedStateContext
export const useSelectedState = () => {
  return useContext(SelectedStateContext);
};
