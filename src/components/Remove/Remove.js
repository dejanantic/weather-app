import React from "react";
import { Link } from "react-router-dom";
import { deleteCity } from "../utils/helpers";
import "./Remove.css";

export default function Remove({ id }) {
  return (
    <div className="remove-container">
      <Link className="remove-city" to="/" onClick={() => deleteCity(id)}>
        Remove city
      </Link>
    </div>
  );
}