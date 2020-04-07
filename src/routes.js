import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect'
import * as routerActions from "connected-react-router";
import Login from './components/Login'
import Main from './components/Main'
import { HOME_PATH, LOGIN_PATH } from './const'

// export const userIsAuthenticatedRedir = connectedReduxRedirect({
//   authenticatedSelector: state => {
//     return state.auth.session !== null
//   },
//   wrapperDisplayName: 'UserIsAuthenticated',
//   redirectPath: LOGIN_PATH,
//   redirectAction: routerActions.replace
// })

// Routes used in app
const routers = () => (
  <Switch>
    <Route path={LOGIN_PATH} component={Login} />
    <Route path={HOME_PATH} component={Main} />
  </Switch>
)

export default routers


