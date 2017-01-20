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
    // var initialState = {
    //   content: this.props.content || {}
    // }
    //
    // 2017-Jan-17: Removed this until I can figure out the least pain in the ass
    // way to conveniently bootstrap data in the page without screwing other parts
    // of the code.
    //
    // var dataScriptBootstrap = {
    //   __html: this.props.content ? 'window.initialState = ' + JSON.stringify(initialState) : ''
    // }
    var dataScriptBootstrap = {
      __html: ''
    }
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <title>
            Easy on the eyes
          </title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' rel='stylesheet' />
          <link href='/app.css' rel='stylesheet' />
        </head>
        <body>
          <div id='app-container' />
          <script dangerouslySetInnerHTML={dataScriptBootstrap} />
          <script src='/app.js' />
        </body>
      </html>
    )
  }
})

export default Reader
