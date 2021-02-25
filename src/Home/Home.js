import React, { useEffect, useState, useReducer } from "react";
import Header from "../Header/Header";
import Cities from "../Cities/Cities";
import Welcome from "./Welcome/Welcome";
import LastUpdate from "./LastUpdate/LastUpdate";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { getCities, saveCity } from "../utils/api";
import useFetchWeather from "../hooks/useFetchWeather";

export default function Home() {
  console.log("Home rendered");
  const [weatherData, loading, error] = useFetchWeather();
  const isWeatherDataEmpty = weatherData.length === 0 ? true : false;

  const handleCityListUpdate = (city) => {
    saveCity(city)
      // .then(() => setCityList(getCities()))
      .catch((error) => toast.error(error.message));
  };

  return (
    <>
      <Header handleCityListUpdate={handleCityListUpdate} />
      {loading ? (
        <Loading loadingMessage="Loading cities" />
      ) : (
        <>
          {isWeatherDataEmpty ? (
              <Welcome />
          ) : (
            <>
              <Cities cityData={weatherData} />
              <LastUpdate />
            </>
          )}
        </>
      )}
    </>
  );
}
