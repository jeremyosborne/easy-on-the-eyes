export const FETCH_CONTENT = 'FETCH_CONTENT'
export const UPDATE_CONTENT = 'UPDATE_CONTENT'

export const fetchContent = function ({url}) {
  return {
    type: FETCH_CONTENT,
    url
  }
}

export const updateContent = function ({content}) {
  return {
    type: UPDATE_CONTENT,
    content
  }
}
