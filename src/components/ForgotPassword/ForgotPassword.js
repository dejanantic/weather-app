import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "../Logo/Logo";
import { toast } from "react-toastify";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const emailRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      toast.info("Check your inbox for further instructions.")
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
    }

    setLoading(false);
  }

  return (
    <div className="forgot">
      <header className="forgot__header">
        <Logo />
      </header>
      <div className="forgot__form-container">
        <form className="forgot__form" onSubmit={handleSubmit}>
          <div className="forgot__form-group">
            <input
              ref={emailRef}
              className="forgot__form-control"
              aria-label="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="forgot__form-group">
            <button
              disabled={loading}
              type="submit"
              className="forgot__form-submit"
              onClick={handleSubmit}
            >
              reset password
            </button>
          </div>
        </form>
      </div>
      <div className="forgot__divider"></div>
      <div className="forgot__to-login">
        <p className="forgot__text">
          Go to {" "}
          <Link className="forgot__login-link" to="/login">
            log in
          </Link>
        </p>
      </div>
    </div>
  );
}
