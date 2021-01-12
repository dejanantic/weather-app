import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import { FaCog } from "react-icons/fa";
import "./Header.css";

export default function Header({ handleCityListUpdate }) {
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

      <Form handleCityListUpdate={handleCityListUpdate} />

      {/* Make cog icon a link to settings page */}
      <FaCog className="header__icon" />
    </div>
  );
}
