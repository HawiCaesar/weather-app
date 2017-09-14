import {combineReducers} from "redux";
import {loadingBarReducer} from 'react-redux-loading-bar';

import weatherReducer from "./weatherReducer";

const allReducers = combineReducers({

  loadingBar: loadingBarReducer,
  weather: weatherReducer
});


export default allReducers;
