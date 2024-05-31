import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TripDeals = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/places");
        const data = await response.data;
        setPlaces(data);
      } catch (error) {
        console.error("Failed to fetch places:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <span
        style={{
          color: "rgba(30, 30, 30, 1)",
          height: "auto",
          textAlign: "left",
          lineHeight: "normal",
          fontFamily: "Inter",
          fontSize: 10,
          fontStretch: "normal",
          fontStyle: "Bold",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        <span>Trip Deals:</span>
      </span>
      <div>
        {places.map((place) => (
          <span key={place.uuid}>
            <Link to="/destinations" className="screen4-destination-text">
              {place.title}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};
export default TripDeals;
