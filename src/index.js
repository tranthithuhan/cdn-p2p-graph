import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import axios from 'axios'
import {createHashHistory} from 'history'

import * as serviceWorker from './serviceWorker'

import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.scss'
import store from './reducers/index'
import Routes from './routes'
import { BACKEND_LINK } from './const'


const onRequestSuccess = config => ({ ...config, url: BACKEND_LINK + config.url })
axios.interceptors.request.use(onRequestSuccess)
const history = createHashHistory()

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Switch>
          <Routes />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
