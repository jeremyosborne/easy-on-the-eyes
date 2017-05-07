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

// Determine what is our base url for our page for links to relative references
// since our "page" is mainly determined by the `?url=` query parameter and not
// the domain hosting easy-on-the-eyes.
const contentUrl = () => {
  const pageUrl = url.parse(window.location.href, true)
  // content-url
  let contentUrl = (pageUrl.query && pageUrl.query.url) || ''
  if (contentUrl) {
    try {
      contentUrl = decodeURIComponent(contentUrl)
    } catch (err) {
      // Just in case even with the checks above it is garbage.
      contentUrl = ''
    }
  }
  return contentUrl
}

// Transition to content viewing page and request new content.
export const viewContent = ({href}) => {
  return (dispatch) => {
    // Fix hrefs with paths relative to the reading content before passing
    // on to API.
    href = url.resolve(contentUrl(), href)
    history.push({
      pathname: '/content',
      query: {
        url: href
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
