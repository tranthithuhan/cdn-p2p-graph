import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import wait from 'waait'
import moment from 'moment'
import { renderWithRedux, renderWithRouter } from './utils'
import DateSelect from '../components/DateSelect'

afterEach(cleanup)
describe('<DateSelect />', () => {
  it('renders DateSelect correctly', async () => {
    const { getByTestId } = render(renderWithRedux(renderWithRouter(<DateSelect />)))
    expect(getByTestId('datepicker')).toBeTruthy()
  })

  it('should update DateSelect', async () => {
    const { getByTestId } = render(renderWithRedux(renderWithRouter(<DateSelect />)))
    const now = moment(new Date()).format('Y-MM-DD')
    fireEvent.change(
      getByTestId('datepicker'),
      { target: { value: now } }
    )
    await wait(() => {
      expect(getByTestId('datepicker')).toBeCalledWith({ value: now })
    })
  })
})
