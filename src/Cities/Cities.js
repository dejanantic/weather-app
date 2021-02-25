import React from "react";
import CityTile from "./CityTile/CityTile";
import "./Cities.css";

export default function Cities({ cityData }) {
  // if the cities array is empty, it would be maybe better to return
  // the welcome component here, because after all, this is connected
  // to the Cities.js???

  return (
    <>
      <ul className="cities-grid">
        {cityData.map((city) => (
          <li className="cities-grid__city" key={city.id}>
            <CityTile city={city} />
          </li>
        ))}
      </ul>
    </>
  );
}
