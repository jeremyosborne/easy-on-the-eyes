//
// HTTP requests back to the server.
//

import fetch from 'isomorphic-fetch'
import qs from 'querystring'

const BASE_PATH = '/api/content?'

export const fetchContent = function ({url}) {
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
