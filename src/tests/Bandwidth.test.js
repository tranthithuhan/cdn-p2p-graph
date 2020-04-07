import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { renderWithRedux, renderWithRouter } from './utils'
import Bandwidth from '../components/Bandwidth'

afterEach(cleanup)
describe('<Bandwidth />', () => {
  it('renders bandwidth correctly', () => {
    const { getByTestId } = render(renderWithRedux(renderWithRouter(<Bandwidth />)))
    expect(getByTestId('bandwidth')).toBeTruthy()
  })
})
