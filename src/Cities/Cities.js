import React, { useEffect, useReducer } from "react";
import { fetchWeatherData } from "../utils/api";
import CityTile from "./CityTile/CityTile";
import Loading from "../Loading/Loading";
import "./Cities.css";

function citiesReducer(state, action) {
  if (action.type === "success") {
    return {
      ...state,
      cities: action.cities,
      loading: false,
    };
  } else if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: action.message,
    };
  } else {
    throw new Error("Action type not supported");
  }
}

export default function Cities({ cityList }) {
  const [{ cities, loading, error }, dispatch] = useReducer(citiesReducer, {
    cities: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchWeatherData(cityList)
      .then((cities) => {
        dispatch({ type: "success", cities });
      })
      .catch((error) => {
        dispatch({ type: "error", message: error.message });
      });
  }, [cityList]);

  if (error) {
    return <p className="cities__error">{error}</p>;
  }

  return (
    <>
      <ul className="cities-grid">
        {loading === true ? (
          <Loading loadingMessage="Loading cities" speed={600} />
        ) : (
          cities.map((city) => (
            <li className="cities-grid__city" key={city.id}>
              <CityTile city={city} />
            </li>
          ))
        )}
      </ul>
    </>
  );
}
