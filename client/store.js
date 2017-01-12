import {content, fetchingContent} from './content-reducers'
import {watchFetchContent} from './content-sagas'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'

const initialState = {
  content: {
    // TODO: populate with basic content.
  },
  fetchingContent: {
    // Truthy if in the act of fetching content, falsey if not.
    url: null
  }
}

const reducer = combineReducers({
  content,
  fetchingContent
})

const rootSaga = function* () {
  yield [
    watchFetchContent()
  ]
}
const sagaMiddleware = createSagaMiddleware()

const middleware = [
  sagaMiddleware
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
