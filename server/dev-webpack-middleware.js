var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')

/**
 * Configure and return webpack developer middleware.
 *
 * Includes dev and hot middleware.
 *
 * @param {object} options hash of arguments.
 * @param {object} options.webpackConfig webpack configuration passed to the
 * webpackCompiler.
 * @param {object} options.webpackDevMiddlewareConfig optional overrides to pass
 * to the webpack-dev-middleware.
 */
module.exports = function ({webpackConfig, webpackDevMiddlewareConfig = {}} = {}) {
  if (!webpackConfig) {
    throw new Error('`webpackConfig` not optional.')
  }
  var router = express.Router()
  var webpackCompiler = webpack(webpackConfig)
  webpackDevMiddlewareConfig = Object.assign({}, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {colors: true}
  }, webpackDevMiddlewareConfig)

  router.use(webpackDevMiddleware(webpackCompiler, webpackDevMiddlewareConfig))
  router.use(webpackHotMiddleware(webpackCompiler))
  return router
}
