import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from 'react-toastify'
import Home from "../Home/Home";
import Signup from "../Signup/Signup";
import SingleCityDetails from "../SingleCityDetails/SingleCityDetails";
import "react-toastify/dist/ReactToastify.css";
import './App.css'

// Add lazy loading of components

export default function App() {
  return (
    <AuthProvider>
      <div className="container">
        {/* <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/details">
          <SingleCityDetails />
        </Route>
      </Router> */}
        <Signup />
        <ToastContainer position="bottom-right" />
      </div>
    </AuthProvider>
  );
}
