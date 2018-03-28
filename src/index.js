// third-party libraries
import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from './components/App';
import storeFunctionality from "./store";
const { store } = storeFunctionality();
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app')
);
