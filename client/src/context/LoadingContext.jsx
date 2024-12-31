import { createContext, useState } from 'react';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
      {children}
    </LoadingContext.Provider>
  );
};