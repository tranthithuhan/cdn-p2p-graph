import Immutable from 'seamless-immutable'
import querystring from 'querystring'
import get from 'lodash/get'

const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAIL = 'auth/LOGIN_FAIL'

const initialState = {}

export function login (identifiant, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    identifiant,
    promise: client => client.post('/auth', querystring.stringify({ identifiant, password })),
  }
}

export default function reducer (state = Immutable(initialState), action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const session = get(action, 'result.data.session_token')

      if (session) {
        localStorage.setItem('str-token', session)
        return Immutable.set(
          state,
          'session',
          session
        )
      }
      return state
    }
    default:
      return state
  }
}
