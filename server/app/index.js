var express = require('express')
var expressReactViews = require('express-react-views')
var favicon = require('serve-favicon')
var logger = require('./logger')
var morgan = require('morgan')
var request = require('request')
var path = require('path')
var xforms = require('easy-on-the-eyes-xforms')
var webpack = require('webpack')

// For accessing public, views, and other sibling directories.
var ROOT_PATH = path.resolve(path.join(__dirname, '..', '..'))

var app = express()

app.set('views', path.join(ROOT_PATH, 'views'))
app.set('view engine', 'jsx')
app.engine('jsx', expressReactViews.createEngine())

app.use(favicon(path.join(ROOT_PATH, 'public', 'favicon.ico')))
app.use(morgan('dev'))

// Pass along env state.
app.use(function (req, res, next) {
  res.locals.env = Object.assign({}, process.env)
  next()
})

// Content of the article/page to load, if it exists.
app.use(function (req, res, next) {
  res.locals.content = {__html: ''}
  next()
})

// All incoming requests might have a u query string parameter.
// If they do, we will attempt to retrieve the contents at the URL.
app.use(function (req, res, next) {
  var u = req.query.u
  if (u) {
    var tranformer = xforms.bestGuess(u)
    request(u, function (err, reqResponse, body) {
      if (err) {
        logger.error('Could not retrieve content from:', u, 'with error:', err)
      } else {
        logger.debug('fetched content from:', u, 'using filter:', tranformer.name)
        res.locals.content = {__html: tranformer.xform(body).trim()}
      }
      next()
    })
  } else {
    next()
  }
})

if (process.env.NODE_ENV !== 'production') {
  logger.info('Developer server serving.')

  var webpackConfig = require(path.resolve(__dirname, '../../.webpack.config'))
  var webpackCompiler = webpack(webpackConfig)
  var webpackDevMiddlewareConfig = {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {colors: true}
  }

  app.use(require('webpack-dev-middleware')(webpackCompiler, webpackDevMiddlewareConfig))
  app.use(require('webpack-hot-middleware')(webpackCompiler))
}

app.get('/', function (req, res) {
  res.render('reader', {})
})

app.use(express.static(path.join(ROOT_PATH, 'public')))

module.exports = app
