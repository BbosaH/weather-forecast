import React, { Component } from "react";
import "babel-polyfill";
import "../styles/styles.css";
import WeatherNavHeader from "./WeatherNavHeader";
import WeatherAdvice from "./WeatherAdvice";
import WeatherCardContainer from "./WeatherCardContainer";
import WeatherFooter from "./WeatherFooter";
import API, { API_AUTH_ID, ZIP_REGEX } from "../api/api";
import {
  formatDate,
  resetObject,
  processWeatherData,
  getWeatherData
} from "../utility/utility";
/**
 * Container component to manage state of Other components
 * Contains functions to retrieve and process data from Api
 * Does not take in any props.
 */
class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Brooklyn",
      zipCode: "",
      returned_data: false,
      weather_data: {
        city: {
          id: "",
          name: "",
          country: ""
        },
        forecast_weathers: [
          {
            dt: "",
            today: false,
            date: "",
            day: "",
            low_temp: "",
            high_temp: "",
            weather_description: "",
            weather_icon: ""
          }
        ]
      },
      dayarray: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      iconObj: {
        snow: "wi-day-snow",
        rain: "wi-day-rain"
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  /**
   * event handler method invoked on change of any value in search input for weather forecast
   *  */

  handleInputChange(event) {
    let val = event.target.value;
    this.setState(prevState => {
      return ZIP_REGEX.test(val)
        ? {
            zipCode: val,
            cityName: val
          }
        : {
            cityName: val,
            zipCode: ""
          };
    });
  }

  componentDidMount() {
    this.handleSearchClick();
  }
  /**
   * Method executed on click of search button to retrieve new data
   * Also called within ComponentDidMount method on start for default city data.
   */
  handleSearchClick() {
    let todayDateStr = formatDate(new Date()).toString();
    let dataObject = getWeatherData(
      API,
      this.state.zipCode,
      this.state.cityName,
      API_AUTH_ID
    );
    dataObject.then(result => {
      let processed_data = processWeatherData(
        result,
        todayDateStr,
        this.state.dayarray,
        resetObject()
      );
      if (!processed_data) {
        this.setState(prevState => {
          return {
            returned_data: false
          };
        });
      } else {
        this.setState(prevState => {
          return processed_data;
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="background" />
        <WeatherNavHeader />
        <WeatherAdvice
          cityName={this.state.cityName}
          handleChange={this.handleInputChange}
          handleClick={this.handleSearchClick}
          weatherToday={this.state.weather_data.forecast_weathers[0]}
          weatherCity={this.state.weather_data.city}
        />
        <WeatherCardContainer
          returnedData={this.state.returned_data}
          weatherData={this.state.weather_data}
        />
        <WeatherFooter />
      </React.Fragment>
    );
  }
}

export default WeatherApp;
