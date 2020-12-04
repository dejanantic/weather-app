import React from 'react'
import Home from '../Home/Home'
import SingleCityDetails from '../SingleCityDetails/SingleCityDetails'

const Koper = {
  name: "Koper",
  id: 3197753,
  coord: { lon: 13.73, lat: 45.55 },
};

export default function App() {
  return (
    // <Home />
    <SingleCityDetails city={Koper}/>
  )
}