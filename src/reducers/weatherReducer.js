export default function (state = {
  fetched_location: false,
  fetching_location: false,
  location_error: null,
  fetched_city: "",
  fetching_city: false,
  city_error: null,
  forecast_weather: false,
  fetching_error: null,
  forecast_error: null,
  forecast_data: null,
  current_weather: null,
  current_weather_error: null
}, action) {

  switch (action.type) {
    case "FETCHING_LOCATION_INFO":
      return {...state, fetching_location: true};
    case "LOCATION_RESULTS":
      return {...state, fetching_location: false, fetched_location: true};
    case "FAILED_FETCHING_LOCATION":
      return {...state, fetched_location: false, location_error: action.payload};
    case "FETCHING_CITY_INFO":
      return {...state, fetching_city: true};
    case "FETCHED_CITY_INFO": {
      return {
        ...state,
        fetching_city: false,
        fetched_city: action.payload[0]['formatted_address'].split(", ")[1]
      };
    }
    case "FAILED_FETCHING_CITY_INFO":
      return {...state, city_error: action.payload};
    case "FETCHED_WEATHER_FORECAST_INFO":
      return {...state, forecast_weather: true, forecast_data: action.payload};
    case "FETCHED_CURRENT_WEATHER_INFO":
      return {...state, current_weather: action.payload};
    case "FAILED_FETCHING_WEATHER_INFO":
      return {...state, current_weather_error: true, fetching_error: action.payload};
    case "FAILED_FETCHING_WEATHER_FORECAST_INFO":
      return {...state, forecast_weather: false, forecast_error: action.payload};
  }
  return state;
}
