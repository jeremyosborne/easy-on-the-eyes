import {FETCH_CONTENT, FETCHED_CONTENT, UPDATE_CONTENT} from './content-actions'

export const content = function (state = {}, action) {
  switch (action.type) {
    case UPDATE_CONTENT:
      // We expect content to be delivered in some form no matter what.
      return {
        ...(action.content || {})
      }
    default:
      return state
  }
}

export const fetchingContent = function (state = {}, action) {
  switch (action.type) {
    case FETCH_CONTENT:
      return {
        ...state,
        url: action.url
      }
    case FETCHED_CONTENT:
      return {
        url: null
      }
    default:
      return state
  }
}
