import {
  applyMiddleware, compose, createStore, combineReducers
} from 'redux'
import promiseMiddleware from './promiseMiddleware'

/**
 * create store with the initial state and reducers passing in parameter
 * @param initialState
 * @param reducers
 * @returns {Store<{readonly "[$CombinedState]"?: undefined} & S, AnyAction>}
 */
export default function configStore (initialState, reducers) {
  const middlewares = [
    promiseMiddleware
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const composeEnhancers = process.env.NODE_ENV !== 'production'
        && typeof window === 'object'
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(...enhancers)
  )

  return store
}
