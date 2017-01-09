import {combineReducers, createStore} from 'redux'
import {content, fetchingContent} from './content-reducers'

const initialState = {
  content: {
    // TODO: populate with basic content.
  },
  fetchingContent: {
    // Truthy if in the act of fetching content, falsey if not.
    url: null
  }
}

const reducers = combineReducers({
  content,
  fetchingContent
})

const store = createStore(reducers,
  // NOTE: We assume the initial state, if available, is attached to the window.
  window.initialState || initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
