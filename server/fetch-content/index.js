/**
 * Retrieve and transform web content.
 *
 * Call with a URL and (not unsupported) options object.
 *
 * Promise api rejecting with error or resolving witih a content object.
 */
var fetch = require('isomorphic-fetch')
var xforms = require('easy-on-the-eyes-xforms')

module.exports = function (url, options) {
  var transformer = xforms.bestGuess(url)
  return fetch(url)
    .then(function (res) {
      if (!res.ok) {
        const err = new Error(res.statusText)
        err.code = res.status
        throw err
      } else {
        return res.text()
      }
    })
    .then(function (html) {
      return {
        error: null,
        transformer: {
          name: transformer.name
        },
        url: url,
        __html: transformer.xform(html).trim()
      }
    })
    .catch(function (err) {
      // Network error OR non-okay response.
      // TODO: Retry?
      var error = {
        error: {
          code: err.code || 0,
          message: err.message
        },
        transformer: {
          name: transformer.name
        },
        url: url,
        __html: null
      }
      throw error
    })
}
