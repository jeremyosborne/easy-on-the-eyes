/**
 * Retrieve and transform web content.
 *
 * Call with a URL and (not unsupported) options object.
 *
 * Promise api rejecting with error or resolving witih a content object.
 */
var Promise = require('bluebird')
var request = require('request')
// TODO: Swap in fetch which uses promises
var fetch = require('isomorphic-fetch')
var xforms = require('easy-on-the-eyes-xforms')

module.exports = function (url, options) {
  var transformer = xforms.bestGuess(url)
  return new Promise(function (resolve, reject) {
    request(url, function (err, reqResponse, body) {
      if (err) {
        reject({
          // Experiment: pass back error.
          error: err,
          transformer: {
            name: transformer.name
          },
          url: url,
          __html: transformer.xform(body).trim()
        })
      } else {
        resolve({
          error: null,
          transformer: {
            name: transformer.name
          },
          url: url,
          __html: transformer.xform(body).trim()
        })
      }
    })
  })
}
