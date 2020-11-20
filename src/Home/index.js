import React, {Component} from 'react'
import Cities from '../Cities'
import {getCities, saveCity, deleteCity} from '../utils'

export default class Home extends Component {
  render() {
    const cities = getCities()

    return (
      <div className="container">
        <h1>Here is something</h1>
      </div>
    )
  }
}