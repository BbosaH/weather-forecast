import React from "react";
import "../styles/WeatherFooter/WeatherFooter.css";
import {
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoTwitter,
  IoLogoSlack
} from "react-icons/io";
/**
 * Component to display footer of app
 */
const WeatherFooter = () => {
  return (
    <footer className="weather-footer">
      <div className="footer-links">
        <ul>
          <li>
            <a href="#">
              <IoLogoLinkedin />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoPinterest />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoSlack />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default WeatherFooter;
