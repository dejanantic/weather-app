import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from '../Home/Home'
import SingleCityDetails from '../SingleCityDetails/SingleCityDetails'

export default function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/details">
        <SingleCityDetails />
      </Route>
    </Router>
  )
}