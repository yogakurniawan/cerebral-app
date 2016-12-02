import Cookie from 'js-cookie';
import {commonAsyncUtil} from 'utils/commonAsyncUtil';

const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN = 'redux-example/auth/LOGIN';
const LOGIN_SUCCESS = 'redux-example/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';
const LOGOUT = 'redux-example/auth/LOGOUT';
const LOGOUT_SUCCESS = 'redux-example/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'redux-example/auth/LOGOUT_FAIL';
const REGISTER = 'redux-example/auth/REGISTER';
const REGISTER_SUCCESS = 'redux-example/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'redux-example/auth/REGISTER_FAIL';
const VALIDATE_USERNAME = 'redux-example/auth/VALIDATE_USERNAME';
const VALIDATE_USERNAME_SUCCESS = 'redux-example/auth/VALIDATE_USERNAME_SUCCESS';
const VALIDATE_USERNAME_FAIL = 'redux-example/auth/VALIDATE_USERNAME_FAIL';
const VALIDATE_EMAIL = 'redux-example/auth/VALIDATE_EMAIL';
const VALIDATE_EMAIL_SUCCESS = 'redux-example/auth/VALIDATE_EMAIL_SUCCESS';
const VALIDATE_EMAIL_FAIL = 'redux-example/auth/VALIDATE_EMAIL_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  const {result, error} = action;
  switch (action.type) {
    case VALIDATE_EMAIL:
      return {
        ...state,
        validatingEmail: true
      };
    case VALIDATE_EMAIL_SUCCESS:
      return {
        ...state,
        validatingEmail: false,
        emailValidated: true,
        isEmailValid: result.isValid
      };
    case VALIDATE_EMAIL_FAIL:
      return {
        ...state,
        validatingEmail: false,
        emailValidated: false,
        errorValidatingEmail: error
      };
    case VALIDATE_USERNAME:
      return {
        ...state,
        validatingUsername: true
      };
    case VALIDATE_USERNAME_SUCCESS:
      return {
        ...state,
        validatingUsername: false,
        usernameValidated: true,
        isUsernameValid: result.isValid
      };
    case VALIDATE_USERNAME_FAIL:
      return {
        ...state,
        validatingUsername: false,
        usernameValidated: false,
        errorValidatingUsername: error
      };
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: result.currentUser
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loaded: true,
        loggingIn: false,
        user: result.userDetail,
        loginInfo: result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginInfo: null,
        user: null,
        loginError: error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null,
        loginInfo: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: error
      };
    case REGISTER:
      return {
        ...state,
        registering: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        registered: true,
        registrationResponse: result
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registering: false,
        registered: false,
        error: error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/users/loadAuth')
  };
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/users/login', {
      data: {
        username: username,
        password: password
      }
    })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => {
      return commonAsyncUtil(client.post('users/logout', {
        params: {
          access_token: Cookie.get('token')
        }
      }).then(new Promise((resolve) => {
        Cookie.remove('token');
        return resolve(null);
      })));
    }
  };
}

export function register(data) {
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.post('/users', {
      data: data
    })
  };
}

export function validateUsername(username) {
  return {
    types: [VALIDATE_USERNAME, VALIDATE_USERNAME_SUCCESS, VALIDATE_USERNAME_FAIL],
    promise: (client) => client.post('/users/validateusername', {
      params: {
        username
      }
    })
  };
}

export function validateEmail(email) {
  return {
    types: [VALIDATE_EMAIL, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAIL],
    promise: (client) => client.post('/users/validateemail', {
      params: {
        email
      }
    })
  };
}
