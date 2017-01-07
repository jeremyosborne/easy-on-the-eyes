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
    var initialState = {
      content: this.props.content || {}
    }
    var dataScriptBootstrap = {
      __html: this.props.content ? 'window.initialState = ' + JSON.stringify(initialState) : ''
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
          <script dangerouslySetInnerHTML={dataScriptBootstrap} />
          <script src='/app.js' />
        </body>
      </html>
    )
  }
})

export default Reader
