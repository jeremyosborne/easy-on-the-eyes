//
// HTTP requests back to the server.
//

// NOTE: Switch this to universal when done.

const fetch = require('isomorphic-fetch')
const qs = require('querystring')

const BASE_PATH = '/api/content?'

// Basic content data type.
const contentTemplate = {
  error: null,
  transformer: {
    name: null
  },
  url: null,
  __html: null
}

/**
 * Returns an instance of the contentTemplate.
 *
 * @param {object} overrides Overrides for content. Assumes correct format.
 * @return {object} Basic content object.
 */
const genContent = function (overrides) {
  return Object.assign({}, contentTemplate, overrides || {})
}
module.exports.genContent = genContent

const fetchContent = function ({url}) {
  return fetch(BASE_PATH + qs.stringify({'url': url}))
    .then(function (res) {
      if (!res.ok) {
        // This is an error in the API itself.
        const err = new Error(res.statusText)
        err.code = res.status
        throw err
      } else {
        // Even if URL didn't get content, we should still get a content object.
        return res.json()
      }
    })
    .catch(function (err) {
      // Network or non-okay response (non-okay response rethrown)
      // TODO: Retry?
      throw err
    })
}
module.exports.fetchContent = fetchContent
