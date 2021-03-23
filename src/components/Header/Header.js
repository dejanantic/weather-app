import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../Logo/Logo";
import Form from "../Form/Form";
import { useAuth } from "../../contexts/AuthContext";
import { FaCog, FaPlus, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";
import { toast } from "react-toastify";

function Header({ handleCityListUpdate, isHome }) {
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
      <Link className="header__logo-link" to="/">
        <Logo />
      </Link>
      <div className="header__form-container" ref={formContainerRef}>
        <Form handleCityListUpdate={handleCityListUpdate} />
      </div>

      <nav className="header__nav">
        <ul className="header__nav-container">
          {isHome && (
            <li className="header__nav-item">
              <button
                className="header__nav-button"
                onClick={() =>
                  formContainerRef.current.querySelector("#city").focus()
                }
              >
                <FaPlus id="add-city" className="header__icon" />
              </button>
            </li>
          )}
          <li className="header__nav-item">
            <Link className="header__nav-link" to="/settings">
              <FaCog id="settings" className="header__icon" />
            </Link>
          </li>
          <li className="header__nav-item">
            <button className="header__nav-button">
              <FaSignOutAlt
                id="logout"
                className="header__icon"
                onClick={() => handleLogout()}
              />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Header.propTypes = {
  handleCityListUpdate: PropTypes.func,
  isHome: PropTypes.bool,
};

export default Header;
