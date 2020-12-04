import React, {Component} from 'react'
import Details from './Details/Details'
import Loading from '../Loading/Loading'
import {fetchSingleCityDetails} from '../utils/api'
import './SingleCityDetails.css'

export default class SingleCityDetail extends Component {
  state = {
    cityData: null,
    loading: true
  }

  componentDidMount() {
    const {city} = this.props
    fetchSingleCityDetails(city)
      .then((cityData) => (
        this.setState({
          cityData: cityData,
          loading: false
        })
      ))
  }

  render() {
    const {cityData, loading} = this.state
    const {city: {name}} = this.props
    return (
      <div className="city-details">
        {loading
          ? <Loading loadingMessage="Loading city details..."/>
          : <Details cityName={name} cityData={cityData} />
        }
      </div>
    )
  }
}