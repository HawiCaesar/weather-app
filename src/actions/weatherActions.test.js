// 3rd party libraries
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import axios from 'axios';
import sinon from 'sinon';

// actions
import { getLocationInfo } from "./weatherActions";

let sandbox;
let server;

describe('Weather actions', () => {

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

    const expectedActions = [
      { type: "FETCHING_LOCATION_INFO" },
      { type: "LOCATION_RESULTS" },
      { type: "FETCHED_CITY_INFO"}
    ];

    store.dispatch(getLocationInfo(-1.2177265,36.8829831)).then(() => {
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

    const expectedActions = [
      { type: "FAILED_FETCHING_CITY_INFO" }
    ];

    store.dispatch(getLocationInfo(0,0)).then(() => {
      const actualActions = store.getActions();

      expect(expectedActions[0].type).toEqual(actualActions[1].type);
      done();
    });
  });
});




