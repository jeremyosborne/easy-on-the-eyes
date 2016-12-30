var express = require('express')
var path = require('path')
var webpack = require('webpack')

module.exports = function () {
  var router = express.Router()
  var webpackConfig = require(path.resolve(__dirname, '../.webpack.config'))
  var webpackCompiler = webpack(webpackConfig)
  var webpackDevMiddlewareConfig = {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {colors: true}
  }

  router.use(require('webpack-dev-middleware')(webpackCompiler, webpackDevMiddlewareConfig))
  router.use(require('webpack-hot-middleware')(webpackCompiler))
  return router
}
