import React, { useState, useEffect } from "react";
import Navbar from "../components/screen4/navbar";
import Taj from "../externals/taj.jpg";
import singapore from "../externals/singapore.jpg";
import { ReactComponent as Instagram } from "../externals/instagram.svg";
import { ReactComponent as Facebook } from "../externals/facebook.svg";
import Header from "../components/screen6/header";
import Offer from "../components/screen6/offer";
import { useGeolocation } from "../context/geolocator";
import axios from "axios";

const Screen6 = (props) => {
  const { latitude, longitude, city, country, error } = useGeolocation();
  const [places, setPlaces] = useState([]);
  const [originalPlaces, setOriginalPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDateFunction] = useState();
  const [endDate, setEndDateFunction] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/places");
        const data = await response.data;
        data.sort((offer) => (offer.tripDeal ? -1 : 1));
        setPlaces(data);
        setOriginalPlaces(data);
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setPlaces(originalPlaces);
    if (searchTerm) {
      const filteredDestinations = originalPlaces.filter((place) => {
        return place.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setPlaces(filteredDestinations);
    }
  }, [searchTerm, originalPlaces]);


  return (
    <div className="w-[100%] min-h-[100vh] overflow-auto flex flex-col items-center">
      <div className="bg-white w-full h-auto flex flex-col items-start gap-7 py-12 overflow-hidden">
        <div className="flex flex-col items-center gap-2.5 px-1 self-stretch">
          <Navbar textColor="#141B34" setSearchTerm={setSearchTerm} />
          <Header startDateFunction={setStartDateFunction} endDateFunction={setEndDateFunction}/>
        </div>

        {places.map((place, index) => (
          <Offer key={place.uuid} {...place} index={index} startDate={startDate} endDate={endDate} />
        ))}
        <div className="flex flex-col items-start gap-[54px] px-[152px] self-stretch relative">
          <div className="flex items-center gap-[491px]">
            <div className="flex flex-col items-start gap-[3px]">
              <span className="text-black font-inter font-extrabold text-[25px] leading-normal decoration-none">
                Mamut<span>Travel.</span>
              </span>
            </div>
          </div>
          <div className="flex items-end gap-[29px] z-30">
            <span className="text-black absolute top-[185px] left-[152px] z-20 font-inter text-[16px] leading-normal decoration-none">
              copyright@ mamuttravel 2023
            </span>
            <Instagram />
            <Facebook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen6;
