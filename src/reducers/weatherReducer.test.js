// third-party library
import expect from 'expect';

// reducer
import weatherReducer from './weatherReducer';

// initial state
import { mockStore } from '../fixtures/store';

// fixtures
import { weatherProps } from '../fixtures/weatherForecast';

// utils
import { degreesToFarenheit } from '../utils/degreesToFarenheit';

describe('weatherReducer tests', () => {

  it('should return the initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual(mockStore);
  });

  it('should handle FETCHED_LOCATION_INFO action creator', () => {
    let action = {
      type: 'FETCHED_LOCATION_INFO',
      payload: [
        {
          formatted_address: 'Mirema Rd, Nairobi, Kenya'
        }
      ]
    };

    let expected = {...mockStore, fetchedCity: 'Nairobi', fetchedLocation: true};
    expect(weatherReducer(mockStore, action)).toEqual(expected);
  });

  it('should handle FAILED_FETCHING_LOCATION_INFO action creator', () => {
    let action = {
      type: 'FAILED_FETCHING_LOCATION_INFO',
      payload: {
        data: {
          error_message: 'Invalid request. Invalid latlng parameter.'
        }
      }
    };

    let expected = {...mockStore, fetchedLocation: false, locationError: 'Invalid request. Invalid latlng parameter.'};
    expect(weatherReducer(mockStore, action)).toEqual(expected);
  });

  it('should handle FETCHED_WEATHER_FORECAST_INFO action creator', () => {
    let action = {
      type: 'FETCHED_WEATHER_FORECAST_INFO',
      payload: weatherProps.forecast
    };

    let expected = {...mockStore, forecastWeather: true, forecastData: weatherProps.forecast};
    expect(weatherReducer(mockStore, action)).toEqual(expected);
  });

  it('should handle FETCHED_CURRENT_WEATHER_INFO action creator', () => {
    let action = {
      type: 'FETCHED_CURRENT_WEATHER_INFO',
      payload: weatherProps.currentWeather
    };

    let expected = {...mockStore, currentWeather: weatherProps.currentWeather};
    expect(weatherReducer(mockStore, action)).toEqual(expected);
  });

  it('should handle FAILED_FETCHING_WEATHER_INFO action creator', () => {
    let action = {
      type: 'FAILED_FETCHING_WEATHER_INFO',
      payload: {
        data: {
          message: 'city not found'
        }
      }
    };

    let expected = {...mockStore, currentWeatherError: 'city not found'};
    expect(weatherReducer(mockStore, action)).toEqual(expected);
  });

  it('should handle FAILED_FETCHING_WEATHER_FORECAST_INFO', () => {
    let action = {
      type: 'FAILED_FETCHING_WEATHER_FORECAST_INFO',
      payload: {
        data: {
          message: 'city not found'
        }
      }
    };

    let expected = {...mockStore, forecastWeather: false, forecastError: 'city not found'};
    expect(weatherReducer(mockStore, action)).toEqual(expected);
  });

  it('should handle CONVERT_DEGREES_TO_FARENHEIT', () => {
    let convertedCurrentTemperature = {...weatherProps.currentWeather.data,
      main: {
        temp_max: 24.14,
        temp_min: 23.14
      }
    };

    let listForecastTemperature = weatherProps.forecast.list.map((testForecast) => {
      testForecast.main.temp_max = degreesToFarenheit(testForecast.main.temp_max);
      testForecast.main.temp_min = degreesToFarenheit(testForecast.main.temp_min);
    });

    let convertedForecastTemperature = { data: listForecastTemperature};


    let action = {
      type: 'CONVERT_DEGREES_TO_FARENHEIT',
      payload: [
        convertedCurrentTemperature,
        convertedForecastTemperature
      ]
    };

    let expected = {...mockStore,
      currentWeather: convertedCurrentTemperature,
      forecastData: convertedForecastTemperature
    };

    expect(weatherReducer(mockStore, action)).toEqual(expected);
  });
});
