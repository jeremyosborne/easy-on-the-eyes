import history from './history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { rootSaga, sagaMiddleware } from './store-sagas'
import reducer from './store-reducers'

const initialState = {
  content: {
    // TODO: populate with basic content.
  },
  fetchingContent: {
    // Truthy if in the act of fetching content, falsey if not.
    url: null
  }
}

const middleware = [
  sagaMiddleware,
  routerMiddleware(history)
]

// Use either redux compose or browser dev tools friendly compose for middleware.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  // NOTE: We assume the initial state, if available, is attached to the window.
  window.initialState || initialState,
  composeEnhancers(applyMiddleware(...middleware))
)
sagaMiddleware.run(rootSaga)

export default store
