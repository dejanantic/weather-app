import React from "react";
import PropTypes from "prop-types";
import CityTile from "./CityTile/CityTile";
import "./Cities.css";

function Cities({ weatherData }) {
  return (
    <>
      <ul className="cities-grid">
        {weatherData.map((city) => (
          <li className="cities-grid__city" key={city.docId}>
            <CityTile city={city} />
          </li>
        ))}
      </ul>
    </>
  );
}

Cities.propTypes = {
  weatherData: PropTypes.array.isRequired,
};

export default Cities;
