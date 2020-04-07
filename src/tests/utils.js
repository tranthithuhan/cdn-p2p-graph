import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import testStore from '../reducers/index'

/**
 * wrap the component on a Provider with a store passing in parameters
 * @param children
 * @param store
 * @returns {*}
 */
export function renderWithRedux (children, { store } = { store: testStore}) {
  return <Provider store={store}>{ children }</Provider>
}

/**
 * wrap the component in Router
 * @param children
 * @param route
 * @param history
 * @returns {*}
 */
export function renderWithRouter (
  children,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return <MemoryRouter history={history}>{ children }</MemoryRouter>
}
