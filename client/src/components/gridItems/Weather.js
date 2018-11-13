import React from "react";
import ReactWeather from "react-open-weather";

const Weather = () => {
  return (
    <ReactWeather
      className="weatherWidget"
      forecast="today"
      apikey="3086a287fb514f0e839112800180304"
      // type="auto" --- Used for automatic location
      type="city"
      city="Eindhoven"
    />
  );
};

export default Weather;
