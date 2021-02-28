import React from "react";
import Header from "../Header/Header";
import Cities from "../Cities/Cities";
import Welcome from "./Welcome/Welcome";
import LastUpdate from "./LastUpdate/LastUpdate";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";
import { fetchCity } from "../utils/helpers";
import { saveCity } from "../utils/databaseService";
import useStreamWeatherData from "../hooks/useStreamWeatherData";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [weatherData, loading, error] = useStreamWeatherData();
  const { currentUser } = useAuth();
  const isWeatherDataEmpty = weatherData.length === 0;

  const handleCityListUpdate = (city) => {
    fetchCity(city)
      .then((cityData) => {
        saveCity({
          owner: currentUser.uid,
          ...cityData,
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <Header handleCityListUpdate={handleCityListUpdate} isHome />
      {loading ? (
        <Loading loadingMessage="Fetching weather data" />
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
