// 3rd party libraries
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import axios from 'axios';
import sinon from 'sinon';

// actions
import { getLocationInfo, getCurrentWeather, getFiveWeatherForecast } from "./weatherActions";

let sandbox;
let server;

describe('Weather actions', () => {

  const expectedActions = [
    { type: "FETCHING_LOCATION_INFO" },
    { type: "LOCATION_RESULTS" },
    { type: "FETCHED_CITY_INFO"},
    { type: "FAILED_FETCHING_CITY_INFO" },
    { type: "FETCHED_CURRENT_WEATHER_INFO" },
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

  it('should create FETCHING_LOCATION_INFO and LOCATION_RESULTS and FETCHED_CITY_INFO', (done) => {

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
       expect(expectedActions[1].type).toEqual(actualActions[1].type);
       expect(expectedActions[2].type).toEqual(actualActions[2].type);
       done();
    });
  });

  it('should create FAILED_FETCHING_CITY_INFO', (done) => {

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

      expect(expectedActions[3].type).toEqual(actualActions[1].type);
      done();
    });
  });

  it('should create FETCHED_CURRENT_WEATHER_INFO', (done) => {

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
      expect(expectedActions[4].type).toEqual(actualActions[0].type);
      done();
    });
  });

  it('should create FAILED_FETCHING_WEATHER_FORECAST_INFO', (done) => {

    let middlewares = [thunk];
    let mockStore = configureMockStore(middlewares);
    let store = mockStore({});

    const resolveForecastSuccess = new Promise(
      (resolve, reject) => resolve({
        data: {
          cod:"404",
          message:"city not found"
        }
      }));

    sandbox.stub(axios, 'get').returns(resolveForecastSuccess);

    store.dispatch(getFiveWeatherForecast('Nairobi')).then(() => {
      const actualActions = store.getActions();
      expect(expectedActions[5].type).toEqual(actualActions[0].type);
      done();
    });
  });
});




