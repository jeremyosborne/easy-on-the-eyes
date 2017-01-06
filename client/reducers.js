import { combineReducers } from 'redux'
import { FETCH_CONTENT } from './actions'

const content = function (state = {}, action) {
  switch (action.type) {
    case FETCH_CONTENT:
      return [
        ...state,
        {
          url: action.url
        }
      ]
    default:
      return state
  }
}

const reducers = combineReducers({
  content
})

export default reducers
