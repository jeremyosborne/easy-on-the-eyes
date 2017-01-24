require('./content.css')

import { genContent } from 'easy-on-the-eyes-content'
import AppBar from 'material-ui/AppBar'
import LinkInterceptor from './linkinterceptor.jsx'
import React from 'react'
import { connect } from 'react-redux'

const Content = React.createClass({
  propTypes: {
    // Dangerous html friendly object.
    content: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      content: genContent()
    }
  },
  render: function () {
    return (
      <div>
        <AppBar
          title='Easy on the eyes'
          iconClassNameLeft=''
          iconClassNameRight=''
        />
        <LinkInterceptor>
          <div className='content' dangerouslySetInnerHTML={this.props.content} />
        </LinkInterceptor>
      </div>
    )
  }
})

const mapContentToProps = function (state) {
  return {
    content: state.content
  }
}

export default connect(mapContentToProps)(Content)
