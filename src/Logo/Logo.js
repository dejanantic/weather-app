import React from "react";
import './Logo.css'

export default function Logo() {
  return (
    <div className="logo">
      <span className="logo__text">
        Weather
        <span className="logo__emoji" role="img" aria-label="sun">
          🌞
        </span>
      </span>
    </div>
  );
}