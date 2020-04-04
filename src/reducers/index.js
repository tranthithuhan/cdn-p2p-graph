import auth from './auth'
import configStore from './configStore'

const initialState = {}

export const reducers = {
  auth
}

const store = configStore(initialState, reducers)

export default store
