import React, {Component} from 'react'
import Cities from '../Cities'
import Welcome from './Welcome'
import Form from '../Form'
import {getCities} from '../utils'
import './Home.css'
export default class Home extends Component {
  state = {
    cityList: getCities()
  }

  handleCityListUpdate = () => {
    this.setState({
      cityList: getCities()
    })
  }

  render() {
    const {cityList} = this.state

    return (
      <div className="container">
        <Form handleCityListUpdate={this.handleCityListUpdate}/>
        {cityList.length === 0
          ? <Welcome />
          : <Cities cityList={cityList}/>
        }
      </div>
    )
  }
}