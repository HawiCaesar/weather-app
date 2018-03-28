// third-party libraries
import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

import App from './components/App';
import foo from "./store";
const { store } = foo();
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app')
);
