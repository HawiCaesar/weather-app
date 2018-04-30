import { weatherProps } from './weatherForecast';

export const weatherDetails = {
  currentWeather: weatherProps.currentWeather,
  forecastData: {
    data: weatherProps.forecast
  },
  fetchedCity: weatherProps.city
};
