import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Container, Col, Form, FormGroup, Label, Input, Button
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { login } from '../reducers/auth'
import { HOME_PATH } from '../const'

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [identifiant, setIdentifiant] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    dispatch(login(identifiant, password)).then(() => {
      history.push(HOME_PATH)
    })
  }

  return (
    <Container className="login" data-testid="login">
      <h2>Login</h2>

      <Form className="login-form" data-testid="login-form">
        <Col>
          <FormGroup>
            <Label>Identifiant</Label>
            <Input
              name="identifiant"
              value={identifiant}
              placeholder="Identifiant"
              onChange={e => setIdentifiant(e.target.value)}
              data-testid="login-identifiant-input"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Password</Label>
            <Input
              name="password"
              value={password}
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              data-testid="login-password-input"
            />
          </FormGroup>
        </Col>
        <Button
          onClick={handleLogin}
          data-testid="login-button"
        >
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Login
