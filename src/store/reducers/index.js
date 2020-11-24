import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import fetchReducer from './fetchReducer';

const rootReducer = combineReducers({
  data: fetchReducer,
  error: errorReducer,
});
export default rootReducer;
