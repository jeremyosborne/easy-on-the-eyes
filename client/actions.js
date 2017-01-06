export const FETCH_CONTENT = 'FETCH_CONTENT'

export const fetchContent = function (url) {
  return { type: 'FETCH_CONTENT', url }
}
