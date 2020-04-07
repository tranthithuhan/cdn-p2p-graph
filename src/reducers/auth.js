import Immutable from 'seamless-immutable'
import querystring from 'querystring'
import get from 'lodash/get'
import { LOCAL_STORAGE_SESSION_NAME } from '../const'

const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'auth/LOGIN_FAIL'

const GET_LOCAL_SESSION = 'auth/GET_LOCAL_SESSION'
const GET_LOCAL_SESSION_SUCCESS = 'auth/GET_LOCAL_SESSION_SUCCESS'
const GET_LOCAL_SESSION_FAIL = 'auth/GET_LOCAL_SESSION_FAIL'

const initialState = {
  session: localStorage.getItem(LOCAL_STORAGE_SESSION_NAME)
}

/**
 * User authentication
 * @param identifiant
 * @param password
 * @returns {{types: [string, string, string], identifiant: *, promise: (function(*): *)}}
 */
export function login (identifiant, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    identifiant,
    promise: client => client.post('/auth', querystring.stringify({ identifiant, password }))
  }
}

export function checkSession () {
  return dispatch => {
    dispatch({ type: GET_LOCAL_SESSION })
    const localStorageSession = localStorage.getItem(LOCAL_STORAGE_SESSION_NAME)

    if (localStorageSession) {
      dispatch({ type: GET_LOCAL_SESSION_SUCCESS, session: localStorageSession })
    } else {
      dispatch({ type: GET_LOCAL_SESSION_FAIL })
    }
  }
}

export default function reducer (state = Immutable(initialState), action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const session = get(action, 'result.data.session_token')

      if (session) {
        localStorage.setItem(LOCAL_STORAGE_SESSION_NAME, session)
        return Immutable.set(
          state,
          'session',
          session
        )
      }
      return state
    }

    case GET_LOCAL_SESSION: {
      return Immutable.set(
        state,
        'session',
        action.session
      )
    }

    case GET_LOCAL_SESSION_FAIL: {
      return Immutable.set(
        state,
        'session',
        null
      )
    }

    default:
      return state
  }
}
