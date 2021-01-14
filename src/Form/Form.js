import React, { useState, useRef } from "react";
// import { FaSearch } from 'react-icons/fa'
import "./Form.css";

export default function Form({ handleCityListUpdate, cityRef }) {
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
          className="form__input"
          type="text"
          name="city"
          id="city"
          placeholder="city"
          ref={inputRef}
          value={userInput}
          onChange={handleChange}
        />
        <input
          className="form__input"
          type="text"
          name="country"
          id="country"
          placeholder="country"
          // insert methods
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
