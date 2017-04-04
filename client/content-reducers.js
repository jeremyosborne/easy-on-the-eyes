import {FETCH_CONTENT, FETCHED_CONTENT} from './content-actions'
import {genContent} from 'easy-on-the-eyes-content'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONTENT:
      return {
        // Fetching content implies a fresh content object.
        ...genContent({
          isFetching: true,
          url: action.url
        })
      }
    case FETCHED_CONTENT:
      return {
        ...genContent(action.content)
      }
    default:
      return state
  }
}
