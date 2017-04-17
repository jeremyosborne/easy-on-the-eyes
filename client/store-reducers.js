//
// Integration of reducers for redux store.
//
import content from './content-reducers'
import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import {routerReducer as routing} from 'react-router-redux'

const reducer = combineReducers({
  content,
  form,
  routing,
})

export default reducer
