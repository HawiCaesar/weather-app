export default function (state = {
  fetched_location: false,
  fetched_city: "",
  location_error: null,
  forecast_weather: false,
  fetching_error: null,
  forecast_error: null,
  forecast_data: null,
  current_weather: null,
  current_weather_error: null
}, action) {

  switch (action.type) {
    case "FETCHED_LOCATION_INFO": {
      return {
        ...state,
        fetched_location: true,
        fetched_city: action.payload[0]['formatted_address'].split(", ")[1]
      };
    }
    case "FAILED_FETCHING_LOCATION_INFO":
      return {...state, location_error: action.payload};
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
