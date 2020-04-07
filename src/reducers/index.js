import auth from './auth'
import bandwidth from './bandwidth'
import configStore from './configStore'

const initialState = {}

export const reducers = {
  auth,
  bandwidth
}

const store = configStore(initialState, reducers)

export default store
