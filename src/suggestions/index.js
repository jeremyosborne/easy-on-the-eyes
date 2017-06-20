import * as api from './api'
import {
  DEFAULT_STATE,
  REDUCER_KEY,
  SUGGESTIONS_LOAD,
} from './constants'
import {content} from 'easy-on-the-eyes-content'
import {selector} from './selectors'

export {
  // Content factory
  content,
  REDUCER_KEY,
  selector,
}

export const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SUGGESTIONS_LOAD:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
export default reducer

// Request content.
export const load = ({href = ''} = {}) => {
  return (dispatch) => {
    // Get new content based on state of url.
    dispatch({
      type: SUGGESTIONS_LOAD,
      payload: {
        loading: true,
      }
    })
    return api.fetch({url: href}).then((data) => {
      dispatch({
        type: SUGGESTIONS_LOAD,
        payload: {
          loading: false,
          error: {},
          // Should be `.suggestions[]` only on suggestions.
          ...data,
        }
      })
    })
  }
}
