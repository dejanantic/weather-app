import React, {Component} from 'react'
import Cities from '../Cities'
import Welcome from './Welcome'
import Form from '../Form'
import LastUpdate from './LastUpdate/LastUpdate'
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
    const isCityListEmpty = cityList.length === 0 ? true : false

    return (
      <div className="container">
        <Form handleCityListUpdate={this.handleCityListUpdate}/>
        {isCityListEmpty
          ? <Welcome />
          : (<>
              <Cities cityList={cityList}/>
              <LastUpdate />
          </>)
        }
      </div>
    )
  }
}