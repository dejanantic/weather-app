// LOCAL STORAGE API

export function getCities() {
  return window.JSON.parse(localStorage.getItem('cities')) || []
}

function updateCities(newCities) {
  window.localStorage.setItem("cities", JSON.stringify(newCities))
}

export function saveCity(city) {
  const cities = getCities()

  const newCities = [...cities, city]

  updateCities(newCities)
}

export function deleteCity(removedCity) {
  const cities = getCities()

  const newCities = cities.filter(city => city !== removedCity)

  updateCities(newCities)
}

// FETCHING DATA FROM OPEN WEATHER API

const API_KEY = `62291214aadba36c71c5189a3b5c7dcf`
const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather'

function fetchCity(city) {
  return fetch(window.encodeURI(`${ENDPOINT}?q=${city}&appid=${API_KEY}&units=metric`))
    .then(res => res.json())
    .then(city => {
      if (city.message) {
        throw new Error(city.message)
      }

      return city
    })
}

export function fetchWeatherData(cities) {
  // Returns an array of cities as objects with weather data inside
  if (cities.length === 0) return

  return Promise.all(cities.map(city => fetchCity(city)))
}

const exports = {getCities, saveCity, deleteCity, fetchWeatherData}

export default exports