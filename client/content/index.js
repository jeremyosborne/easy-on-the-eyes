import * as api from './api'
import * as constants from './constants'
import {content} from 'easy-on-the-eyes-content'
import {selector} from './selectors'

const REDUCER_KEY = constants.REDUCER_KEY

export {
  constants,
  content,  // Make the content factory available.
  REDUCER_KEY,
  selector,
}

export const reducer = (state = constants.DEFAULT_STATE, action) => {
  switch (action.type) {
    case constants.FETCH_CONTENT:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
export default reducer

// Request content.
export const fetchContent = ({href}) => {
  return (dispatch) => {
    // Get new content based on state of url.
    dispatch({
      type: constants.FETCH_CONTENT,
      payload: content({
        // This is augmented for use in the client.
        loading: true,
        content: {
          url: href,
        }
      })
    })
    return api.fetchContent({url: href}).then((content) => {
      dispatch({
        type: constants.FETCH_CONTENT,
        payload: content
      })
    })
  }
}
