// utils
import { celsiusToFarenheit, fahrenheitToCelsius } from '../utils/celsiusFarenheitConversion';

/**
 * Convert degrees celisus to degrees farenheit
 *
 * @param currentWeatherInDegrees
 * @param forecastWeatherInDegrees
 * @return {function(*)}
 */
export const convertToFahrenheit = (currentWeatherInDegrees, forecastWeatherInDegrees) => {
  return ((dispatch) => {
    currentWeatherInDegrees.data.main.temp_min = celsiusToFarenheit(currentWeatherInDegrees.data.main.temp_min);
    currentWeatherInDegrees.data.main.temp_max = celsiusToFarenheit(currentWeatherInDegrees.data.main.temp_max);

    forecastWeatherInDegrees.list.map((forecast) => {
      forecast.main.temp_max = celsiusToFarenheit(forecast.main.temp_max);
      forecast.main.temp_min = celsiusToFarenheit(forecast.main.temp_min);
    });

    forecastWeatherInDegrees.data = forecastWeatherInDegrees;

    dispatch({ type: 'CONVERT_DEGREES_TO_FARENHEIT', payload: [currentWeatherInDegrees, forecastWeatherInDegrees] });
  });
};

/**
 * Convert degrees farenheit to degrees celisus
 *
 * @param currentWeatherInDegrees
 * @param forecastWeatherInDegrees
 * @return {function(*)}
 */
export const convertToCelisus = (currentWeatherInDegrees, forecastWeatherInDegrees) => {
  return ((dispatch) => {
    currentWeatherInDegrees.data.main.temp_min = fahrenheitToCelsius(currentWeatherInDegrees.data.main.temp_min);
    currentWeatherInDegrees.data.main.temp_max = fahrenheitToCelsius(currentWeatherInDegrees.data.main.temp_max);

    forecastWeatherInDegrees.list.map((forecast) => {
      forecast.main.temp_max = fahrenheitToCelsius(forecast.main.temp_max);
      forecast.main.temp_min = fahrenheitToCelsius(forecast.main.temp_min);
    });

    forecastWeatherInDegrees.data = forecastWeatherInDegrees;

    dispatch({ type: 'CONVERT_FARENHEIT_TO_DEGREES', payload: [currentWeatherInDegrees, forecastWeatherInDegrees] });
  });
};
