import countryLookup from 'country-code-lookup'

// FIRESTORE

export function getCities() {
  return window.JSON.parse(localStorage.getItem('cities')) || []
}

function updateCities(newCities) {
  window.localStorage.setItem("cities", JSON.stringify(newCities))
}

export function deleteCity(cityId) {
  const cities = getCities();

  const newCities = cities.filter((city) => city.id !== Number(cityId));

  updateCities(newCities);
}

function massageCity(city) {
  const {name, id, coord, sys: { country }} = city
  return {
    name,
    country,
    id,
    coord
  }
}

export function getCityName(id) {
  const cities = getCities()

  const city = cities.filter(city => city.id === Number(id))

  const [{ name, country }] = city

  return { name, country }
}

function getCityCoordinates(id) {
  const cities = getCities()

  const city = cities.filter(city => city.id === Number(id))

  const [{ coord: { lon, lat } }] = city

  return {
    lon,
    lat
  }
}

function formatMessage(message) {
  if (typeof message !== 'string') return ''

  return message.charAt(0).toUpperCase() + message.slice(1)
}

function getCountryCode(country) {
  const countryCapitalized = country.charAt(0).toUpperCase() + country.slice(1)
  const countryObject = countryLookup.byCountry(countryCapitalized)

  const countryCode = countryObject !== null ? countryObject.iso2 : countryObject

  return countryCode;
}

export async function saveCity(cityDetails) {
  try {
    const cities = getCities()
    const { city, country } = cityDetails
    const countryCode = getCountryCode(country)

    const fetchedCity = await fetchCity({ city, countryCode })
    const massagedCity = massageCity(fetchedCity)
  
    const isCityInDatabase = cities.some(city => city.id === fetchedCity.id)
  
    if (isCityInDatabase) {
      throw new Error("City already in database");
    } else {
      const newCities = [...cities, massagedCity]
  
      updateCities(newCities)
    }
  } catch(error) {
    throw error
  }
}

// FETCHING DATA FROM OPEN WEATHER API

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export async function fetchCity({city, country}) {
  const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
  const countryCode = getCountryCode(country)
  const query = `q=${city}${countryCode ? `,${countryCode}` : ''}`;

  const response = await fetch(
    window.encodeURI(`${ENDPOINT}?${query}&appid=${API_KEY}&units=metric`)
  );

  if (response.status !== 200) {
    const result = await response.json()
    throw new Error(formatMessage(result.message))
  } else {
    const cityData = await response.json()

    return cityData;
  }
}

export function fetchWeatherData(cities) {

  return Promise.all(cities.map(city => fetchCity(city)))
}

export async function fetchSingleCityDetails(id) {
  try {
    const ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall'
    const { lat, lon } = getCityCoordinates(id)
    const response = await fetch(
      `${ENDPOINT}?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
    )
    const cityData = await response.json()

    return cityData
  } catch (error) {
    console.warn('Error fetching city details: ', error)
  }
}

// DATE FUNCTION

export function getTimeStamp() {
  const language = navigator.language
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const hour = date.getHours()
  const minutes = date.getMinutes()

  // Add a zero to the hour/minute if it's less than 10
  const updatedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const updatedHours = hour < 10 ? `0${hour}` : hour

  const timestamp = language === 'en-US'
    ? `${(month + '/' + day)} ${updatedHours}:${updatedMinutes}`
    : `${(day + '/' + month)} ${updatedHours}:${updatedMinutes}`

  return timestamp
}

const exports = {
  getCities,
  getCityName,
  saveCity,
  deleteCity,
  fetchWeatherData,
  fetchSingleCityDetails,
  getTimeStamp
}

export default exports