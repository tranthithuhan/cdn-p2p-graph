import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Main from '../components/Main'
import { renderWithRedux, renderWithRouter } from './utils'

afterEach(cleanup)
describe('<Main />', () => {
  it('renders App correctly', () => {
    const { getByTestId } = render(renderWithRedux(renderWithRouter(<Main />)))
    expect(getByTestId('main')).toBeTruthy()
  })

  it('should render a navbar', () => {
    const { getByTestId } = render(renderWithRedux(renderWithRouter(<Main />)))

    expect(getByTestId('navbar')).toBeTruthy()
    expect(getByTestId('navbar-brand')).toHaveTextContent('cdn and p2p')
  })
})
