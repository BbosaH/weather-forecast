import React from "react";
import { shallow } from "enzyme";
import WeatherCardContainer from "../../src/components/WeatherCardContainer";
import NotFound from "../../src/components/NotFound";
import WeatherCard from "../../src/components/WeatherCard";

describe("<WeatherCardContainer/>", () => {
  let props_object = {
    returnedData: true,
    weatherData: {
      city: {
        id: "48584584",
        name: "Manhattan",
        country: "us"
      },
      forecast_weathers: [
        {
          dt: 244343498,
          today: false,
          date: "2018-11-29",
          day: "Thursday",
          low_temp: 30,
          high_temp: 45,
          weather_description: "light clouds",
          weather_icon: "wi-cloudy"
        },

        {
          dt: 244343499,
          today: false,
          date: "2018-11-30",
          day: "Friday",
          low_temp: 35,
          high_temp: 46.7,
          weather_description: "light rain",
          weather_icon: "wi-rain"
        }
      ]
    }
  };
  it("Should render NotFound if Data is not returned", () => {
    props_object.returnedData = false;
    let wrapper = shallow(<WeatherCardContainer {...props_object} />);

    expect(wrapper.find("div.card-container").contains(<NotFound />)).toEqual(
      true
    );
  });
  it("Should render Weathercards if Data is available", () => {
    props_object.returnedData = true;
    let wrapper = shallow(<WeatherCardContainer {...props_object} />);
    expect(
      wrapper
        .find("div.card-container")
        .contains(
          <WeatherCard
            key={props_object.weatherData.forecast_weathers[0].dt}
            cityName={props_object.weatherData.city.name}
            {...props_object.weatherData.forecast_weathers[0]}
          />
        )
    ).toBe(true);
    expect(
      wrapper
        .find("div.card-container")
        .contains(
          <WeatherCard
            key={props_object.weatherData.forecast_weathers[1].dt}
            cityName={props_object.weatherData.city.name}
            {...props_object.weatherData.forecast_weathers[1]}
          />
        )
    ).toBe(true);
  });
});
