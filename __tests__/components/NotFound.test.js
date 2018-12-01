import React from "react";
import NotFound from "../../src/components/NotFound";
import { shallow } from "enzyme";

describe("<NotFound/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });
  it("Should always Render one span", () => {
    expect(wrapper.find("span")).toHaveLength(1);
  });
  it("should display required text", () => {
    const text =
      "City Not Found ! Search 5 days Weather Forecast by city name or Zipcode";
    expect(wrapper.find("span").text()).toEqual(text);
  });
});
