import React from "react";
import { shallow } from "enzyme";
import { TodaysWeather } from "../../src/components/WeatherAdvice";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

describe("<TodaysWeather/>", () => {
  let weatherToday;
  beforeEach(() => {
    weatherToday = {
      dt: 244343499,
      today: true,
      date: "2018-11-29",
      day: "Thursday",
      low_temp: 30,
      high_temp: 45,
      weather_description: "light clouds",
      weather_icon: "wi-cloudy"
    };
  });
  it("Should render weather Today div", () => {
    let wrapper = shallow(
      <TodaysWeather cityName="Manhattan" weatherToday={weatherToday} />
    );

    expect(wrapper.find("div.weather-today")).toHaveLength(1);
    expect(wrapper.find("div.weather-today").text()).toEqual(
      "Today in Manhattan"
    );

    weatherToday.today = false;
    wrapper = shallow(
      <TodaysWeather cityName="Manhattan" weatherToday={weatherToday} />
    );
    expect(wrapper.find("div.weather-today").text()).toEqual(
      "Tommorow in Manhattan"
    );
  });

  it("should render Weather Icon", () => {
    let wrapper = shallow(
      <TodaysWeather cityName="Manhattan" weatherToday={weatherToday} />
    );
    expect(wrapper.find("i.wi-cloudy")).toHaveLength(1);
  });
  it("should render Weather Description", () => {
    let wrapper = shallow(
      <TodaysWeather cityName="Manhattan" weatherToday={weatherToday} />
    );
    expect(wrapper.find("div.weather_desc").text()).toEqual("light clouds");
  });

  it("should render High Low Temperatures with arrows", () => {
    let wrapper = shallow(
      <TodaysWeather cityName="Manhattan" weatherToday={weatherToday} />
    );

    expect(wrapper.find("div.temp-content")).toHaveLength(2);
    expect(
      wrapper.find("div.temp-content").contains(
        <span className="temp">
          <FaArrowCircleUp />
          45°
        </span>
      )
    ).toBe(true);
    expect(
      wrapper.find("div.temp-content").contains(
        <span className="temp">
          <FaArrowCircleDown />
          30°
        </span>
      )
    ).toBe(true);
  });
});
