import React, { createContext, useContext, useState, useEffect } from "react";

const GeolocationContext = createContext();

export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    country: null,
    error: null,
  });

  const getLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=proiectdwa`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLocation((prevState) => ({
        ...prevState,
        country: data.countryName,
      }));
      localStorage.setItem('coordinates', JSON.stringify({latitude: latitude, longitude: longitude, countryName: data.countryName}))
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocation((prevState) => ({ ...prevState, error }));
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prevState) => ({ ...prevState, latitude, longitude }));
          getLocation(latitude, longitude);
        },
        (error) => {
          setLocation((prevState) => ({ ...prevState, error }));
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setLocation((prevState) => ({
        ...prevState,
        error: "Geolocation is not supported by this browser.",
      }));
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <GeolocationContext.Provider value={location}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = () => useContext(GeolocationContext);
