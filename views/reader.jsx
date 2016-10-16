var React = require('react')
var Content = require('./content.jsx')
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
          <NavForm content={this.props.content} />
          <Content content={this.props.content} />
          <script src='/app.js' />
          {this.props.env.NODE_ENV === 'production' ? '' : <script src='reload/reload.js' />}
        </body>
      </html>
    )
  }
})
