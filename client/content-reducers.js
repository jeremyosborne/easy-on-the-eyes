import {FETCH_CONTENT, FETCHED_CONTENT} from './content-actions'
import {content} from 'easy-on-the-eyes-content'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONTENT:
      return {
        // Fetching content implies a fresh content object.
        ...content({
          isFetching: true,
          content: {
            url: action.url
          },
        }),
      }
    case FETCHED_CONTENT:
      return {
        ...content(action.content),
      }
    default:
      return state
  }
}
