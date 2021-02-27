import React from "react";
import CityTile from "./CityTile/CityTile";
import "./Cities.css";

export default function Cities({ weatherData }) {
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
