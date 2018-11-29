import React from "react";
import "../styles/NotFound/NotFound.css";
/**
 *  Stateless component to display in case no data found from api.
 */
const NotFound = () => {
  return (
    <div className="not-found">
      <span>
        City Not Found ! Search 5 days Weather Forecast by city name or Zipcode
      </span>
    </div>
  );
};
export default NotFound;
