import React, { Component } from "react"
import * as weatherIcons from 'react-icons/wi'
import './CityTile.css'

export default class CityTile extends Component {
  getWeatherIcon = (icon, rangeId) => {
    let iconName;
    // Icon's last character = d => means it's daytime (e.g. 01d)
    // Icon's last character = n => means it's nighttime (e.g. 01n)
    const isDaytime = [...icon].pop() === 'd' ? true : false

    switch (true) {
      case rangeId >= 200 && rangeId <= 202:
        iconName = "WiThunderstorm";
        break;
      case rangeId >= 210 && rangeId <= 221:
        isDaytime
          ? (iconName = "WiDayLightning")
          : (iconName = "WiNightAltLightning");
        break;
      case rangeId >= 230 && rangeId <= 232:
        iconName = "WiThunderstorm";
        break;
      case rangeId >= 300 && rangeId <= 301:
        iconName = "WiSprinkle";
        break;
      case rangeId === 302:
        iconName = "WiRain";
        break;
      case rangeId === 310:
        iconName = "WiRainMix";
        break;
      case rangeId >= 311 && rangeId <= 312:
        iconName = "WiRain";
        break;
      case rangeId === 313:
        iconName = "WiShowers";
        break;
      case rangeId === 314:
        iconName = "WiRain";
        break;
      case rangeId === 321:
        iconName = "WiSprinkle";
        break;
      case rangeId === 500:
        iconName = "WiSprinkle";
        break;
      case rangeId >= 501 && rangeId <= 504:
        iconName = "WiRain";
        break;
      case rangeId === 511:
        iconName = "WiRainMix";
        break;
      case rangeId >= 520 && rangeId <= 522:
        iconName = "WiShowers";
        break;
      case rangeId === 531:
        iconName = "WiStormShowers";
        break;
      case rangeId >= 600 && rangeId <= 601:
        iconName = "WiSnow";
        break;
      case rangeId === 602:
        iconName = "WiSleet";
        break;
      case rangeId >= 611 && rangeId <= 620:
        iconName = "WiRainMix";
        break;
      case rangeId >= 621 && rangeId <= 622:
        iconName = "WiSnow";
        break;
      case rangeId === 701:
        isDaytime ? (iconName = "WiDayFog") : (iconName = "WiNightFog");
        break;
      case rangeId === 711:
        iconName = "WiSmoke";
        break;
      case rangeId === 721:
        isDaytime ? iconName = "WiDayHaze" : iconName = "WiFog";
        break;
      case rangeId === 731:
        iconName = "WiDust";
        break;
      case rangeId === 741:
        iconName = "WiFog";
        break;
      case rangeId >= 761 && rangeId <= 762:
        iconName = "WiDust";
        break;
      case rangeId === 771:
        iconName = "WiCloudyGusts";
        break;
      case rangeId === 781:
        iconName = "WiTornado";
        break;
      case rangeId >= 801 && rangeId <= 803:
        isDaytime
          ? (iconName = "WiDayCloudy")
          : (iconName = "WiNightAltCloudy");
        break;
      case rangeId === 804:
        iconName = "WiCloudy";
        break;
      case rangeId === 900:
        iconName = "WiTornado";
        break;
      case rangeId === 901:
        iconName = "WiStormShowers";
        break;
      case rangeId === 902:
        iconName = "WiHurricane";
        break;
      case rangeId === 903:
        iconName = "WiSnowflakeCold";
        break;
      case rangeId === 904:
        iconName = "WiHot";
        break;
      case rangeId === 905:
        isDaytime ? (iconName = "WiDayWindy") : (iconName = "WiWindy");
        break;
      case rangeId === 906:
        iconName = "WiHail";
        break;
      case rangeId === 957:
        iconName = "WiStrongWind";
        break;
      default:
        iconName = isDaytime ? "WiDaySunny" : "WiNightClear";
        break;
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
        <div className="city-tile__temperature">
          {Math.round(main.temp)}
          <span className="city-tile__degrees">&#176;</span>
        </div>
        <WeatherIcon className="city-tile__icon" />
        <div className="city-tile__name">{name}</div>
      </div>
    );
  }
}