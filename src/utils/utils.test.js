// third-party library
import expect from 'expect';

// utility functions
import {
  dateTimeExtraction,
  milisecondsToDateTime
} from './datetimeConvertUtil';
import kelvinToCelsius  from '../utils/kelvinToCelsius';

describe('Utility logic tests', () => {

  it('should extract the date and time from API timestamp', () => {
    let apiTimestamp = '2018-02-16 09:00:00';
    let expected = ['2018-02-16', '09:00:00'];

    expect(dateTimeExtraction(apiTimestamp)[0]).toEqual(expected[0]);
    expect(dateTimeExtraction(apiTimestamp)[1]).toEqual(expected[1]);
  });

  it('should extract the day from miliseconds to date', () => {
    let apiMiliseconds = 1519722000;
    let expected = ['Tuesday', '09:00:00'];

    expect(milisecondsToDateTime(apiMiliseconds)[0]).toEqual(expected[0]);
    expect(milisecondsToDateTime(apiMiliseconds)[1]).toEqual(expected[1]);
  });

  it('should convert temperature in kelvin to temperature in degrees celsius', () => {
    let apiKelvinTemperature = 294.91;
    let expected = 21.76;

    expect(kelvinToCelsius(apiKelvinTemperature), expected);
  });
});
