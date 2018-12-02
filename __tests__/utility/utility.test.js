import {
  formatDate,
  resetObject,
  processWeatherData,
  makeIcon,
  constructParams
} from "../../src/utility/utility";

describe("utility_funcs", () => {
  describe("formatDate", () => {
    it("should return date String with dashes", () => {
      const date = "December 17, 1995 03:24:00";
      expect(formatDate(date)).toEqual("1995-12-17");
    });
  });
  describe("resetObject", () => {
    it("should return date String with dashes", () => {
      const reset_obj = {
        today: false,
        date: "",
        myDay:"",
        low_temp: Infinity,
        high_temp: -Infinity,
        weather_description: "",
        weather_icon: ""
      };
      expect(resetObject()).toEqual(reset_obj);
    });
  });
  describe("makeIcon", () => {
    it("should icon class string based on weather discription", () => {
      expect(makeIcon("light clouds")).toEqual("wi-cloudy");
      expect(makeIcon("light rain")).toEqual("wi-rain");
      expect(makeIcon("sunny")).toEqual("wi-day-sunny");
      expect(makeIcon("clear sky")).toEqual("wi-stars");
      expect(makeIcon("heavy snow")).toEqual("wi-snow");
      expect(makeIcon("another weather")).toEqual("wi-cloudy-windy");
    });
  });
  describe("constructParams", () => {
    it("should return correct parmeter object", () => {
      let zipCode = "07305";
      let cityName = "Jersey City";
      let auth_id = "4857383483933";
      expect(constructParams(zipCode, cityName, auth_id)).toEqual({
        type: "accurate",
        units: "imperial",
        appid: "4857383483933",
        zip: "07305,us"
      });
      zipCode = "";
      expect(constructParams(zipCode, cityName, auth_id)).toEqual({
        type: "accurate",
        units: "imperial",
        appid: "4857383483933",
        q: "Jersey City,us"
      });
    });
  });

  describe("processWeatherData", () => {
    it("should return null if resultData is error Object", () => {
      const err_obj = { error: "no data", logged_error: true };
      expect(processWeatherData(err_obj)).toEqual(null);
    });
    it("should return Preciselt the correct data Object", () => {});
  });
});
