import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import fetchReducer from './fetchReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  data: fetchReducer,
  error: errorReducer,
  userData: userReducer
});
export default rootReducer;
