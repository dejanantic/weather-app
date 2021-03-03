import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loading from "../Loading/Loading";

// Lazy load components
const Home = React.lazy(() => import("../Home/Home"));
const Settings = React.lazy(() => import("../Settings/Settings"));
const SingleCityDetails = React.lazy(() => import("../SingleCityDetails/SingleCityDetails"));
const Signup = React.lazy(() => import("../Signup/Signup"));
const Login = React.lazy(() => import("../Login/Login"));
const ForgotPassword = React.lazy(() => import("../ForgotPassword/ForgotPassword"));

export default function App() {
  return (
    <div className="container">
      <Router>
        <AuthProvider>
          <Suspense fallback={<Loading loadingMessage="Loading app" />}>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/settings" component={Settings} />
              <Route path="/details" component={SingleCityDetails} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route render={() => <h1>404 Page not found</h1>} />
            </Switch>
          </Suspense>
        </AuthProvider>
      </Router>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
