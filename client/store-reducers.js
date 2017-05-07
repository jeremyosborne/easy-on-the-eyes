//
// Integration of reducers for redux store.
//
import * as content from './content'
import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import {routerReducer as routing} from 'react-router-redux'

const reducer = combineReducers({
  [content.REDUCER_KEY]: content.reducer,
  form,
  routing,
})

export default reducer
