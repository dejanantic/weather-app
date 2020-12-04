import React, { Component } from "react"
import WeatherIcon from '../../WeatherIcon/WeatherIcon'
import './CityTile.css'

export default class CityTile extends Component {
  render() {
    const { city: { name, weather, main } } = this.props
    const {icon, id, description} = weather[0]
    const Icon = WeatherIcon(icon, id)

    return (
      <div className="city-tile">
        <div className="city-tile__temperature">
          {Math.round(main.temp)}
          <span className="city-tile__degrees">&#176;</span>
        </div>
        <Icon className="city-tile__icon" />
        <div className="city-tile__name">{name}</div>
      </div>
    );
  }
}