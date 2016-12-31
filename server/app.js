var devMiddleware = require('./dev-middleware')
var express = require('express')
var expressReactViews = require('express-react-views')
var favicon = require('serve-favicon')
var fetchContent = require('./fetch-content')
var logger = require('./logger')
var morgan = require('morgan')
var path = require('path')

// For accessing public, views, and other sibling directories.
var ROOT_PATH = path.resolve(path.join(__dirname, '..'))

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
    fetchContent(u)
      .then(function (content) {
        logger.debug('fetched content from:', u, 'using filter:', content.transformer.name)
        res.locals.content = content
        next()
      })
      .catch(function (err) {
        logger.error('Could not retrieve content from:', u, 'with error:', err)
        next()
      })
  } else {
    next()
  }
})

if (process.env.NODE_ENV !== 'production') {
  logger.info('Running in dev mode with webpack dev and hot middleware.')

  app.use(devMiddleware())
}

app.get('/', function (req, res) {
  res.render('reader', {})
})

app.use(express.static(path.join(ROOT_PATH, 'public')))

module.exports = app
