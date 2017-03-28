//
// Integration of reducers for redux store.
//
import content from './content-reducers'
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

const reducers = combineReducers({
  content,
  routing: routerReducer
})

export default reducers
