import React, { useReducer, useEffect } from "react";
import Details from "./Details/Details";
import Loading from "../Loading/Loading";
import { fetchSingleCityDetails } from "../../utils/helpers";
import queryString from "query-string";
import "./SingleCityDetails.css";

function singleCityReducer(state, action) {
  if (action.type === "FETCH_SUCCESS") {
    return {
      ...state,
      cityData: action.data,
      loading: false,
    };
  } else if (action.type === "FETCH_ERROR") {
    return {
      ...state,
      error: action.message,
      loading: false,
    };
  } else {
    throw new Error("Action type not supported");
  }
}

export default function SingleCityDetail() {
  const { id } = queryString.parse(window.location.search);
  const [{ cityData, loading, error }, dispatch] = useReducer(
    singleCityReducer,
    { cityData: null, loading: true, error: null }
  );

  useEffect(() => {
    fetchSingleCityDetails(id)
      .then((data) => dispatch({ type: "FETCH_SUCCESS", data }))
      .catch((error) =>
        dispatch({ type: "FETCH_ERROR", message: error.message })
      );
  }, [id]);

  if (error !== null) {
    return (
      <>
        <p>
          There was a problem getting city's data. Please try refreshing the
          page.
        </p>
        <pre>{error}</pre>
      </>
    );
  }

  return (
    <>
      {loading ? (
        <Loading loadingMessage="Loading city details" />
      ) : (
        <div className="city-details">
          <Details
            name={cityData.name}
            country={cityData.country}
            weatherData={cityData.weatherData}
          />
        </div>
      )}
    </>
  );
}
