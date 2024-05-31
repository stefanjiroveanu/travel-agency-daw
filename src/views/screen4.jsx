import React from "react";

import { Helmet } from "react-helmet";


import "./screen4.css";
import Hero from "../components/screen4/hero";
import Locations from "../components/screen4/locations";
import Footer from "../components/screen4/footer";
import { useGeolocation } from "../context/geolocator";

const Screen4 = (props) => {
  const { latitude, longitude, city, country, error } = useGeolocation();

  return (
    <div className="screen4-container">
      <Helmet>
        <title>Mamut Agency</title>
      </Helmet>
      <div className="screen4-screen4">
        <Hero />
        <Locations/>
        <Footer />
      </div>
    </div>
  );
};

export default Screen4;
