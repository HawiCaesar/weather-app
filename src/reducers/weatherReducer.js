export default function (state = {
  fetched_location: false,
  fetching_location: false,
  location_error: null,
  fetched_city: false,
  fetching_city: false,
  city_error: null,
  fetched_weather: false,
  fetching_weather: false,
  weather_error: null,
  weather_data: null
}, action) {

  switch (action.type) {

    case "FETCHING LOCATION INFO":
      return [...state, {fetching_location: true}];

    case "LOCATION RESULTS":
      return [...state, {fetching_location: false, fetched_location: true}];

    case "FAILED FETCHING LOCATION":
      return [...state, {fetched_location: false, location_error: action.payload}];

    case "FETCHING CITY INFO":
      return [...state, {fetching_city: true}];

    case "FETCHED CITY INFO":
      return [...state,
        {
          fetching_city: false,
          fetched_city: true
        }];

    case "FAILED FETCHING CITY INFO":
      return [...state, {city_error: action.payload}];


    case "FETCHED WEATHER INFO":
      return [...state, {fetched_weather: true, weather_data: action.payload}];


    case "FAILED FETCHING WEATHER INFO":
      return [...state, {fetched_weather: false, weather_error: action.payload}];

  }


  return state;
}
