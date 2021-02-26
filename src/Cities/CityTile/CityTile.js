import React from "react";
import { Link } from "react-router-dom";
import WeatherIcon from "../../WeatherIcon/WeatherIcon";
import "./CityTile.css";

export default function CityTile({ city }) {
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
