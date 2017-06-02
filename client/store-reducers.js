//
// Integration of reducers for redux store.
//
import * as content from './content'
import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import {routerReducer as routing} from 'react-router-redux'
import * as suggestions from './suggestions'

const reducer = combineReducers({
  [content.REDUCER_KEY]: content.reducer,
  form,
  routing,
  [suggestions.REDUCER_KEY]: suggestions.reducer,
})

export default reducer
