const SAVE = 'redux-example/patients/SAVE';
const SAVE_SUCCESS = 'redux-example/patients/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/patients/SAVE_FAIL';
const LOAD_SINGLE = 'redux-example/patients/LOAD_SINGLE';
const LOAD_PATIENTS = 'redux-example/patients/LOAD_PATIENTS';
const LOAD_PATIENTS_SUCCESS = 'redux-example/patients/LOAD_PATIENTS_SUCCESS';
const LOAD_PATIENTS_FAIL = 'redux-example/patients/LOAD_PATIENTS_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null,
  response: null,
  patient: null,
  patients: null
};

export default function reducer(state = initialState, action = {}) {
  const {result, error} = action;
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        saving: true
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        response: result
      };
    case SAVE_FAIL:
      return {
        ...state,
        saving: false,
        saved: false,
        error: error
      };
    case LOAD_SINGLE:
      return {
        ...state,
        patient: action.data
      };
    case LOAD_PATIENTS:
      return {
        ...state,
        loading: true
      };
    case LOAD_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        patients: result
      };
    case LOAD_PATIENTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: error
      };
    default:
      return state;
  }
}

export function save(data) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/patients', {
      data: data
    })
  };
}

export const load = data => ({ type: LOAD_SINGLE, data });

export function loadPatients() {
  return {
    types: [LOAD_PATIENTS, LOAD_PATIENTS_SUCCESS, LOAD_PATIENTS_FAIL],
    promise: (client) => client.get('/patients')
  };
}
