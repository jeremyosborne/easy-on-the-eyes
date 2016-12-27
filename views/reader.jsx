var React = require('react')
var Content = require('./content.jsx')
var LinkInterceptor = require('./linkinterceptor.jsx')
var NavForm = require('./navform.jsx')

module.exports = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>
            Easy on the eyes
          </title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='/app.css' rel='stylesheet' />
        </head>
        <body>
          <LinkInterceptor>
            <NavForm content={this.props.content} />
            <Content content={this.props.content} />
          </LinkInterceptor>
          <script src='/app.js' />
        </body>
      </html>
    )
  }
})
