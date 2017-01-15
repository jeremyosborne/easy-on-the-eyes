export const FETCH_CONTENT = 'FETCH_CONTENT'
export const FETCHED_CONTENT = 'FETCHED_CONTENT'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'

// Grab content from URL.
export const fetchContent = function ({url}) {
  return {
    type: FETCH_CONTENT,
    url
  }
}

// Content was retrieved from the URL.
export const fetchedContent = function () {
  return {
    type: FETCHED_CONTENT
  }
}

// Update the content object with this content.
export const updateContent = function ({content}) {
  return {
    type: UPDATE_CONTENT,
    content
  }
}
