// hooks/useFetchUrls.js
import { useEffect } from 'react';
import axios from 'axios';
import useUrl from './useUrl';


const useFetchUrls = () => {
  const { setAllUrls } = useUrl();

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await axios.get("https://shortener-backend-tmnq.onrender.com/api/geturl");
        setAllUrls(res.data);  
      } catch (err) {
        console.error("Error fetching URLs:", err);
      }
    };

    fetchUrls(); 

    const interval = setInterval(fetchUrls, 3000); 
    return () => clearInterval(interval);
  }, [setAllUrls]);
};

export default useFetchUrls;
