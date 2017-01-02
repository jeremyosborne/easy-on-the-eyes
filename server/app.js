const devWebpackMiddleware = require('./dev-webpack-middleware')
const express = require('express')
const expressReactViews = require('express-react-views')
const favicon = require('serve-favicon')
const fetchContentQsMiddlware = require('./fetch-content/qs-middleware')
const logger = require('./logger')
const morgan = require('morgan')
const path = require('path')

// For accessing public, views, and other sibling directories.
var ROOT_PATH = path.resolve(path.join(__dirname, '..'))

var app = express()

app.set('views', path.join(ROOT_PATH, 'views'))
app.set('view engine', 'jsx')
app.engine('jsx', expressReactViews.createEngine())

app.use(favicon(path.join(ROOT_PATH, 'public', 'favicon.ico')))

if (process.env.NODE_ENV !== 'production') {
  logger.info('Running in dev mode.')

  logger.info('Setting logging level to "debug."')
  logger.level = 'debug'

  logger.info('Configuration morgan loggin.')
  app.use(morgan('dev'))

  logger.info('Loading webpack dev and hot reloading middleware.')
  app.use(devWebpackMiddleware())
} else {
  logger.info('Running in production mode.')

  logger.info('Setting logging level to "info."')
  logger.level = 'info'

  logger.info('Configuring morgan loggin.')
  app.use(morgan('combined'))
}

// All incoming requests might have a u query string parameter.
// If they do, we will attempt to retrieve the contents at the URL.
app.use(fetchContentQsMiddlware({logger: logger}))

app.get('/', function (req, res) {
  res.render('reader', {})
})

app.use(express.static(path.join(ROOT_PATH, 'public')))

module.exports = app
