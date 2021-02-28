import React, { useState, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

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

    const promises = [];
    setError("");
    setLoading(true)

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        toast.success("Profile updated")
      })
      .catch((error) => {
        console.log(error.message)
        toast.error("Failed to update account")
      })
      .finally(() => {
        setLoading(false);
        passwordRef.current.value = "";
        passwordConfirmRef.current.value = "";
      })
  }

  return (
    <div className="update-profile">
      <div className="update-profile__form-container">
        <form className="update-profile__form" onSubmit={handleSubmit}>
          <div className="update-profile__form-group">
            <input
              ref={emailRef}
              className="update-profile__form-control"
              aria-label="email"
              type="email"
              name="email"
              defaultValue={currentUser.email}
              required
            />
          </div>
          <div className="update-profile__form-group">
            <input
              ref={passwordRef}
              className="update-profile__form-control"
              aria-label="password"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="update-profile__form-group">
            <input
              ref={passwordConfirmRef}
              className="update-profile__form-control"
              aria-label="confirm-password"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              required
            />
          </div>
          <div className="update-profile__form-group">
            <button
              disabled={loading}
              type="submit"
              className="update-profile__form-submit"
              onClick={handleSubmit}
            >
              update profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
