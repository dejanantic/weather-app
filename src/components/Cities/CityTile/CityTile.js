import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import WeatherIcon from "../../WeatherIcon/WeatherIcon";
import "./CityTile.css";

function CityTile({ city }) {
  const { name, weather, main, id: cityId } = city;
  const { icon, id } = weather[0];
  const Icon = WeatherIcon(icon, id);

  return (
    <Link
      to={{
        pathname: "/details",
        search: `?id=${cityId}`,
      }}
      style={{ textDecoration: "none" }}
    >
      <div className="city-tile">
        <div className="city-tile__temperature">
          {Math.round(main.temp)}
          <span className="city-tile__degrees">&#176;</span>
        </div>
        <Icon className="city-tile__icon" />
        <div className="city-tile__name">{name}</div>
      </div>
    </Link>
  );
}

CityTile.propTypes = {
  city: PropTypes.object.isRequired,
};

export default CityTile;
