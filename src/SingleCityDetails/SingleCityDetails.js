import React, {Component} from 'react'
import Details from './Details/Details'
import Loading from '../Loading/Loading'
import Remove from '../Remove/Remove'
import {fetchSingleCityDetails, getCityName} from '../utils/api'
import queryString from 'query-string'
import './SingleCityDetails.css'

export default class SingleCityDetail extends Component {
  state = {
    id: null,
    cityName: null,
    cityData: null,
    loading: true
  }

  componentDidMount() {
    const { id } = queryString.parse(window.location.search)
    fetchSingleCityDetails(id)
      .then((cityData) => (
        this.setState({
          id: id,
          cityName: getCityName(id),
          cityData: cityData,
          loading: false
        })
      ))
  }

  render() {
    const {id: cityId, cityName, cityData, loading} = this.state
    return (
      <div className="city-details">
        {loading
          ? <Loading loadingMessage="Loading city details"/>
          : <Details cityName={cityName} cityData={cityData} />
        }
        {loading === false && <Remove id={cityId} />}
      </div>
    )
  }
}