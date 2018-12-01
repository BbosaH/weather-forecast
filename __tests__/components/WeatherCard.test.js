import React from "react";
import WeatherCard from "../../src/components/WeatherCard";
import { shallow } from "enzyme";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

describe("<WeatherCard/>", () => {
  let weather_object;
  beforeEach(() => {
    weather_object = {
      cityName: "Brooklyn",
      today: true,
      day: "Thursday",
      low_temp: 30,
      high_temp: 45,
      weather_description: "light clouds",
      weather_icon: "wi-cloudy"
    };
  });
  it("should render background image", () => {
    let wrapper = shallow(<WeatherCard {...weather_object} />);
    expect(wrapper.find("div.image")).toHaveLength(1);
  });
  it("should render day Of the week conditionally", () => {
    let wrapper = shallow(<WeatherCard {...weather_object} />);
    expect(wrapper.find("span.day-of-week")).toHaveLength(1);
    expect(wrapper.find("span.day-of-week").text()).toEqual("Today");

    weather_object.today = false;
    wrapper = shallow(<WeatherCard {...weather_object} />);
    expect(wrapper.find("span.day-of-week").text()).toEqual("Thursday");
  });
  it("should render High Low Temperatures with arrows", () => {
    let wrapper = shallow(<WeatherCard {...weather_object} />);

    expect(wrapper.find("div.temp-content")).toHaveLength(2);
    expect(
      wrapper.find("div.temp-content").contains(
        <span className="temp">
          <FaArrowCircleUp /> <span>45°</span>
        </span>
      )
    ).toBe(true);
    expect(
      wrapper.find("div.temp-content").contains(
        <span className="temp">
          <FaArrowCircleDown /> <span>30°</span>
        </span>
      )
    ).toBe(true);
  });
  it("should render Weather Icon", () => {
    let wrapper = shallow(<WeatherCard {...weather_object} />);
    expect(wrapper.find("i.wi-cloudy")).toHaveLength(1);
  });
});
