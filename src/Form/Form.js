import React, {Component} from 'react'
import {saveCity} from '../utils/api'
import { ToastContainer, toast } from 'react-toastify'
import './Form.css'
import 'react-toastify/dist/ReactToastify.css'
import './CustomToast.css'

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
      .catch(e => toast.info(e.message))
  }
  
  render() {
    const {city} = this.state

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form__group">
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
        </div>
        <ToastContainer position="bottom-right" />
      </form>
    )
  }
}