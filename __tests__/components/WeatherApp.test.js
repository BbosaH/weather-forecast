import React from "react";
import { shallow } from "enzyme";
import WeatherApp from "../../src/components/WeatherApp";

describe("<App />", () => {
  describe("render()", () => {
    test("renders the component", () => {
      const wrapper = shallow(<WeatherApp />);
      //const component = wrapper.dive();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
