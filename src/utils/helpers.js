import countryLookup from "country-code-lookup";

function formatMessage(message) {
  if (typeof message !== "string") return "";

  return message.charAt(0).toUpperCase() + message.slice(1);
}

function getCountryCode(country) {
  const countryCapitalized = country.charAt(0).toUpperCase() + country.slice(1);
  const countryObject = countryLookup.byCountry(countryCapitalized);

  const countryCode =
    countryObject !== null ? countryObject.iso2 : countryObject;

  return countryCode;
}

// FETCHING DATA FROM OPEN WEATHER API

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export async function fetchCity({ city, country }) {
  const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
  const countryCode = getCountryCode(country);
  const query = `q=${city}${countryCode ? `,${countryCode}` : ""}`;

  const response = await fetch(
    window.encodeURI(`${ENDPOINT}?${query}&appid=${API_KEY}&units=metric`)
  );

  if (response.status !== 200) {
    const result = await response.json();
    throw new Error(formatMessage(result.message));
  } else {
    const cityData = await response.json();

    return cityData;
  }
}

export function fetchWeatherData(cities) {
  return Promise.all(cities.map((city) => fetchCity(city)));
}

export async function fetchSingleCityDetails(id) {
  const FIRST_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
  const SECOND_ENDPOINT = "https://api.openweathermap.org/data/2.5/onecall";
  try {
    let response = await fetch(
      `${FIRST_ENDPOINT}?id=${id}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    const {
      coord,
      name,
      sys: { country },
    } = data;

    response = await fetch(
      `${SECOND_ENDPOINT}?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
    );
    const weatherData = await response.json();

    return {
      name,
      country,
      weatherData,
    };
  } catch (error) {
    console.warn("Error fetching city details: ", error);
  }
}

// DATE FUNCTION
export function getTimeStamp() {
  const language = navigator.language;
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hour = date.getHours();
  const minutes = date.getMinutes();

  // Add a zero to the hour/minute if it's less than 10
  const updatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const updatedHours = hour < 10 ? `0${hour}` : hour;

  const timestamp =
    language === "en-US"
      ? `${month + "/" + day} ${updatedHours}:${updatedMinutes}`
      : `${day + "/" + month} ${updatedHours}:${updatedMinutes}`;

  return timestamp;
}

const exports = {
  fetchWeatherData,
  fetchSingleCityDetails,
  getTimeStamp,
};

export default exports;
