import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Form.css";

function Form({ handleCityListUpdate }) {
  const [userInput, setUserInput] = useState({
    city: "",
    country: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setUserInput((state) => ({
      ...state,
      [event.target.name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCityListUpdate(userInput);
    setUserInput({
      city: "",
      country: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group">
        <input
          className="form__input"
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={userInput.city}
          onChange={handleChange}
        />
        <input
          className="form__input"
          type="text"
          name="country"
          id="country"
          placeholder="Country"
          value={userInput.country}
          onChange={handleChange}
        />
        <input
          className="form__button"
          type="submit"
          value="add"
          disabled={!userInput.city}
        />
      </div>
    </form>
  );
}

Form.propTypes = {
  handleCityListUpdate: PropTypes.func,
};

export default Form;
