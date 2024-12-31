export const cacheData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getCachedData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };