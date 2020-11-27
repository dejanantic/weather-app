import React, {Component} from 'react'
import {saveCity} from '../utils'
import './Form.css'

export default class Form extends Component {
  initialState = {city: ''}
  
  state = this.initialState

  handleChange = event => {
    this.setState({
      city: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {city} = this.state
    const {handleCityListUpdate} = this.props
    
    this.setState(this.initialState)
    
    saveCity(city)
      .then(handleCityListUpdate)
  }
  
  render() {
    const {city} = this.state

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          className="form__city-input"
          type="text"
          name="city"
          placeholder="Enter a city"
          value={city}
          onChange={this.handleChange}
        />
        <input
          className="form__button"
          type="submit"
          value="add"
          disabled={!city}
        />
      </form>
    )
  }
}