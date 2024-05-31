import React, { useState, useEffect } from "react";
import Navbar from "../components/screen4/navbar";
import DashboardOffer from "../components/dashboard/dashboardoffer";
import { FiPlus } from "react-icons/fi";
import axios from "axios";

const AdminDashboard = (props) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/places");
        const data = await response.data;
        data.sort((a, b) => (a.tripDeal ? -1 : 1));
        setPlaces(data);
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchData();
  }, []); 


  const handleAddOffer = () => {
    const newOffer = {
      uuid: `temp-${Date.now()}`,
      title: "New Place",
      description: "Description of the new place.",
      location: "New Location",
      country: "New Country",
      pricePerNight: 0,
      tripDeal: 1,
      numberOfGuests: "Accommodation for up to X people",
    };
    
    setPlaces([newOffer, ...places]); 
  };

  return (
    <div className="w-[100%] min-h-[100vh] overflow-auto flex flex-col items-center relative">
      <div className="bg-white w-full h-auto flex flex-col items-start gap-7 py-12 overflow-hidden">
        <div className="flex flex-col items-center gap-2.5 px-1 self-stretch">
          <Navbar textColor="#141B34" />
        </div>
        <div className="bg-[#141B34] w-full py-8 text-center items-center justify-center text-white text-5xl border-2 cursor-pointer">
            <FiPlus className="mx-[100vh]" onClick={handleAddOffer} /> 
        </div>
        {places.map((place) => (<DashboardOffer key={place.uuid} {...place} />))}
      </div>
    </div>
  );
};

export default AdminDashboard;
