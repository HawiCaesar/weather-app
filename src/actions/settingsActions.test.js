// third-party libraries
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

// actions
import { convertToFahrenheit, convertToCelisus } from '../actions/settingsActions';

// fixtures
import { weatherProps } from '../fixtures/weatherForecast';

describe('Settings actions', () => {

  const expectedActions = [
    { type: 'CONVERT_DEGREES_TO_FARENHEIT'},
    { type: 'CONVERT_FARENHEIT_TO_DEGREES'}
  ];

  it('should dispatch CONVERT_DEGREES_TO_FARENHEIT when convertToFarenheit completes successfully', () => {

    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    store.dispatch(convertToFahrenheit(weatherProps.currentWeather, weatherProps.forecast));
    const actualActions = store.getActions();
    expect(expectedActions[0].type).toEqual(actualActions[0].type);
  });

  it('should dispatch CONVERT_FARENHEIT_TO_DEGREES when convertToCelisus completes successfully', () => {
    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    store.dispatch(convertToCelisus(weatherProps.currentWeather, weatherProps.forecast));
    const actualActions = store.getActions();
    expect(expectedActions[1].type).toEqual(actualActions[0].type);
  });
});
