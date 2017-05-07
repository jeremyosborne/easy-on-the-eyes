import * as api from './api'
import {
  DEFAULT_STATE,
  FETCH_CONTENT,
  REDUCER_KEY,
} from './constants'
import {content} from 'easy-on-the-eyes-content'
import history from 'history'
import {selector} from './selectors'
import url from 'url'

export {
  // Content factory
  content,
  REDUCER_KEY,
  selector,
}

export const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTENT:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
export default reducer

// Helps with deciding if the link is a url local to our current location or
// an external url.
const contentUrl = () => {
  var cUrl = url.parse(window.location.href, true).query.url || ''
  if (cUrl) {
    try {
      cUrl = decodeURIComponent(contentUrl)
    } catch (err) {
      cUrl = ''
    }
  }
  return cUrl
}

// Transition to content viewing page and request new content.
export const viewContent = ({href}) => {
  return (dispatch) => {
    history.push({
      pathname: '/content',
      query: {
        url: url.resolve(contentUrl(), href)
      }
    })
    // Get new content based on state of url.
    return dispatch(fetchContent({href}))
  }
}

// Request content.
export const fetchContent = ({href}) => {
  return (dispatch) => {
    // Get new content based on state of url.
    dispatch({
      type: FETCH_CONTENT,
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
        type: FETCH_CONTENT,
        payload: content
      })
    })
  }
}
