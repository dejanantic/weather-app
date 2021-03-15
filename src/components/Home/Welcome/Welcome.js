import React from "react";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="welcome">
      Hello! Add your first
      <span className="welcome__emoji" role="img" aria-label="city">
        🏙️
      </span>
    </div>
  );
}
