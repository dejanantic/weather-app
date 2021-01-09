import React, { useReducer, useEffect } from "react";
import Details from "./Details/Details";
import Loading from "../Loading/Loading";
import Remove from "../Remove/Remove";
import { fetchSingleCityDetails, getCityName } from "../utils/api";
import queryString from "query-string";
import "./SingleCityDetails.css";

function singleCityReducer(state, action) {
  if (action.type === "success") {
    return {
      ...state,
      cityData: action.cities,
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
  const cityName = getCityName(id);
  const [{ cityData, loading, error }, dispatch] = useReducer(
    singleCityReducer,
    { cityData: null, loading: true, error: null }
  );

  useEffect(() => {
    fetchSingleCityDetails(id)
      .then((data) => dispatch({ type: "success", cities: data }))
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
    <div className="city-details">
      {loading ? (
        <Loading loadingMessage="Loading city details" />
      ) : (
        <Details cityName={cityName} cityData={cityData} />
      )}
      {loading === false && <Remove id={id} />}
    </div>
  );
}
