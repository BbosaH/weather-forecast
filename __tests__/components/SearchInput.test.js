import React from "react";
import { SearchInput } from "../../src/components/WeatherAdvice";
import { shallow } from "enzyme";

describe("<SearchInput/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SearchInput />);
  });

  it("should render input", () => {
    expect(wrapper.find("input")).toHaveLength(1);
  });
  it("should render search button", () => {
    expect(wrapper.find("button")).toHaveLength(1);
  });

  describe("events", () => {
    it("should sucessfully call handleClick", () => {
      const mockhandleClick = jest.fn();
      wrapper = shallow(
        <SearchInput cityName="Manhattan" handleClick={mockhandleClick} />
      );
      wrapper.find("button").simulate("click");
      expect(mockhandleClick.mock.calls.length).toEqual(1);
    });
    it("should sucessfully call handleChange", () => {
      const mockhandleChange = jest.fn();
      wrapper = shallow(
        <SearchInput cityName="Manhattan" handleChange={mockhandleChange} />
      );
      wrapper.find("input").simulate("change");
      expect(mockhandleChange.mock.calls.length).toEqual(1);
    });
  });
});
