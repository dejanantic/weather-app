import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../Logo/Logo";
import { toast } from "react-toastify";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      const errorMessage = "Passwords do not match";
      setError(errorMessage);
      toast.error(errorMessage);
      passwordRef.current.value = "";
      passwordRef.current.focus();
      passwordConfirmRef.current.value = "";
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
    }

    setLoading(false);
  }

  return (
    <div className="signup">
      <header className="signup__header">
        <Logo />
      </header>
      <div className="signup__form-container">
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__form-group">
            <input
              ref={emailRef}
              className="signup__form-control"
              aria-label="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="signup__form-group">
            <input
              ref={passwordRef}
              className="signup__form-control"
              aria-label="password"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="signup__form-group">
            <input
              ref={passwordConfirmRef}
              className="signup__form-control"
              aria-label="confirm-password"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="signup__form-group">
            <button
              disabled={loading}
              type="submit"
              className="signup__form-submit"
              onClick={handleSubmit}
            >
              sign up
            </button>
          </div>
        </form>
      </div>
      <div className="signup__divider"></div>
      <div className="signup__to-login">
        <p className="signup__text">
          Already have an account?{" "}
          <Link className="signup__login-link" to="/login">
            log in
          </Link>
        </p>
      </div>
    </div>
  );
}
