import React from "react";
import PropTypes from "prop-types";
import daysjs from "dayjs";
import { Link } from "react-router-dom";
import WeatherIcon from "../../WeatherIcon/WeatherIcon";
import SimpleBarReact from "simplebar-react";
import { FaChevronLeft } from "react-icons/fa";
import "./Details.css";
import "simplebar/dist/simplebar.min.css";

function WeatherForecastDaily({ weather }) {
  const { temp, dt: timestamp, wind_speed, pop: precipitation } = weather;
  const period = daysjs(timestamp * 1000).format("ddd");
  const { id, icon } = weather.weather[0];
  const Icon = WeatherIcon(icon, id);
  return (
    <div className="weather-forecast weather-forecast--expandable">
      <div className="weather-forecast__period">
        {period}
        <span className="weather-forecast__description">
          {daysjs(timestamp * 1000).format("D/M")}
        </span>
      </div>
      <div className="weather-forecast__icon">
        <Icon />
      </div>
      <div className="weather-forecast__temperature">
        {Math.round(temp.min)}&#176;
        <span className="weather-forecast__description">Low</span>
      </div>
      <div className="weather-forecast__temperature">
        {Math.round(temp.max)}&#176;
        <span className="weather-forecast__description">High</span>
      </div>
      <div className="weather-forecast__wind-speed">
        {Math.round(wind_speed)}km/h
        <span className="weather-forecast__description">Wind</span>
      </div>
      <div className="weather-forecast__rain">
        {precipitation ? Math.round(precipitation * 100) : 0}%
        <span className="weather-forecast__description">Precipitation</span>
      </div>
      <div className="weather-forecast__range">
        {`${Math.round(temp.min)}-${Math.round(temp.max)}`}&#176;
      </div>
    </div>
  );
}

WeatherForecastDaily.propTypes = {
  weather: PropTypes.object.isRequired,
};

function WeatherForecastHourly({ weather }) {
  const { temp, dt: timestamp } = weather;
  const period = daysjs(timestamp * 1000).format("HH:mm");
  const { id, icon } = weather.weather[0];
  const Icon = WeatherIcon(icon, id);
  return (
    <div className="weather-forecast">
      <div className="weather-forecast__period">{period}</div>
      <div className="weather-forecast__icon">
        <Icon />
      </div>
      <div className="weather-forecast__hourly-range">
        {Math.round(temp)}&#176;
      </div>
    </div>
  );
}

WeatherForecastHourly.propTypes = {
  weather: PropTypes.object.isRequired,
};

function Details({ name, country, weatherData }) {
  const {
    current: currentWeather,
    daily: dailyWeather,
    hourly: hourlyWeather,
  } = weatherData;

  const todaysWeather = dailyWeather[0];
  const nextFiveDays = dailyWeather.slice(1, -2);
  const nextSevenHours = hourlyWeather.slice(1, 25);

  const { td: timestamp, temp: currentTemperature } = currentWeather;
  const { pop: currentPop } = hourlyWeather[0];

  const {
    icon: weatherIcon,
    id: weatherId,
    main: description,
  } = currentWeather.weather[0];

  const IconComponent = WeatherIcon(weatherIcon, weatherId);

  return (
    <>
      <header className="city-details__header">
        <div className="city-details__back-btn">
          <Link to="/" style={{ textDecoration: "none" }}>
            <FaChevronLeft style={{ color: "#fff" }} />
          </Link>
        </div>
        <div className="city-details__header-group">
          <h1 className="city-details__name">
            {name}, {country}
          </h1>
          <p className="city-details__date">
            <time dateTime={daysjs(timestamp).format("YYYY-MM-DD")}>
              {daysjs(timestamp).format("dddd D MMMM")}
            </time>
          </p>
        </div>
      </header>
      <main className="city-details__main">
        <div className="city-details__temperature-and-stats">
          <div className="city-details__group">
            <div className="city-details__icon">
              <IconComponent />
            </div>
            <div className="city-details__group--column">
              <div className="city-details__temperature">
                {Math.round(currentTemperature)}&#176;
              </div>
              <div className="city-details__description">{description}</div>
            </div>
          </div>
          <div className="city-details__current-stats">
            <div className="city-details__group--column">
              <div className="city-details__stat-group">
                <p className="city-details__stat">
                  {Math.round(todaysWeather.temp.max)}&#176;
                </p>
                <p className="city-details__stat-description">High</p>
              </div>
              <div className="city-details__stat-group">
                <p className="city-details__stat">
                  {Math.round(todaysWeather.temp.min)}&#176;
                </p>
                <p className="city-details__stat-description">Low</p>
              </div>
            </div>
            <div className="city-details__group--column">
              <div className="city-details__stat-group">
                <p className="city-details__stat">
                  {Math.round(todaysWeather.wind_speed)}
                  <span style={{ fontSize: ".7em" }}>km/h</span>
                </p>
                <p className="city-details__stat-description">Wind</p>
              </div>
              <div className="city-details__stat-group">
                <p className="city-details__stat">
                  {currentPop ? Math.round(currentPop * 100) : 0}
                  <span style={{ fontSize: ".7em" }}>%</span>
                </p>
                <p className="city-details__stat-description">Precipitation</p>
              </div>
            </div>
            <div className="city-details__group--column">
              <div className="city-details__stat-group">
                <p className="city-details__stat">
                  {daysjs(todaysWeather.sunrise * 1000).format("HH:mm")}
                </p>
                <p className="city-details__stat-description">Sunrise</p>
              </div>
              <div className="city-details__stat-group">
                <p className="city-details__stat">
                  {daysjs(todaysWeather.sunset * 1000).format("HH:mm")}
                </p>
                <p className="city-details__stat-description">Sunset</p>
              </div>
            </div>
          </div>
        </div>
        <div className="city-details__todays-weather">
          <h2 className="city-details__subheading">Today's Weather</h2>
          <SimpleBarReact
            className="custom-scrollbar"
            autoHide={false}
            forceVisible="y"
          >
            <ul className="city-details__weather-by-hour">
              {nextSevenHours.map((hour) => (
                <li key={hour.dt} className="city-details__forecast-block">
                  <WeatherForecastHourly weather={hour} />
                </li>
              ))}
            </ul>
          </SimpleBarReact>
        </div>
        <div className="city-details__next-five-days">
          <h2 className="city-details__subheading">Next 5 Days</h2>
          <ul className="city-details__weather-by-day">
            {nextFiveDays.map((day) => (
              <li key={day.dt} className="city-details__forecast-block">
                <WeatherForecastDaily weather={day} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

Details.propTypes = {
  weatherData: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
};

export default Details;
