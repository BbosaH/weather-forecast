import React from "react";
import { shallow } from "enzyme";
import WeatherFooter from "../../src/components/WeatherFooter";
import {
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTwitter,
  IoLogoSlack
} from "react-icons/io";

describe("<WeatherFooter/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<WeatherFooter />);
  });
  it("should always render One list", () => {
    expect(wrapper.find("ul")).toHaveLength(1);
  });
  it("should always render three list items", () => {
    expect(wrapper.find("li")).toHaveLength(4);
  });
  it("should hav anchor tag with icon in each list item", () => {
    expect(
      wrapper.find("li").contains(
        <a href="#">
          <IoLogoLinkedin />
        </a>
      )
    ).toBe(true);
    expect(
      wrapper.find("li").contains(
        <a href="#">
          <IoLogoPinterest />
        </a>
      )
    ).toBe(true);
    expect(
      wrapper.find("li").contains(
        <a href="#">
          <IoLogoTwitter />
        </a>
      )
    ).toBe(true);
    expect(
      wrapper.find("li").contains(
        <a href="#">
          <IoLogoSlack />
        </a>
      )
    ).toBe(true);
  });
});
