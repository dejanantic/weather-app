import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../Logo/Logo";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

export default function Signup() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      toast.error(error);
      passwordRef.current.value = "";
      passwordRef.current.focus();
      passwordConfirmRef.current.value = "";
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      setError("Failed to create an account.");
      toast.error(e.message);
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
          <a href="#" className="signup__login-link">
            log in
          </a>
        </p>
      </div>
    </div>
  );
}
