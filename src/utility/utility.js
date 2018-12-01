/**
 * This is a method to construct parameters to send to api while asking for weather data
 * @param {sring} zipCode
 * @param {String} cityName
 * @param {String} auth_id
 */
export const constructParams = (zipCode, cityName, auth_id) => {
  let params = {
    type: "accurate",
    units: "imperial",
    appid: auth_id
  };
  zipCode
    ? (params.zip = zipCode.concat(",us"))
    : (params.q = cityName.concat(",us"));

  return params;
};

/**
 * Method Formats Date object into String yyy-mm-dd
 * @param {String} date_string
 */
export const formatDate = date => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

/**
 * This is a method to form and return an object initialization
 */
export const resetObject = () => {
  return {
    today: false,
    date: "",
    myDay: "",
    low_temp: Infinity,
    high_temp: -Infinity,
    weather_description: "",
    weather_icon: ""
  };
};

/**
 * Method to return icon class string based on weather description
 * This will help chose icon for respective weather
 * @param {String} weather_desc
 */
export const makeIcon = weather_desc => {
  if (weather_desc.toLowerCase().indexOf("clouds") >= 0) {
    return "wi-cloudy";
  }
  if (weather_desc.toLowerCase().indexOf("sun") >= 0) {
    return "wi-day-sunny";
  }
  if (weather_desc.toLowerCase().indexOf("clear") >= 0) {
    return "wi-stars";
  }
  if (weather_desc.toLowerCase().indexOf("rain") >= 0) {
    return "wi-rain";
  }
  if (weather_desc.toLowerCase().indexOf("snow") >= 0) {
    return "wi-snow";
  }
  return "wi-cloudy-windy";
};

/**
 * Method to process Weather data and shrink it into fewe daily objects
 * Returns an object with procesed data
 * @param {array of data} result
 * @param {string} todayDateStr
 * @param {array of days} dayarray
 * @param {initialized weather object} newWeatherObj
 */
export const processWeatherData = (
  result,
  todayDateStr,
  dayarray,
  newWeatherObj
) => {
  if (result.hasOwnProperty("error") || result.logged_Error) {
    return null;
  }
  let threeHourWeathers = result.list;
  let myFiveDayWeatherArr = [];
  let tracked_current_date = "";
  let myWeatherObj = { ...newWeatherObj };
  for (let i = 0; i < threeHourWeathers.length; i++) {
    let current_forecast_object = threeHourWeathers[i];
    let weatherDateStr = current_forecast_object.dt_txt.split(" ")[0];
    let dateString = current_forecast_object.dt_txt;
    let d = new Date(dateString.replace(" ", "T"));
    let forecast_day = d.getDay();
    myWeatherObj.dt = current_forecast_object.dt;
    if (weatherDateStr === todayDateStr) {
      myWeatherObj.today = true;
    }
    if (i === 0 || weatherDateStr === tracked_current_date) {
      if (myWeatherObj.date !== weatherDateStr) {
        myWeatherObj.date = weatherDateStr;
        myWeatherObj.myDay = dayarray[forecast_day];
      }
      if (myWeatherObj.low_temp > current_forecast_object.main.temp_min) {
        myWeatherObj.low_temp = current_forecast_object.main.temp_min;
      }
      if (myWeatherObj.high_temp < current_forecast_object.main.temp_max) {
        myWeatherObj.high_temp = current_forecast_object.main.temp_max;
      }
      myWeatherObj.weather_description =
        current_forecast_object.weather[0].description;
      myWeatherObj.weather_icon = makeIcon(
        current_forecast_object.weather[0].main
      );
      tracked_current_date = weatherDateStr;
      continue;
    }
    if (tracked_current_date !== weatherDateStr) {
      myFiveDayWeatherArr.push(myWeatherObj);
      myWeatherObj = { ...newWeatherObj };
      myWeatherObj.date = weatherDateStr;
      myWeatherObj.myDay = dayarray[forecast_day];
      myWeatherObj.low_temp = current_forecast_object.main.temp_min;
      myWeatherObj.high_temp = current_forecast_object.main.temp_max;
      myWeatherObj.weather_description =
        current_forecast_object.weather[0].description;
      tracked_current_date = weatherDateStr;
      myWeatherObj.weather_icon = makeIcon(
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
};

/**
 * Async Method to fetch data from Api. Using axios Http library.
 * This method returns a promise with data or an error
 *  */

export const getWeatherData = async (api, zipCode, cityName, auth_id) => {
  let myData = {};
  try {
    const res = await api.get(`forecast/`, {
      params: constructParams(zipCode, cityName, auth_id)
    });
    myData = res.data;
  } catch (error) {
    myData = {
      error: error.message.toString(),
      logged_Error: true
    };
  }
  return myData;
};
