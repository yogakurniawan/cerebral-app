const SAVE = 'redux-example/auth/SAVE';
const SAVE_SUCCESS = 'redux-example/auth/SAVE_SUCCESS';
const SAVE_FAIL = 'redux-example/auth/SAVE_FAIL';

const initialState = {
  loaded: false,
  saving: false,
  saved: false,
  error: null,
  response: null
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
