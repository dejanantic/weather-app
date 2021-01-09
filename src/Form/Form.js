import React, { useState, useRef } from "react";
import "./Form.css";
import "react-toastify/dist/ReactToastify.css";

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
    handleCityListUpdate(userInput)
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
    </form>
  );
}
