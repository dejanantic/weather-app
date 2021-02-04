import React, { useState, useRef } from "react";
import Logo from "../Logo/Logo";
import "./Signup.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <div className="signup">
      <header className="signup__header">
        <Logo />
      </header>
      <div className="signup__form-container">
        <form className="signup__form">
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
            <button type="submit" className="signup__form-submit">
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
