const devWebpackMiddleware = require('./dev-webpack-middleware')
const express = require('express')
const content = require('easy-on-the-eyes-content').content
const fetchContent = require('fetch-content').fetchContent
const logger = require('./logger')
const morgan = require('morgan')
const path = require('path')

// For accessing public, views, and other sibling directories.
var ROOT_PATH = path.resolve(path.join(__dirname, '..'))

var app = express()

if (process.env.NODE_ENV !== 'production') {
  logger.info('Running in dev mode.')

  logger.info('winston logging level to "debug".')
  logger.level = 'debug'

  logger.info('morgan logging set to "dev".')
  app.use(morgan('dev'))
} else {
  logger.info('Running in production mode.')

  logger.info('winstoh logging level to "info".')
  logger.level = 'info'

  logger.info('morgan logging set to "combined".')
  app.use(morgan('combined'))
}

// AJAX specific content fetching.
// Assumed that if this is being called, we want content or we want to
// deliver a sane object that describes why we can't get the error.
app.get('/api/content', function (req, res) {
  // If we are here, we better have content on res.locals.content.
  var url = req.query.url
  if (url) {
    fetchContent(url).then((content) => {
      res.send(content)
    }).catch((errorContent) => {
      res.status(errorContent.error.code || 500).send(content)
    })
  } else {
    res.status(400).send(content({
      error: {
        code: 400,
        message: 'please provide url query parameter',
      }
    }))
  }
})

// If something slips through still return JSON
app.use('/api', function (err, req, res, next) {
  const code = err.status || 500
  logger.debug('Unhandled `/api` error:', err)

  // use the error's status or default to 500
  res.status(code)

  // send back json data
  res.send({
    error: {
      code: code,
      message: err.message || 'Unkonwn server error.'
    }
  })
})

if (process.env.NODE_ENV !== 'production') {
  // We want this loading after APIs but before static file handling.
  // webpack dev server-ish stuff will catch and intercept any request,
  // like index.html, that we might want to service with our other parts
  // of our application.
  logger.info('Loading webpack dev and hot reloading middleware.')
  app.use(devWebpackMiddleware({
    // Webpack 2 idiom exports a function not a static configuration file.
    webpackConfig: require(path.resolve(__dirname, '../webpack.config'))({
      production: false
    })
  }))
}

// Intended to service routes intended to display content and not the index.
app.get('/content', function (req, res) {
  res.sendFile(path.join(ROOT_PATH, 'public/index.html'))
})

// Intended to service index specific route.
app.get('/', function (req, res) {
  res.sendFile(path.join(ROOT_PATH, 'public/index.html'))
})

app.use(express.static(path.join(ROOT_PATH, 'public')))

module.exports = app
