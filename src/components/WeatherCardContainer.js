import React from "react";
import WeatherCard from "./WeatherCard";
import NotFound from "./NotFound";
import "../styles/WeatherCardContainer/WeatherCardContainer.css";
import Proptypes from "prop-types";

/**
 * Stateless component to display weather forecast cards. In a list format.
 * @param {object} param0
 */
const WeatherCardContainer = ({ returnedData, weatherData }) => {
  const renderData = () => {
    if (!returnedData) {
      return <NotFound />;
    }
    return weatherData.forecast_weathers
      .filter(item => {
        return !item.today;
      })
      .map(item => {
        return (
          <WeatherCard
            key={item.dt}
            cityName={weatherData.city.name}
            {...item}
          />
        );
      });
  };
  return <div className="card-container">{renderData()}</div>;
};
WeatherCardContainer.proptypes = {
  weatherData: Proptypes.object.isRequired,
  returnedData: Proptypes.bool.isRequired
};

export default WeatherCardContainer;
