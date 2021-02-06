import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import { useAuth } from "../contexts/AuthContext";
import { FaCog, FaPlus, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import { toast } from "react-toastify";

export default function Header({ handleCityListUpdate }) {
  const { logout } = useAuth();
  const history = useHistory();
  const formContainerRef = useRef(null);

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      toast.error("Failed to log out");
    }
  }

  return (
    <div className="header">
      <Logo />
      <div className="header__form-container" ref={formContainerRef}>
        <Form handleCityListUpdate={handleCityListUpdate} />
      </div>

      <div className="header__icons">
        <FaPlus
          className="header__icon"
          onClick={() =>
            formContainerRef.current.querySelector("#city").focus()
          }
        />
        <FaCog className="header__icon" />
        <FaSignOutAlt className="header__icon" onClick={() => handleLogout()} />
      </div>
    </div>
  );
}
