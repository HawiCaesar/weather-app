import { combineReducers } from "redux";

import { loadingBarReducer } from 'react-redux-loading-bar';

const allReducers = combineReducers({

  loadingBar: loadingBarReducer
});


export default allReducers;
