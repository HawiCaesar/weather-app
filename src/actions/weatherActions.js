// third party library
import axios from 'axios';

/**
 * Get city of the current location -  thunk and action creator
 *
 * @param lat -  latitude
 * @param lng - longitude
 * @return {function(*)}
 */
export const getLocationInfo = (lat, lng) => {
  return ((dispatch) => {
    dispatch({ type: "FETCHING_LOCATION_INFO" });
    return axios.get(process.env.API_LOCATION_URL+`/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_KEY}`)
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
 * Get current weather information - thunk and action creator
 *
 * @param cityName
 * @return {Function}
 */
export const getCurrentWeather = (cityName) => {
  return ((dispatch) => {
    return axios.get(process.env.API_WEATHER_URL+`/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`)
      .then((response) => {
        dispatch({ type: "FETCHED_CURRENT_WEATHER_INFO", payload: response });
      }).catch((error) => {
        dispatch({ type: "FAILED_FETCHING_WEATHER_INFO", payload: error });
    });
  });
};

/**
 * Get five day weather forecast - thunk and action creator
 *
 * @param cityName
 * @return {Function}
 */
export const getFiveWeatherForecast = (cityName) => {
  return ((dispatch) => {
    return axios.get(process.env.API_WEATHER_URL+`/forecast?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`)
      .then((response) => {
        dispatch({type: "FETCHED_WEATHER_FORECAST_INFO", payload: response});
      }).catch((error) => {
        dispatch({type: "FAILED_FETCHING_WEATHER_FORECAST_INFO", payload: error});
      });
  });
};
