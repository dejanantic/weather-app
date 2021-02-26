import React, { useEffect, useState, useReducer } from "react";
import Header from "../Header/Header";
import Cities from "../Cities/Cities";
import Welcome from "./Welcome/Welcome";
import LastUpdate from "./LastUpdate/LastUpdate";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { fetchCity } from "../utils/helpers";
import { saveCity as saveDB } from "../utils/databaseService"
import useFetchWeather from "../hooks/useFetchWeather";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [weatherData, loading, error] = useFetchWeather();
  const { currentUser } = useAuth();
  const isWeatherDataEmpty = weatherData.length === 0;

  const handleCityListUpdate = (city) => {
    fetchCity(city)
      .then((cityData) => {
        saveDB({
          owner: currentUser.uid,
          ...cityData
        })
      })
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
              <Cities weatherData={weatherData} />
              <LastUpdate />
            </>
          )}
        </>
      )}
    </>
  );
}
