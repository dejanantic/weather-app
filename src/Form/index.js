import React, {Component} from 'react'
import {saveCity} from '../utils'

export default class Form extends Component {
  state = {
    city: ''
  }

  handleChange = event => {
    this.setState({
      city: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {city} = this.state
    saveCity(city)
    this.setState({
      city: ''
    })
  }
  
  render() {
    const {city} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="Enter a city"
          value={city}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}