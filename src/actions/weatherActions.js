import LocationService from "../services/locationService";
import WeatherService from "../services/weatherService";

/**
 * Get city of the current location -  thunk
 *
 * @param lat -  latitude
 * @param lng - longitude
 * @return {function(*)}
 */
export const getLocationInfo = (lat, lng) => {
  return ((dispatch) => {
    dispatch({ type: "FETCHING_LOCATION_INFO" });
    return LocationService.get(`latlng=${lat},${lng}&key=${process.env.GOOGLE_KEY}`)
      .then((response) => {
        dispatch({ type: "LOCATION_RESULTS" });
        dispatch({ type: "FETCHED_CITY_INFO", payload: response.data.results });

        dispatch(getCurrentWeather(response.data.results[0]['formatted_address'].split(", ")[1]));
        dispatch(getFiveWeatherForecast(response.data.results[0]['formatted_address'].split(", ")[1]));
      }).catch((error) => {
        dispatch({ type: "FAILED_FETCHING_CITY_INFO", payload: error });
      });
  });
};

/**
 * Get current weather information - thunk
 *
 * @param dispatch
 * @param cityName
 * @return {Function}
 */
export const getCurrentWeather = (cityName) => {
  return WeatherService.getCurrent(`q=${cityName}&appid=${process.env.WEATHER_API_KEY}`)
    .then((response) => {
      return { type: "FETCHED_CURRENT_WEATHER_INFO", payload: response };
    }).catch((error) => {
      return { type: "FAILED_FETCHING_WEATHER_INFO", payload: error };
  });
};

/**
 * Get five day weather forecast - thunk
 *
 * @param dispatch
 * @param cityName
 * @return {Function}
 */
export const getFiveWeatherForecast = (cityName) => {
  return WeatherService.getForecast(`q=${cityName}&appid=${process.env.WEATHER_API_KEY}`)
    .then((response) => {
      return { type: "FETCHED_WEATHER_FORECAST_INFO", payload: response };
    }).catch((error) => {
      return { type: "FAILED_FETCHING_WEATHER_FORECAST_INFO", payload: error };
    });
};

// /**
//  * Get current location of app - thunk
//  *
//  * @param dispatch
//  * @param lat - latitude
//  * @param lng - longitude
//  * @return {Function}
//  */
// export const getCurrentLocation = (lat, lng) => {
//   // return LocationService.get(`latlng=${lat},${lng}&key=${process.env.GOOGLE_KEY}`)
//   //   .then((response) => {
//   //     dispatch({ type: "FETCHED CITY INFO", payload: response.data.results });
//   //     let split_values = response.data.results[0]['formatted_address'];
//   //     let city_name = split_values.split(", ");
//   //     //console.log(city_name)
//   //     // Get Current Weather at the current time
//   //     //getCurrentWeather(dispatch, city_name);
//   //   }).catch((error) => {
//   //     dispatch({ type: "FAILED FETCHING CITY INFO", payload: error });
//   //   });
// };
