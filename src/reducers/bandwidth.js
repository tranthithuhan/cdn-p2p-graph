import Immutable from 'seamless-immutable'
import querystring from 'querystring'

export const GET_AUDIENCE_DATA = 'auth/GET_AUDIENCE_DATA'
const GET_AUDIENCE_DATA_SUCCESS = 'auth/GET_AUDIENCE_SUCCESS'
const GET_AUDIENCE_DATA_FAIL = 'auth/GET_AUDIENCE_DATA_FAIL'

const GET_BANDWIDTH = 'auth/GET_BANDWIDTH'
const GET_BANDWIDTH_SUCCESS = 'auth/GET_BANDWIDTH_SUCCESS'
const GET_BANDWIDTH_FAIL = 'auth/GET_BANDWIDTH_FAIL'

const GET_BANDWIDTH_DATA = 'auth/GET_BANDWIDTH_DATA'
const GET_BANDWIDTH_DATA_SUCCESS = 'auth/GET_BANDWIDTH_DATA_SUCCESS'
const GET_BANDWIDTH_DATA_FAIL = 'auth/GET_BANDWIDTH_DATA_FAIL'

const GET_BANDWIDTH_SUM = 'auth/GET_BANDWIDTH_SUM'
const GET_BANDWIDTH_SUM_SUCCESS = 'auth/GET_BANDWIDTH_SUM_SUCCESS'
const GET_BANDWIDTH_SUM_FAIL = 'auth/GET_BANDWIDTH_SUM_FAIL'

const GET_BANDWIDTH_MAX = 'auth/GET_BANDWIDTH_MAX'
const GET_BANDWIDTH_MAX_SUCCESS = 'auth/GET_BANDWIDTH_MAX_SUCCESS'
const GET_BANDWIDTH_MAX_FAIL = 'auth/GET_BANDWIDTH_MAX_FAIL'

const GET_BANDWIDTH_MIN = 'auth/GET_BANDWIDTH_MIN'
const GET_BANDWIDTH_MIN_SUCCESS = 'auth/GET_BANDWIDTH_MIN_SUCCESS'
const GET_BANDWIDTH_MIN_FAIL = 'auth/GET_BANDWIDTH_MIN_FAIL'

const GET_BANDWIDTH_AVG = 'auth/GET_BANDWIDTH_AVG'
const GET_BANDWIDTH_AVG_SUCCESS = 'auth/GET_BANDWIDTH_AVG_SUCCESS'
const GET_BANDWIDTH_AVG_FAIL = 'auth/GET_BANDWIDTH_AVG_FAIL'

const initialState = {
  audience: { data: {} },
  bandwidth: { data: {} },
  loading: false,
  error: null
}

/**
 * Request the extract data
 * types: types of data to get
 * aggregate: optional - available values: sum, average, max, min
 * @param from
 * @param to
 * @param link
 * @param types
 * @param dataName
 * @param aggregate
 * @returns {function(...[*]=)}
 */
const getData = (from, to, link, types, dataName, aggregate) => (dispatch, getState) => {
  const state = getState()
  const { session } = state.auth

  dispatch({
    types,
    dataName,
    promise: client => client.post(
      link,
      querystring.stringify({
        session_token: session,
        from,
        to,
        aggregate
      })
    )
  })
}

/**
 * Action used for request the extract p2p and cdn bandwidth by passing a aggregate
 * @param from
 * @param to
 * @param aggregate
 * @returns {function(...[*]=)}
 */
export function getBandwidth (from, to, aggregate) {
  return dispatch => {
    let types = null

    if (!aggregate) {
      types = [GET_BANDWIDTH_DATA, GET_BANDWIDTH_DATA_SUCCESS, GET_BANDWIDTH_DATA_FAIL]
    } else {
      const actionTypes = {
        average: [GET_BANDWIDTH_AVG, GET_BANDWIDTH_AVG_SUCCESS, GET_BANDWIDTH_AVG_FAIL],
        sum: [GET_BANDWIDTH_SUM, GET_BANDWIDTH_SUM_SUCCESS, GET_BANDWIDTH_SUM_FAIL],
        max: [GET_BANDWIDTH_MAX, GET_BANDWIDTH_MAX_SUCCESS, GET_BANDWIDTH_MAX_FAIL],
        min: [GET_BANDWIDTH_MIN, GET_BANDWIDTH_MIN_SUCCESS, GET_BANDWIDTH_MIN_FAIL]
      }

      types = actionTypes[aggregate]
    }


    if (!types) {
      dispatch({ type: GET_BANDWIDTH_FAIL })
    } else {
      dispatch(getData(from, to, '/bandwidth', types, ['bandwidth', aggregate || 'data'], aggregate))
    }
  }
}

/**
 * Action used for multi aggregates requests of the extract p2p and cdn bandwidth
 * @param from
 * @param to
 * @param aggregateParams
 * @returns {function(...[*]=)}
 */
export function getBandwidthDatas (from, to, aggregateParams = null) {
  return dispatch => {
    dispatch({ type: GET_BANDWIDTH })

    let request = []
    if (!aggregateParams || Array.isArray(aggregateParams)) {
      (aggregateParams || ['sum', 'average', 'max', 'min']).forEach(aggregate => {
        request = request.concat(
          dispatch(getBandwidth(from, to, aggregate))
        )
      })

      if (!aggregateParams) {
        request = request.concat(
          dispatch(getBandwidth(from, to))
        )
      }
    }

    Promise.all(request).then(() => {
      dispatch({ type: GET_BANDWIDTH_SUCCESS })
    }).catch(error => {
      dispatch({ type: GET_BANDWIDTH_FAIL, error })
    })
  }
}

/**
 * get the number of audience
 * @param from
 * @param to
 * @returns {function(...[*]=)}
 */
export function getAudience (from, to) {
  return dispatch => {
    dispatch(
      getData(
        from,
        to,
        '/audience',
        [GET_AUDIENCE_DATA, GET_AUDIENCE_DATA_SUCCESS, GET_AUDIENCE_DATA_FAIL],
        ['audience', 'data']
      )
    )
  }
}

export default function reducer (state = Immutable(initialState), action) {
  switch (action.type) {
    case GET_BANDWIDTH_DATA_SUCCESS:
    case GET_BANDWIDTH_SUM_SUCCESS:
    case GET_BANDWIDTH_AVG_SUCCESS:
    case GET_BANDWIDTH_MAX_SUCCESS:
    case GET_BANDWIDTH_MIN_SUCCESS:
    case GET_AUDIENCE_DATA_SUCCESS:

      return Immutable.merge(
        Immutable.setIn(
          state,
          action.dataName,
          action.result.data
        ),
        { error: null, loading: false }
      )

    case GET_BANDWIDTH_DATA:
    case GET_BANDWIDTH_SUM:
    case GET_BANDWIDTH_AVG:
    case GET_BANDWIDTH_MAX:
    case GET_BANDWIDTH_MIN:
    case GET_AUDIENCE_DATA:
      return Immutable.merge(
        state,
        { error: null, loading: true }
      )

    case GET_BANDWIDTH_DATA_FAIL:
    case GET_BANDWIDTH_SUM_FAIL:
    case GET_BANDWIDTH_AVG_FAIL:
    case GET_BANDWIDTH_MAX_FAIL:
    case GET_BANDWIDTH_MIN_FAIL:
    case GET_AUDIENCE_DATA_FAIL:

      return Immutable.merge(
        state,
        { error: action.error, loading: false }
      )


    default:
      return state
  }
}
