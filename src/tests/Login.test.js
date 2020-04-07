import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import axios from 'axios'
import wait from 'waait'
import Login from '../components/Login'
import { renderWithRedux, renderWithRouter } from './utils'

afterEach(cleanup)

jest.mock('axios')

describe('<Login />', () => {
  it('render Login correctly', () => {
    const { getByTestId } = render(renderWithRedux(renderWithRouter(<Login />)))

    expect(getByTestId('login')).toBeTruthy()
  })

  it('should update login form correctly', () => {
    const { getByTestId } = render(renderWithRedux(renderWithRouter(<Login />)))

    const identifiantInput = getByTestId('login-identifiant-input')
    const passwordInput = getByTestId('login-password-input')

    fireEvent.change(identifiantInput, { target: { value: 'toto' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })

    expect(identifiantInput.value).toBe('toto')
    expect(passwordInput.value).toBe('password')
  })

  it('should redirect to home page after logged in', async () => {
    const mockHistoryPush = jest.fn()

    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: mockHistoryPush
      })
    }))

    const { getByTestId } = render(renderWithRedux(renderWithRouter(<Login />)))

    const loginButton = getByTestId('login-button')

    axios.post.mockResolvedValue({ data: { session_token: 'ttt' } })
    fireEvent.click(loginButton)

    await wait(() => {
      expect(mockHistoryPush).toHaveBeenCalled()
    })
  })
})
