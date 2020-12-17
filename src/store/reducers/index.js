import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import fetchReducer from './fetchReducer';
import successReducer from './successReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  data: fetchReducer,
  error: errorReducer,
  userData: userReducer,
  succMsg: successReducer,
});
export default rootReducer;
