import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Home/Home";
import SingleCityDetails from "../SingleCityDetails/SingleCityDetails";
import app from '../firebase'
import './App.css'

// Add lazy loading of components

export default function App() {
  console.log(app)
  return (
    <div className="container">
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/details">
          <SingleCityDetails />
        </Route>
      </Router>
    </div>
  );
}
