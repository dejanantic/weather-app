import React, { useState, useRef } from "react";
import { saveCity } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "./Form.css";
import "react-toastify/dist/ReactToastify.css";
import "./CustomToast.css";

export default function Form({ handleCityListUpdate }) {
  const initialInput = "";
  const [userInput, setUserInput] = useState(initialInput);
  const inputRef = useRef();

  const handleChange = (event) => {
    setUserInput(inputRef.current.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserInput(initialInput);
    saveCity(userInput)
      .then(handleCityListUpdate)
      .catch((error) => toast.info(error.message));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group">
        <input
          className="form__city-input"
          type="text"
          name="city"
          placeholder="Enter a city"
          ref={inputRef}
          value={userInput}
          onChange={handleChange}
        />
        <input
          className="form__button"
          type="submit"
          value="add"
          disabled={!userInput}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </form>
  );
}
