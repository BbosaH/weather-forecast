import React from "react";
import "../styles/WeatherCard/WeatherCard.css";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import "../styles/weather-icons.min.css";
import Proptypes from "prop-types";
/**
 * Component to display weather forecast card
 * stateless component
 * @param {object} param0
 */
const WeatherCard = ({
  cityName,
  today,
  day,
  low_temp,
  high_temp,
  weather_description,
  weather_icon
}) => {
  return (
    <div className="weather-card">
      <div className="image" />
      <div className="content">
        <span className="day-of-week">{today ? "Today" : day}</span>
        <button className="city-badge">{cityName}</button>
        <span className="country">United States</span>
        <div className="temp-content">
          <span className="temp">
            <FaArrowCircleUp /> <span>{high_temp}°</span>
          </span>
        </div>
        <div className="temp-content low">
          <span className="temp">
            <FaArrowCircleDown /> <span>{low_temp}°</span>
          </span>
        </div>
        <div className="weather-content">
          <i className={"wi " + weather_icon} />{" "}
          <span>{weather_description}</span>
        </div>
      </div>
    </div>
  );
};
WeatherCard.proptypes = {
  city: Proptypes.object.isRequired,
  today: Proptypes.bool.isRequired,
  day: Proptypes.string.isRequired,
  low_temp: Proptypes.number.isRequired,
  high_temp: Proptypes.number.isRequired,
  weather_description: Proptypes.string.isRequired,
  weather_icon: Proptypes.string.isRequired
};
export default WeatherCard;
