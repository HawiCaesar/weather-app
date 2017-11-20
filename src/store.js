import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';

import allReducers from './reducers/index';

const middleware = applyMiddleware(promise, thunk, createLogger());

export const store = createStore(
  allReducers,
  middleware
);
