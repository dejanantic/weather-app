import React, { useRef } from "react";
// import { Link } from "react-router-dom";
import Form from "../Form/Form";
import { FaCog, FaPlus } from "react-icons/fa";
import "./Header.css";

export default function Header({ handleCityListUpdate }) {
  const formContainerRef = useRef(null);

  return (
    <div className="header">
      <div className="logo">
        <span className="logo__text">
          Weather
          <span className="logo__emoji" role="img" aria-label="sun">
            🌞
          </span>
        </span>
      </div>

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
      </div>
    </div>
  );
}
