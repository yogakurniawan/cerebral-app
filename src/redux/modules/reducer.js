import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import {reducer as formReducer } from 'redux-form';
import todo from './todo';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form: formReducer, // <---- Mounted at 'form'
  todo
});
