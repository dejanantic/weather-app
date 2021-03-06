import { useReducer, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { streamCities } from "../utils/databaseService";

function streamWeatherDataReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        weatherData: action.payload,
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

export default function useStreamWeatherData() {
  const {
    currentUser: { uid },
  } = useAuth();
  const [{ weatherData, loading, error }, dispatch] = useReducer(
    streamWeatherDataReducer,
    {
      weatherData: [],
      loading: true,
      error: null,
    }
  );

  useEffect(() => {
    let isMounted = true;
    const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    dispatch({ type: "FETCH_INIT" });

    const unsubscribe = streamCities(uid, {
      next: async (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((cityDoc) => {
          cities.push({
            docId: cityDoc.id,
            cityId: cityDoc.data().cityId,
          });
        });

        const weatherData = await Promise.all(
          cities.map(async (city) => {
            const response = await fetch(
              `${ENDPOINT}?id=${city.cityId}&appid=${API_KEY}&units=metric`
            );
            const cityWeather = await response.json();

            //* Include the document id together with the weather data so that
            //* every CityTile can have a unique key.
            return {
              docId: city.docId,
              ...cityWeather,
            };
          })
        );

        if (isMounted) {
          dispatch({
            type: "FETCH_SUCCESS",
            payload: weatherData,
          })
        }
      },
      error: (error) => {
        if (isMounted) {
          dispatch({
            type: "FETCH_ERROR",
            error: error,
          })
        }
      }
    });

    return () => {
      unsubscribe();
      isMounted = false;
    };
  }, [uid]);

  return [weatherData, loading, error]
}
