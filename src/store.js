// third-party libraries
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
//import { cacheEnhancer } from 'redux-cache';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import allReducers from './reducers/index';

const persistConfig = {
  key: 'root',
  storage
};

const middleware = applyMiddleware(promise, thunk, createLogger());

const persistedReducer = persistReducer(persistConfig, allReducers);

export default () => {
  let store = createStore(persistedReducer, middleware);
  let persistor = persistStore(store);
  return { store, persistor };
};
