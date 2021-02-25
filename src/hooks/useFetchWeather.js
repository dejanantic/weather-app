import { useReducer, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getCitiesFromFirestore } from "../utils/databaseService";

function fetchWeatherReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        weatherData: action.payload,
      };
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      throw new Error("Action type not supported");
  }
}

export default function useFetchWeather() {
  const {
    currentUser: { uid },
  } = useAuth();
  const [{ weatherData, loading, error }, dispatch] = useReducer(
    fetchWeatherReducer,
    {
      weatherData: [],
      loading: true,
      error: null,
    }
  );

  useEffect(() => {
    const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    let isMounted = true;

    async function fetchCitiesCollection() {
      dispatch({ type: "FETCH_INIT" });

      try {
        const cities = [];
        const querySnapshot = await getCitiesFromFirestore(uid);

        querySnapshot.forEach((cityDoc) => {
          cities.push({
            docId: cityDoc.id,
            ...cityDoc.data(),
          });
        });

        const weatherData = await Promise.all(
          cities.map(async (city) => {
            const response = await fetch(
              `${ENDPOINT}?id=${city.id}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            return data;
          })
        );

        if (isMounted)
          dispatch({
            type: "FETCH_SUCCESS",
            payload: weatherData,
          });
      } catch (error) {
        if (isMounted)
          dispatch({
            type: "FETCH_ERROR",
            error: error,
          });
      }
    }

    fetchCitiesCollection();

    return () => {
      isMounted = false;
    };
  }, [uid]);

  console.log(weatherData, loading, error);

  return [weatherData, loading, error];
}
