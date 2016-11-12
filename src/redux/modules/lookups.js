const LOAD_LOOKUP = 'redux-example/lookup/LOAD';
const LOAD_LOOKUP_SUCCESS = 'redux-example/lookup/LOAD_SUCCESS';
const LOAD_LOOKUP_FAIL = 'redux-example/lookup/LOAD_FAIL';
const TITLE_LOOKUP = 'titleid';
const GENDER_LOOKUP = 'GenderCode';
const ETHNICITY_LOOKUP = 'EthinicityID';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  const {result, error} = action;
  switch (action.type) {
    case LOAD_LOOKUP:
      return {
        ...state,
        loading: true
      };
    case LOAD_LOOKUP_SUCCESS:
      const ethnicity = result.filter(ethLookup => (ethLookup.lookupname === ETHNICITY_LOOKUP));
      const title = result.filter(titleLookup => (titleLookup.lookupname === TITLE_LOOKUP));
      const gender = result.filter(genderLookup => (genderLookup.lookupname === GENDER_LOOKUP));
      return {
        ...state,
        loading: false,
        loaded: true,
        ethnicity,
        title,
        gender
      };
    case LOAD_LOOKUP_FAIL:
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

export function isLoaded(globalState) {
  return globalState.lookups && globalState.lookups.loaded;
}

export function load() {
  return {
    types: [LOAD_LOOKUP, LOAD_LOOKUP_SUCCESS, LOAD_LOOKUP_FAIL],
    promise: (client) => client.get('/lookups')
  };
}

