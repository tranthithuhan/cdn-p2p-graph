import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Main from './components/Main'
import { HOME_PATH, LOGIN_PATH } from './const'

const routers = () => (
  <Switch>
    <Route path={LOGIN_PATH} component={Login} />
    <Route path={HOME_PATH} component={Main} />
  </Switch>
)

export default routers
