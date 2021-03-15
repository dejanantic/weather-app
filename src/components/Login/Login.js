import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../Logo/Logo";
import { toast } from "react-toastify";
import "./Login.css";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <header className="login__header">
        <Logo />
      </header>
      <div className="login__form-container">
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form-group">
            <input
              ref={emailRef}
              className="login__form-control"
              aria-label="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="login__form-group">
            <input
              ref={passwordRef}
              className="login__form-control"
              aria-label="password"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="login__form-group">
            <button
              disabled={loading}
              type="submit"
              className="login__form-submit"
              onClick={handleSubmit}
            >
              log in
            </button>
          </div>
        </form>
      </div>
      <div className="login__forgot-password">
        <p className="login__text">
          <Link className="login__forgot-link" to="/forgot-password">
            forgot password?
          </Link>
        </p>
      </div>
      <div className="login__divider"></div>
      <div className="login__to-login">
        <p className="login__text">
          Need an account?{" "}
          <Link className="login__signup-link" to="/signup">
            sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
