import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import lookups from './lookups';
import patients from './patients';
import {reducer as formReducer } from 'redux-form';
import todo from './todo';
import {reducer as toastrReducer} from 'react-redux-toastr';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  patients,
  lookups,
  toastr: toastrReducer, // <- Mounted at toastr.
  form: formReducer, // <---- Mounted at 'form'
  todo
});
