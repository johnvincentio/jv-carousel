
import { combineReducers } from 'redux';
// import { createResponsiveStateReducer } from 'redux-responsive';

import data from './data.reducer';

const rootReducer = combineReducers({
	dataReducer: data,
});

export default rootReducer;
