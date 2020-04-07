import axios from 'axios'

/**
 * a redux promise middleware for handling async action
 * @param dispatch
 * @param getState
 * @returns {function(*=): function(...[*]=)}
 */
export default function promiseMiddleware ({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const {
      promise, types, afterSuccess, afterError, ...rest
    } = action

    if (!action.promise) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types
    next({ ...rest, type: REQUEST })

    const onFulfilled = result => {
      // dispatch the SUCCESS action on fulfilled
      next({ ...rest, result, type: SUCCESS })

      if (afterSuccess) {
        const afterReturn = afterSuccess(dispatch, getState, result)

        if (afterReturn && typeof (afterReturn.then) === 'function') {
          return afterReturn
        }
      }

      return result.data
    }

    const onRejected = error => {
      // dispatch the FAILURE action after rejected
      next({ ...rest, error, type: FAILURE })
      if (afterError) {
        afterError(dispatch, getState, error)
      }

      return Promise.reject(error)
    }

    return promise(axios, dispatch).then(onFulfilled, onRejected)
  }
}
