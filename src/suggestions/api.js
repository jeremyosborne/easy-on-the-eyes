//
// Client HTTP requests back to the server.
//

import axios from 'axios'

const BASE_PATH = '/api/suggestions'

export const fetch = function ({url}) {
  return axios.get(BASE_PATH)
    .then(function (res) {
      return res.data
    })
    .catch(function (err) {
      throw err
    })
}
