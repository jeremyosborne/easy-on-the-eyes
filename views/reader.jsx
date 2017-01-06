import React from 'react'

const Reader = React.createClass({
  propTypes: {
    // Dangerous html friendly object.
    content: React.PropTypes.object
  },
  getDefaultProps: function () {
    const content = Object.freeze({
      __html: null
    })
    return {
      content: content
    }
  },
  render: function () {
    var dataBootstrap = {
      __html: this.props.content ? 'window.content = ' + JSON.stringify(this.props.content) : ''
    }
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
          <div id='app' />
          <script dangerouslySetInnerHTML={dataBootstrap} />
          <script src='/app.js' />
        </body>
      </html>
    )
  }
})

export default Reader
