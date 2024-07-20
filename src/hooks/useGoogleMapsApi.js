import { useState, useEffect } from 'react';

const useGoogleMapsApi = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsLoaded(true);
    } else {
      const checkGoogleMaps = setInterval(() => {
        if (window.google) {
          setIsLoaded(true);
          clearInterval(checkGoogleMaps);
        }
      }, 100);
      
      return () => clearInterval(checkGoogleMaps);
    }
  }, []);

  return isLoaded;
};

export default useGoogleMapsApi;
