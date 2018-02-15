// third-party libraries
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import axios from 'axios';
import sinon from 'sinon';

// actions
import {
  getLocationInfo,
  getCurrentWeather,
  getFiveDayWeatherForecast
} from "./weatherActions";

let sandbox;
let server;

describe('Weather actions', () => {

  const expectedActions = [
    { type: "FETCHED_LOCATION_INFO"},
    { type: "FAILED_FETCHING_LOCATION_INFO" },
    { type: "FETCHED_CURRENT_WEATHER_INFO" },
    { type: "FAILED_FETCHING_WEATHER_INFO" },
    { type: "FETCHED_WEATHER_FORECAST_INFO" },
    { type: "FAILED_FETCHING_WEATHER_FORECAST_INFO" }
  ];

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = sandbox.useFakeServer();

  });

  afterEach(() => {
    server.restore();
    sandbox.restore();
  });

  it('should dispatch FETCHED_LOCATION_INFO when getLocationInfo completes successfully', (done) => {

    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    const resolvedSucess = new Promise(
      (resolve, reject) => resolve({
        data: {
          results: [
            {
              formatted_address: "Mirema Rd, Nairobi, Kenya"
            }
          ]
        }
      }));

    sandbox.stub(axios, 'get').returns(resolvedSucess);

    store.dispatch(getLocationInfo(-1.2177265, 36.8829831)).then(() => {
       const actualActions = store.getActions();

       expect(expectedActions[0].type).toEqual(actualActions[0].type);
       done();
    });
  });

  it('should dispatch FAILED_FETCHING_LOCATION_INFO when getLocationInfo fails', (done) => {

    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    const rejectError = new Promise(
      (resolve, reject) => reject({
        data: {
          results: []
        }
      }));

    sandbox.stub(axios, 'get').returns(rejectError);

    store.dispatch(getLocationInfo(0, 0)).then(() => {
      const actualActions = store.getActions();

      //console.log(actualActions)

      expect(expectedActions[1].type).toEqual(actualActions[0].type);
      done();
    });
  });

  it('should dispatch FETCHED_CURRENT_WEATHER_INFO when getCurrentWeather completes successfully', (done) => {

    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    const resolveWeatherSuccess = new Promise(
      (resolve, reject) => resolve({
        data: {
          weather: [{id: 803, main: "Clouds", description: "broken clouds", icon: "04d"}]
        }
      }));

    sandbox.stub(axios, 'get').returns(resolveWeatherSuccess);

    store.dispatch(getCurrentWeather('Nairobi')).then(() => {
      const actualActions = store.getActions();
      expect(expectedActions[2].type).toEqual(actualActions[0].type);
      done();
    });
  });

  it('should dispatch FAILED_FETCHING_WEATHER_INFO when getCurrentWeather fails', (done) => {

    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    const resolveWeatherSuccess = new Promise(
      (resolve, reject) => reject({
        data: {}
      }));

    sandbox.stub(axios, 'get').returns(resolveWeatherSuccess);

    store.dispatch(getCurrentWeather('FREP')).then(() => {
      const actualActions = store.getActions();
      expect(expectedActions[3].type).toEqual(actualActions[0].type);
      done();
    });
  });

  it('should dispatch FETCHED_WEATHER_FORECAST_INFO when getFiveDayWeatherForecast completes successfully', (done) => {

    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    const resolveForecastSuccess = new Promise(
      (resolve, reject) => resolve({
        data: {}
      }));

    sandbox.stub(axios, 'get').returns(resolveForecastSuccess);

    store.dispatch(getFiveDayWeatherForecast('Nairobi')).then(() => {
      const actualActions = store.getActions();
      expect(expectedActions[4].type).toEqual(actualActions[0].type);
      done();
    });
  });

  it('should dispatch FAILED_FETCHING_WEATHER_FORECAST_INFO when getFiveDayWeatherForecast fails', (done) => {

    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    const resolveForecastSuccess = new Promise(
      (resolve, reject) => reject({
        data: {
          cod:"404",
          message:"city not found"
        }
      }));

    sandbox.stub(axios, 'get').returns(resolveForecastSuccess);

    store.dispatch(getFiveDayWeatherForecast('NairobiZ')).then(() => {
      const actualActions = store.getActions();
      expect(expectedActions[5].type).toEqual(actualActions[0].type);
      done();
    });
  });
});




