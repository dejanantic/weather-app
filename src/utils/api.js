// LOCAL STORAGE API

export function getCities() {
  return window.JSON.parse(localStorage.getItem('cities')) || []
}

function updateCities(newCities) {
  window.localStorage.setItem("cities", JSON.stringify(newCities))
}

function massageCity(city) {
  const {name, id, coord} = city
  return {
    name: name,
    id: id,
    coord: coord
  }
}

export async function saveCity(inputCity) {
  try {
    const cities = getCities()
  
    const fetchedCity = await fetchCity(inputCity.toLowerCase())
    const massagedCity = massageCity(fetchedCity)
  
    const isCityInDatabase = cities.some(city => city.id === fetchedCity.id)
  
    if (isCityInDatabase) {
      console.warn('City already in database')
    } else {
      const newCities = [...cities, massagedCity]
  
      updateCities(newCities)
    }
  } catch(error) {
    console.warn('Error from saveCity function:', error)
  }
}

export function deleteCity(removedCity) {
  const cities = getCities()

  const newCities = cities.filter(city => city !== removedCity)

  updateCities(newCities)
}

// FETCHING DATA FROM OPEN WEATHER API

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

async function fetchCity(city) {
  try {
    const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather'
    // Check whether city is a string (used to save the city) or an object (saved city)
    const query = city instanceof Object ? city.name : city

    if (query === undefined) throw new Error('Bad request')

    const response = await fetch(window.encodeURI(`${ENDPOINT}?q=${query}&appid=${API_KEY}&units=metric`))
    
    const result = await response.json()

    return result
  } catch (error) {
    console.warn('Error in fetchCity function:', error.message)
  }
}

export function fetchWeatherData(cities) {
  // Returns an array of cities as objects with weather data inside
  if (cities.length === 0) return

  return Promise.all(cities.map(city => fetchCity(city)))
}

export async function fetchSingleCityDetails(lat, lon) {
  try {
    const ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall'
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
  saveCity,
  deleteCity,
  fetchWeatherData,
  fetchSingleCityDetails,
  getTimeStamp
}

export default exports