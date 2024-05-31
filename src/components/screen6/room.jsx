import React, { useState } from "react";

const RoomDetails = ({
  capacity,
  numberOfBeds,
  occupied,
  pricePerNight,
  reservationDates,
}) => {
  const [opacity, setOpacity] = useState(0.2);

  const changeOpacity = () => {
    if (opacity < 0.6) {
      setOpacity(0.6);
    } else {
      setOpacity(0.2);
    }
  };

  return (
    <div
      onClick={changeOpacity}
      className="max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4"
      style={{
        background: `rgba(200,86,86, ${opacity})`,
      }}
    >
      <h2 className="text-center text-lg font-semibold text-gray-900">
        Room for {capacity} people
      </h2>
      <ul className="list-disc pl-5 mt-4">
        <li className="text-gray-700">
          Number of Beds: <span className="font-medium">{numberOfBeds}</span>
        </li>
        <li className="text-gray-700">
          Capacity: <span className="font-medium">{capacity}</span>
        </li>
        <li className="text-gray-700">
          Price per Night: <span className="font-medium">{pricePerNight}</span>
        </li>
      </ul>
    </div>
  );
};

export default RoomDetails;
