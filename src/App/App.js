import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Home from "../Home/Home";
import Signup from "../Signup/Signup";
import Login from "../Login/Login"
import SingleCityDetails from "../SingleCityDetails/SingleCityDetails";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Settings from "../Settings/Settings";

// Add lazy loading of components

export default function App() {
  return (
    <div className="container">
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route path="/details" component={SingleCityDetails} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
