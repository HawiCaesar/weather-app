// 3rd party libraries
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import * as moxios from 'moxios';
import * as jest from 'jest';

// actions
import { getLocationInfo } from "./weatherActions";

let middlewares = [thunk];
let mockStore = configureMockStore(middlewares);
let store;
let weatherForecastUrl;
let currentWeatherUrl;

describe('Weather actions', () => {

  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    weatherForecastUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=-1.2972971,36.7889906&key=AIzaSyAO26kNQBP2exWaVG0DIHGDhWQ2SelGIY0';
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should create FETCHING_LOCATION_INFO and LOCATION_RESULTS and FETCHED_CITY_INFO', (done) => {

    const expectedActions = [
      { type: "FETCHING_LOCATION_INFO" },
      { type: "LOCATION_RESULTS" },
      { type: "FETCHED_CITY_INFO"}
    ];

    moxios.stubRequest(`${weatherForecastUrl}`, {
      status: 200,
      response: { data: { results: { formatted_address: "Mirema Rd, Nairobi, Kenya"}

      } }
    });

    store.dispatch(getLocationInfo(-1.2177265,36.8829831)).then(() => {
       const actualActions = store.getActions();

       expect(expectedActions[0].type).toEqual(actualActions[0].type);
       expect(expectedActions[1].type).toEqual(actualActions[1].type);
       expect(expectedActions[2].type).toEqual(actualActions[2].type);
       done();
    });
  });

  it('should create FAILED_FETCHING_CITY_INFO', (done) => {
    const expectedActions = [
      { type: "FAILED_FETCHING_CITY_INFO" }
    ];

    store.dispatch(getLocationInfo('-','-')).then(() => {
      const actualActions = store.getActions();
      expect(expectedActions[0].type).toEqual(actualActions[1].type);
      done();
    });
  });
});




