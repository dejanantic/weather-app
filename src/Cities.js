import React, {Component} from 'react'
import {fetchWeatherData} from './utils'

function CityTile({city}) {

  const {name, weather, main} = city

  return (
    <div className="city-tile">
      <div className="city-tile__temperature">{main.temp}&#176;C</div>
      <div className="city-tile__icon">{weather[0].description}</div>
      <div className="city-tile__name">{name}</div>
    </div>
  );
}

export default class Cities extends Component {
  state = {
    citiesData: null,
    loading: true
  }

  componentDidMount() {
    fetchWeatherData(this.props.cityList)
      .then(cities => (
        this.setState({
          citiesData: [...cities],
          loading: false
        })
      ))
  }

  render() {
    const {citiesData: cities, loading} = this.state

    return (
      <>
        <ul className="cities-grid">
          {loading && <p>Loading...</p>}
          {cities && cities.map(city => <li key={city.id}><CityTile city={city} /></li>)}
        </ul>
      </>
    )
  }
}