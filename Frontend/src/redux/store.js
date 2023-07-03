import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import parseJwt from 'shared/middlewares/parseJwt'

const userInfoFromStorage = localStorage.getItem('setADA') ? JSON.parse(localStorage.getItem('setADA')) : null

const decoded = userInfoFromStorage === null ? null : parseJwt(userInfoFromStorage)
const userSession =
  userInfoFromStorage === null
    ? null
    : {
        ...decoded,
        token: userInfoFromStorage,
      }

const initialState = {
  userLogin: {
    userInfo: userSession,
  },
}

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
