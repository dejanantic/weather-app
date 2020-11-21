import React from "react"

export default function CityTile({ city }) {
  const { name, weather, main, dt } = city

  return (
    <div className="city-tile">
      <div className="city-tile__temperature">{main.temp}&#176;C</div>
      <div className="city-tile__icon">{weather[0].description}</div>
      <div className="city-tile__name">{name}</div>
      <div className="city-tile__time">{dt}</div>
    </div>
  )
}
