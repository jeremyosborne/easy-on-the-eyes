import { genContent } from 'easy-on-the-eyes-content'
import history from './history'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { routerMiddleware } from 'react-router-redux'
import { rootSaga, sagaMiddleware } from './store-sagas'
import reducer from './store-reducers'

// Assumption this code runs in the browser.
const initialState = (typeof window !== 'undefined' && window.initialState) || {
  content: genContent()
}

const middleware = [
  sagaMiddleware,
  routerMiddleware(history)
]

const store = createStore(
  reducer,
  initialState,
  // Use either redux compose or browser dev tools friendly compose for middleware.
  composeWithDevTools(applyMiddleware(...middleware))
)
sagaMiddleware.run(rootSaga)

export default store
