import React, { useReducer, useEffect } from "react";
import Details from "./Details/Details";
import Loading from "../Loading/Loading";
import { fetchSingleCityDetails } from "../../utils/helpers";
import queryString from "query-string";
import "./SingleCityDetails.css";

function singleCityReducer(state, action) {
  if (action.type === "success") {
    return {
      ...state,
      cityData: action.data,
      loading: false,
    };
  } else if (action.type === "error") {
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
      .then((data) => dispatch({ type: "success", data }))
      .catch((error) => dispatch({ type: "error", message: error.message }));
  }, [id]);

  if (error !== null) {
    return (
      <>
        <p>
          There was a problem getting city's data. Please try refreshing the
          page.
        </p>
        <pre>error</pre>
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
            cityName={{ name: cityData.name, country: cityData.country }}
            weatherData={cityData.weatherData}
          />
        </div>
      )}
    </>
  );
}
