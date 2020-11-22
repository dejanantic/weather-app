import React, { Component } from "react"
import * as weatherIcons from 'react-icons/wi'

export default class CityTile extends Component {
  getWeatherIcon = (icon, rangeId) => {
    let iconName = 'Wi'
    // Icon's last character = d => means it's daytime (e.g. 01d)
    // Icon's last character = n => means it's nighttime (e.g. 01n)
    const isDaytime = [...icon].pop() === 'd' ? true : false
    const timeOfDay = isDaytime ? 'Day' : 'NightAlt'
    
    iconName += timeOfDay

    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        iconName += 'Thunderstorm'
        break
      case rangeId >= 300 && rangeId <= 321:
        iconName += 'Rain'
        break
      case rangeId >= 500 && rangeId <= 531:
        iconName += 'Rain'
        break
      case rangeId >= 600 && rangeId <= 622:
        iconName += 'Snow'
        break
      case rangeId >= 700 && rangeId <= 781:
        iconName += 'Fog'
        break
      case rangeId === 801:
        iconName = isDaytime ? 'WiDayCloudy' : 'WiNightAltPartlyCloudy'
        break
      case rangeId === 802:
        iconName = isDaytime ? 'WiCloud' : 'WiNightAltCloudy'
        break
      case rangeId === 803 || rangeId === 804:
        iconName = 'WiCloudy'
        break
      default:
        iconName = isDaytime ? 'WiDaySunny' : 'WiNightClear'
        break
    }

    const weatherIconComponent = weatherIcons[iconName]

    return weatherIconComponent
  }
  
  render() {
    const { city: { name, weather, main } } = this.props
    const {icon, id, description} = weather[0]
    const WeatherIcon = this.getWeatherIcon(icon, id)

    return (
      <div className="city-tile">
        <div className="city-tile__temperature">{Math.round(main.temp)}&#176;C</div>
        <div className="city-tile__description">{description}</div>
        <div className="city-tile__name">{name}</div>
        <WeatherIcon size={55}/>
      </div>
    )
  }
}

// export default function CityTile({ city }) {
//   const { name, weather, main } = city

//   return (
//     <div className="city-tile">
//       <div className="city-tile__temperature">{main.temp}&#176;C</div>
//       <div className="city-tile__icon">{weather[0].description}</div>
//       <div className="city-tile__name">{name}</div>
//     </div>
//   )
// }
