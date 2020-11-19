import React, {Component} from 'react'
import Cities from './Cities'
import {getCities, saveCity, deleteCity} from './utils'

export default class Home extends Component {
  render() {
    const cities = getCities()

    return (
      <div className="container">
        <Cities cityList={cities}/>
      </div>
    )
  }
}