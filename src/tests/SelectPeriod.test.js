import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import wait from 'waait'
import { renderWithRedux, renderWithRouter } from './utils'
import SelectPeriod from '../components/SelectPeriod'
import { DEFAULT_PERIOD } from '../const'

afterEach(cleanup)
describe('<SelectPeriod />', () => {
  it('renders SelectPeriod correctly', () => {
    const { getByTestId } = render(
      renderWithRedux(
        renderWithRouter(<SelectPeriod selectedPeriod={DEFAULT_PERIOD} />)
      )
    )
    expect(getByTestId('select-period')).toBeTruthy()
    expect(getByTestId('select-period-label')).toHaveTextContent('Since inception')
  })

  it('should select period correctly', async () => {
    const { getByTestId } = render(
      renderWithRedux(
        renderWithRouter(
          <SelectPeriod selectedPeriod={DEFAULT_PERIOD} onChangePeriod={jest.fn()} />
        )
      )
    )

    const selectPeriod = getByTestId('select-period-WEEK')
    fireEvent.click(selectPeriod)

    await wait(() => {
      expect(getByTestId('select-period-label')).toHaveTextContent('Last month')
    })
  })
})
