import React, {Component} from 'react'
import Details from './Details/Details'
import Loading from '../Loading/Loading'
import {fetchSingleCityDetails} from '../utils/api'
import queryString from 'query-string'
import './SingleCityDetails.css'

export default class SingleCityDetail extends Component {
  state = {
    cityName: null,
    cityData: null,
    loading: true
  }

  componentDidMount() {
    const { name, lat, lon } = queryString.parse(window.location.search)
    fetchSingleCityDetails(lat, lon)
      .then((cityData) => (
        this.setState({
          cityName: name,
          cityData: cityData,
          loading: false
        })
      ))
  }

  render() {
    const {cityName, cityData, loading} = this.state
    return (
      <div className="city-details">
        {loading
          ? <Loading loadingMessage="Loading city details..."/>
          : <Details cityName={cityName} cityData={cityData} />
        }
      </div>
    )
  }
}