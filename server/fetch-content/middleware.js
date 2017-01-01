var fetchContent = require('./index')

/**
 * Produce a middleware function for retrieving content via querystring param
 * and attaching it to res.locals.content, if available, for later consumption.
 *
 * Usage:
 *
 * var fetchContentMiddleware = require('fetch-content/middleware')
 * app.use(fetchContentMiddleWare())
 *
 * @param {object} options Hash of options.
 * @param {object} options.urlQueryKey Option to change what query string key is
 * monitored for remote content retrieval.
 * @param {object} options.logger Optional implementing logger interface. Required
 * to log output.
 */
module.exports = function ({urlQueryKey = 'u', logger} = {}) {
  return function (req, res, next) {
    var u = req.query[urlQueryKey]
    if (u) {
      fetchContent(u)
        .then(function (content) {
          if (logger) {
            logger.debug('fetched content from:', u, 'using filter:', content.transformer.name)
          }
          res.locals.content = content
          next()
        })
        .catch(function (err) {
          if (logger) {
            logger.error('Could not retrieve content from:', u, 'with error:', err)
            // TODO: Should the content object also convey errors?
          }
          next()
        })
    } else {
      next()
    }
  }
}
