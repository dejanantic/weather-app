import React, {Component} from 'react'
import {fetchWeatherData} from './utils'

export default class Cities extends Component {
  state = {
    citiesData: []
  }

  componentDidMount() {
    fetchWeatherData(this.props.cityList)
      .then(cities => (
        this.setState({
          citiesData: [...cities]
        })
      ))
  }

  render() {
    return (
      <>
        <p>Render Cities here.</p>
        <ul>
          {this.props.cityList.map(city => <li key={city}>{city}</li>)}
        </ul>
      </>
    )
  }
}