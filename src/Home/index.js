import React, {Component} from 'react'
import Cities from '../Cities'
import Form from '../Form'
import {getCities, saveCity, deleteCity} from '../utils'

export default class Home extends Component {
  render() {
    const cities = getCities()

    return (
      <div className="container">
        <Form />
        <h1>Here is something</h1>
      </div>
    )
  }
}