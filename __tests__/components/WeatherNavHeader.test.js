import React from "react";
import WeatherNavHeader from "../../src/components/WeatherNavHeader";
import { shallow } from "enzyme";
import { img } from "../../src/img/weather.png";

describe("<WeatherNavHeader/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WeatherNavHeader />);
  });

  it("should render one header element", () => {
    expect(wrapper.find("header")).toHaveLength(1);
  });
  it("should render image with classname header-img", () => {
    expect(wrapper.find("img.header-img")).toHaveLength(1);
  });
  it("should render span with classname header-title", () => {
    expect(wrapper.find("span.header-title")).toHaveLength(1);
  });
});
