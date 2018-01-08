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
    case "FETCHING LOCATION INFO":
      return {...state, fetching_location: true};
    case "LOCATION RESULTS":
      return {...state, fetching_location: false, fetched_location: true};
    case "FAILED FETCHING LOCATION":
      return {...state, fetched_location: false, location_error: action.payload};
    case "FETCHING CITY INFO":
      return {...state, fetching_city: true};
    case "FETCHED CITY INFO": {
      return {
        ...state,

        fetching_city: false,
        fetched_city: action.payload[0]['formatted_address'].split(", ")[1]
      };
    }
    case "FAILED FETCHING CITY INFO":
      return {...state, city_error: action.payload};
    case "FETCHED WEATHER FORECAST INFO":
      return {...state, forecast_weather: true, forecast_data: action.payload};
    case "FETCHED CURRENT WEATHER INFO":
      return {...state, current_weather: action.payload};
    case "FAILED FETCHING WEATHER INFO":
      return {...state, current_weather_error: true, fetching_error: action.payload};
    case "FAILED FETCHING WEATHER FORECAST INFO":
      return {...state, forecast_weather: false, forecast_error: action.payload};
  }
  return state;
}
