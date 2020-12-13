import React, {Component} from 'react'
import {fetchWeatherData} from '../utils/api'
import CityTile from './CityTile/CityTile'
import Loading from '../Loading/Loading'
import './Cities.css'

export default class Cities extends Component {
  state = {
    citiesData: null,
    loading: true
  }

  componentDidUpdate(prevProps) {
    const {cityList: updatedCityList} = this.props
    if (updatedCityList !== prevProps.cityList) (
      fetchWeatherData(updatedCityList)
        .then(updatedCities => (
          this.setState({
            citiesData: [...updatedCities]
          })
        ))
    )
  }

  componentDidMount() {
    const {cityList} = this.props

    if (cityList.length !== 0) {
      fetchWeatherData(cityList)
        .then(cities => (
          this.setState({
            citiesData: [...cities],
            loading: false
          })
        ))
    }
  }

  render() {
    const {citiesData: cities, loading} = this.state

    return (
      <>
        <ul className="cities-grid">
          {loading === true
            ? <Loading loadingMessage="Loading cities" speed={600} />
            : cities.map(city => <li className="cities-grid__city" key={city.id}><CityTile city={city} /></li>)
          }
        </ul>
      </>
    )
  }
}