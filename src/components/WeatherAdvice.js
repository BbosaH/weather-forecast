import React from "react";
import "../styles/WeatherAdvice/WeatherAdvice.css";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import Proptypes from "prop-types";

/*
Component to Render Words In the top part of the app on top of sunset picture
*Stateless component
*/
const Words = ({ cityName, weatherToday }) => {
  return (
    <React.Fragment>
      <div className="weather-today">
        {weatherToday.today ? "Today" : "Tommorow"} in {cityName}
      </div>
      <span>
        <i className={"wi " + weatherToday.weather_icon} />{" "}
        <div className="weather_desc">{weatherToday.weather_description}</div>
      </span>
      <div className="temp-content">
        <span className="temp">
          <FaArrowCircleUp />
          {weatherToday.high_temp || "00"}°
        </span>
      </div>
      <div className="temp-content low">
        <span className="temp">
          <FaArrowCircleDown /> {weatherToday.low_temp || "00"}°
        </span>
      </div>
    </React.Fragment>
  );
};
Words.proptypes = {
  cityName: Proptypes.string.isRequired,
  weatherToday: Proptypes.object.isRequired
};
/**
 * Component to take care of input of city name or
 * zipcode to search weather forecast.
 * Stateless component
 */
const SearchInput = ({ cityName, handleChange, handleClick }) => {
  return (
    <React.Fragment>
      <input
        type="text"
        value={cityName}
        onChange={handleChange}
        placeholder="Enter Zipcode or City name"
      />
      <button onClick={handleClick}>Get forecast</button>
    </React.Fragment>
  );
};
SearchInput.proptypes = {
  cityName: Proptypes.string.isRequired,
  handleChange: Proptypes.func.isRequired,
  handleClick: Proptypes.func.isRequired
};
/**Component to render advice on Weather tomorrow or late today
 * also contains inputs to search for weather forecast.
 * Stateless component
 *  */
const WeatherAdvice = ({
  cityName,
  weatherToday,
  weatherCity,
  handleChange,
  handleClick
}) => {
  return (
    <div className="advice-wrapper">
      <Words cityName={weatherCity.name} weatherToday={weatherToday} />
      <SearchInput
        cityName={cityName}
        handleChange={handleChange}
        handleClick={handleClick}
      />
    </div>
  );
};
WeatherAdvice.proptypes = {
  cityName: Proptypes.string.isRequired,
  weatherToday: Proptypes.object.isRequired,
  weatherCity: Proptypes.object.isRequired,
  handleChange: Proptypes.func.isRequired,
  handleClick: Proptypes.func.isRequired
};

export default WeatherAdvice;
