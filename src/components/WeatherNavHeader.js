import React from "react";
import img from "../img/weather.png";
import "../styles/WeatherNavHeader/WeatherNavHeader.css";

/**Component to Render Header Nav bar of application
 *Stateless component
 */
const WeatherNavHeader = () => {
  return (
    <header className="header">
      <div>
        <img src={img} className="header-img" />
        <span className="header-title">Super Weather forecast </span>
      </div>
    </header>
  );
};

export default WeatherNavHeader;
