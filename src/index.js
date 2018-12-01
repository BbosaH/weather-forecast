import React from "react";
import ReactDOM from "react-dom";
import WeatherApp from "./components/WeatherApp";
ReactDOM.render(
  <WeatherApp
    dayarray={[
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]}
  />,
  document.getElementById("app")
);
