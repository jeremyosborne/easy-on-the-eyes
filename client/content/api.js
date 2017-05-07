//
// Client HTTP requests back to the server.
//

import axios from 'axios'
import qs from 'querystring'

const BASE_PATH = '/api/content?'

export const fetchContent = function ({url}) {
  return axios.get(BASE_PATH + qs.stringify({'url': url}))
    .then(function (res) {
      return res.data
    })
    .catch(function (err) {
      throw err
    })
}
