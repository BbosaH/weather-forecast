import React, { Component } from "react";
import "babel-polyfill";
import "../styles/styles.css";
import WeatherNavHeader from "./WeatherNavHeader";
import WeatherAdvice from "./WeatherAdvice";
import WeatherCardContainer from "./WeatherCardContainer";
import WeatherFooter from "./WeatherFooter";
import API, { API_AUTH_ID, ZIP_REGEX } from "../api/api";
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

  /**
   * Async Method to fetch data from Api. Using axios Http library.
   * This method returns a promise with data or an error
   *  */

  async getWeatherData(api, zipCode, cityName, auth_id) {
    let myData = {};
    try {
      const res = await api.get(`forecast/`, {
        params: this.constructParams(zipCode, cityName, auth_id)
      });
      myData = res.data;
    } catch (error) {
      myData = {
        error: error.message.toString(),
        logged_Error: true
      };
    }
    return myData;
  }
  /**
   * This is a method to construct parameters to send to api while asking for weather data
   * @param {sring} zipCode
   * @param {String} cityName
   * @param {String} auth_id
   */
  constructParams(zipCode, cityName, auth_id) {
    let params = {
      type: "accurate",
      units: "imperial",
      appid: auth_id
    };
    zipCode
      ? (params.zip = zipCode.concat(",us"))
      : (params.q = cityName.concat(",us"));
    console.log(params);

    return params;
  }
  /**
   * This is a method to form and return an object initialization
   */
  resetObject() {
    return {
      today: false,
      date: "",
      low_temp: Infinity,
      high_temp: -Infinity,
      weather_description: "",
      weather_icon: ""
    };
  }
  /**
   * Method Formats Date object into String yyy-mm-dd
   * @param {Date} date
   */
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  /**
   * Method to process Weather data and shrink it into fewe daily objects
   * Returns an object with procesed data
   * @param {array of data} result
   * @param {string} todayDateStr
   * @param {array of days} dayarray
   * @param {initialized weather object} newWeatherObj
   */
  processWeatherData(result, todayDateStr, dayarray, newWeatherObj) {
    if (result.hasOwnProperty("error") && result.logged_Error) {
      return null;
    }
    let threeHourWeathers = result.list;
    let myFiveDayWeatherArr = [];
    let tracked_current_date = "";
    let myWeatherObj = { ...newWeatherObj };
    for (let i = 0; i < threeHourWeathers.length; i++) {
      let current_forecast_object = threeHourWeathers[i];
      let weatherDateStr = current_forecast_object.dt_txt.split(" ")[0];
      let forecast_day = new Date(current_forecast_object.dt_txt).getDay();
      myWeatherObj.dt = current_forecast_object.dt;
      if (weatherDateStr === todayDateStr) {
        myWeatherObj.today = true;
      }
      if (i === 0 || weatherDateStr === tracked_current_date) {
        if (myWeatherObj.date !== weatherDateStr) {
          myWeatherObj.date = weatherDateStr;
          myWeatherObj.day = dayarray[forecast_day];
        }
        if (myWeatherObj.low_temp > current_forecast_object.main.temp_min) {
          myWeatherObj.low_temp = current_forecast_object.main.temp_min;
        }
        if (myWeatherObj.high_temp < current_forecast_object.main.temp_max) {
          myWeatherObj.high_temp = current_forecast_object.main.temp_max;
        }
        myWeatherObj.weather_description =
          current_forecast_object.weather[0].description;
        myWeatherObj.weather_icon = this.makeIcon(
          current_forecast_object.weather[0].main
        );
        tracked_current_date = weatherDateStr;
        continue;
      }
      if (tracked_current_date !== weatherDateStr) {
        myFiveDayWeatherArr.push(myWeatherObj);
        myWeatherObj = { ...newWeatherObj };
        myWeatherObj.date = weatherDateStr;
        myWeatherObj.day = dayarray[forecast_day];
        myWeatherObj.low_temp = current_forecast_object.main.temp_min;
        myWeatherObj.high_temp = current_forecast_object.main.temp_max;
        myWeatherObj.weather_description =
          current_forecast_object.weather[0].description;
        tracked_current_date = weatherDateStr;
        myWeatherObj.weather_icon = this.makeIcon(
          current_forecast_object.weather[0].main
        );
      }
    }
    myFiveDayWeatherArr.push(myWeatherObj);

    return {
      returned_data: true,
      weather_data: {
        city: {
          id: result.city.id,
          name: result.city.name,
          country: result.city.country
        },
        forecast_weathers: myFiveDayWeatherArr
      }
    };
  }

  /**
   * Method to return icon class string based on weather description
   * This will help chose icon for respective weather
   * @param {String} weather_desc
   */
  makeIcon(weather_desc) {
    if (!weather_desc) {
      return "wi-cloudy-windy";
    }
    if (weather_desc.toLowerCase() === "clouds") {
      return "wi-cloudy";
    }
    if (weather_desc.toLowerCase().includes("sun")) {
      return "wi-day-sunny";
    }
    if (weather_desc.toLowerCase() === "clear") {
      return "wi-stars";
    }
    return "wi-".concat(weather_desc.toLowerCase());
  }

  componentDidMount() {
    this.handleSearchClick();
  }
  /**
   * Method executed on click of search button to retrieve new data
   * Also called within ComponentDidMount method on start for default city data.
   */
  handleSearchClick() {
    let todayDateStr = this.formatDate(new Date()).toString();
    let dataObject = this.getWeatherData(
      API,
      this.state.zipCode,
      this.state.cityName,
      API_AUTH_ID
    );
    dataObject.then(result => {
      let processed_data = this.processWeatherData(
        result,
        todayDateStr,
        this.state.dayarray,
        this.resetObject()
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
