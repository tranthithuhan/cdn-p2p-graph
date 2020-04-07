import React from 'react'
import { render, cleanup, act } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import moment from 'moment'
import thunk from 'redux-thunk'
import { renderWithRedux, renderWithRouter } from './utils'
import BandwidthChart from '../components/BandwidthChart'
import promiseMiddleware from '../reducers/promiseMiddleware'

jest.mock('axios')

afterEach(cleanup)
const from = new Date().getTime()
const to = moment(new Date()).subtract(1, 'month').millisecond()

describe('<BandwidthChart />', () => {
  it('renders BandwidthChart correctly', () => {
    const { getByTestId } = render(
      renderWithRedux(
        renderWithRouter(<BandwidthChart maxDate={to} minDate={from} />)
      )
    )
    expect(getByTestId('bandwidth-chart')).toBeTruthy()
  })

  it('should render spinner when loading', async () => {
    const middlewares = [thunk, promiseMiddleware]
    const mockStore = configureStore(middlewares)
    const initialState = {
      auth: { session: 'abc' },
      bandwidth: { loading: true, audience: { data: {} }, bandwidth: { data: {} } }
    }
    const store = mockStore(initialState)

    const { getByTestId } = render(
      renderWithRedux(
        renderWithRouter(
          <BandwidthChart maxDate={to} minDate={from} />
        ), { store }
      )
    )

    await act(async () => {
      expect(getByTestId('spinner')).toBeTruthy()
    })
  })

  it('should render chart when data loaded', async () => {
    const middlewares = [thunk, promiseMiddleware]
    const mockStore = configureStore(middlewares)
    const initialState = {
      auth: { session: 'abc' },
      bandwidth: {
        audience: { data: [[1, 2]] },
        bandwidth: { data: { cdn: [[1, 2]], p2p: [[1, 2]] } }
      }
    }
    const store = mockStore(initialState)

    const { getByTestId } = render(
      renderWithRedux(
        renderWithRouter(
          <BandwidthChart maxDate={to} minDate={from} />
        ), { store }
      )
    )

    await act(async () => {
      expect(getByTestId('bandwidth-chart')).toBeTruthy()
    })
  })
})
