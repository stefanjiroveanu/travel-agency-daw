import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const UnsplashContext = createContext();

export const useUnsplash = () => useContext(UnsplashContext);

export const UnsplashProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const accessKey = "WkkdtXI111lELr0-F14igFwpXEtwuPuj_GTSUk0uSuk";
        const searchTerm = "travel"; 
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: { query: searchTerm, client_id: accessKey, per_page: 20, orientation: "portrait"},
        });

        setImages(response.data.results);
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <UnsplashContext.Provider value={{ images }}>
      {children}
    </UnsplashContext.Provider>
  );
};

export const useImages = () => useContext(UnsplashContext);
