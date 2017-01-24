export const FETCH_CONTENT = 'FETCH_CONTENT'
export const FETCHED_CONTENT = 'FETCHED_CONTENT'

// Grab content from URL.
export const fetchContent = function ({url}) {
  return {
    type: FETCH_CONTENT,
    url
  }
}

// Content was retrieved from the URL.
export const fetchedContent = function ({content}) {
  return {
    type: FETCHED_CONTENT,
    content
  }
}
