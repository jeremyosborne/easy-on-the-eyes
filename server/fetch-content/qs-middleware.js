var fetchContent = require('./index')

/**
 * Produce a middleware function for retrieving content via querystring param
 * and attaching it to res.locals.content, if available, for later consumption.
 *
 * Usage:
 *
 * var fetchContentMiddleware = require('fetch-content/middleware')
 * app.use(fetchContentQsMiddleWare())
 *
 * @param {object} options Hash of options.
 * @param {object} options.urlQueryKey Option to change what query string key is
 * monitored for remote content retrieval. Defaults to `url`.
 * @param {object} options.logger Optional implementing logger interface. Required
 * to log output. Defaults to no logging.
 */
module.exports = function ({urlQueryKey = 'url', logger} = {}) {
  return function (req, res, next) {
    var url = req.query[urlQueryKey]
    if (url) {
      fetchContent(url)
        .then(function (content) {
          if (logger) {
            logger.debug('fetched content from:', url, 'using filter:', content.transformer.name)
          }
          res.locals.content = content
          next()
        })
        .catch(function (content) {
          if (logger) {
            logger.error('Could not retrieve content from:', content.url, 'with error:', content.error)
          }
          res.locals.content = content
          next()
        })
    } else {
      next()
    }
  }
}
