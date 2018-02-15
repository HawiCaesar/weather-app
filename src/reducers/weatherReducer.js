export default function (state = {
  fetchedLocation: false,
  fetchedCity: "",
  locationError: null,
  forecastWeather: false,
  fetchingError: null,
  forecastError: null,
  forecastData: null,
  currentWeather: null,
  currentWeatherError: null
}, action) {

  switch (action.type) {
    case "FETCHED_LOCATION_INFO": {
      return {
        ...state,
        fetchedLocation: true,
        fetchedCity: action.payload[0]["formatted_address"].split(", ")[1]
      };
    }
    case "FAILED_FETCHING_LOCATION_INFO":
      return {...state, locationError: action.payload.data.error_message};
    case "FETCHED_WEATHER_FORECAST_INFO":
      return {...state, forecastWeather: true, forecastData: action.payload};
    case "FETCHED_CURRENT_WEATHER_INFO":
      return {...state, currentWeather: action.payload};
    case "FAILED_FETCHING_WEATHER_INFO":
      return {...state, currentWeatherError: action.payload.data.message};
    case "FAILED_FETCHING_WEATHER_FORECAST_INFO":
      return {...state, forecastWeather: false, forecastError: action.payload.data.message};
  }
  return state;
}
