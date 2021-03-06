import history from './history'
import {routerMiddleware} from 'react-router-redux'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import thunkMiddleware from 'redux-thunk'
import reducer from './store-reducers'

// Assumption this code runs in the browser.
const initialState = (typeof window !== 'undefined' && window.initialState) || {}

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
]

const store = createStore(
  reducer,
  initialState,
  // Use either redux compose or browser dev tools friendly compose for middleware.
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
