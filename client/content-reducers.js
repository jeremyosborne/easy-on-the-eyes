import {FETCH_CONTENT} from './content-actions'

export const content = function (state = {}, action) {
  return state
}

export const fetchingContent = function (state = {}, action) {
  switch (action.type) {
    case FETCH_CONTENT:
      return {
        ...state,
        url: action.url
      }
    default:
      return state
  }
}
