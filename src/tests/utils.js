import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import testStore from '../reducers/index'


export function renderWithRedux (children, { store } = { store: testStore}) {
  return <Provider store={store}>{ children }</Provider>
}

export function renderWithRouter (
  children,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return <MemoryRouter history={history}>{ children }</MemoryRouter>
}
