// third-party library
import axios from 'axios';

import { degreesToFarenheit } from '../utils/degreesToFarenheit';
import kelvinToCelsius from '../utils/kelvinToCelsius';

export const getCoordinates = () => {
  return ((dispatch) => {
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
        response.data.main.temp_min = kelvinToCelsius(response.data.main.temp_max);
        response.data.main.temp_max = kelvinToCelsius(response.data.main.temp_max);
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
 * @return {Function}s
 */
export const getFiveDayWeatherForecast = (cityName) => {
  return ((dispatch) => {
    return axios.get(process.env.API_WEATHER_URL+`/forecast?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`)
      .then((response) => {
        response.data.list.map((weather) => {
          weather.main.temp_max = kelvinToCelsius(weather.main.temp_max);
          weather.main.temp_min = kelvinToCelsius(weather.main.temp_min);
        });

        dispatch({ type: 'FETCHED_WEATHER_FORECAST_INFO', payload: response });
      }).catch((error) => {
        dispatch({ type: 'FAILED_FETCHING_WEATHER_FORECAST_INFO', payload: error });
      });
  });
};

/**
 * Convert degrees to farenheit
 *
 * @param currentWeatherInDegrees
 * @param forecastWeatherInDegrees
 * @return {function(*)}
 */
export const convertToFarenheit = (currentWeatherInDegrees, forecastWeatherInDegrees) => {
  return ((dispatch) => {

    currentWeatherInDegrees.data.main.temp_min = degreesToFarenheit(currentWeatherInDegrees.data.main.temp_min);
    currentWeatherInDegrees.data.main.temp_max = degreesToFarenheit(currentWeatherInDegrees.data.main.temp_max);

    forecastWeatherInDegrees.list.map((forecast) => {
      forecast.main.temp_max = degreesToFarenheit(forecast.main.temp_max);
      forecast.main.temp_min = degreesToFarenheit(forecast.main.temp_min);
    });

    forecastWeatherInDegrees.data = forecastWeatherInDegrees;

    dispatch({ type: 'CONVERT_DEGREES_TO_FARENHEIT', payload: [currentWeatherInDegrees, forecastWeatherInDegrees] });
  });
};
