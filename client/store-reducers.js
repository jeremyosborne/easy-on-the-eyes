//
// Integration of reducers for redux store.
//
import { content, fetchingContent } from './content-reducers'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
  content,
  fetchingContent,
  routing: routerReducer
})

export default reducers
