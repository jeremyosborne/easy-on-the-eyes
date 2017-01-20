require('./content.css')

import AppBar from 'material-ui/AppBar'
import { genContent } from './content-api'
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
    content: state.content,
    fetchingContent: state.fetchingContent
  }
}

export default connect(mapContentToProps)(Content)
