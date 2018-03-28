// third-party library
import axios from 'axios';
//import { checkCacheValid } from 'redux-cache';
import { weatherDetails } from "../fixtures/weather";

//import { store } from '../store';

/**
 * getCoordinates - fetches the coordinates of the current location
 *
 * @return {type} Description
 */
export const getCoordinates = () => {
  return ((dispatch) => {
    //const isCacheValid = checkCacheValid(getState, "weather");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          dispatch(getLocationInfo(lat, lng));
        });
      } else {
        alert('Geo location NOT Supported by this device');
      }

  });
};

/**
 * Get city of the current location -  thunk and action creator
 *
 * @param lat -  latitude
 * @param lng - longitude
 * @return {function(*)}
 */
export const getLocationInfo = (lat, lng) => {
  return ((dispatch) => {
    return axios.get(process.env.API_LOCATION_URL+`/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_KEY}`)
      .then((response) => {
        dispatch({ type: "FETCHED_LOCATION_INFO", payload: response.data.results });

        dispatch(getCurrentWeather(response.data.results[0]['formatted_address'].split(', ')[1]));
        dispatch(getFiveDayWeatherForecast(response.data.results[0]['formatted_address'].split(', ')[1]));
      }).catch((error) => {
        dispatch({ type: 'FAILED_FETCHING_LOCATION_INFO', payload: error });
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
        dispatch({ type: 'FETCHED_CURRENT_WEATHER_INFO', payload: response });
      }).catch((error) => {
        dispatch({ type: 'FAILED_FETCHING_WEATHER_INFO', payload: error });
    });
  });
};

/**
 * Get five day weather forecast - thunk and action creator
 *
 * @param cityName
 * @return {Function}
 */
export const getFiveDayWeatherForecast = (cityName) => {
  return ((dispatch) => {
    return axios.get(process.env.API_WEATHER_URL+`/forecast?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`)
      .then((response) => {
        dispatch({ type: 'FETCHED_WEATHER_FORECAST_INFO', payload: response });
      }).catch((error) => {
        dispatch({ type: 'FAILED_FETCHING_WEATHER_FORECAST_INFO', payload: error });
      });
  });
};
