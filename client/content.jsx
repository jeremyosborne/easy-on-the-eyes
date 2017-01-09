require('./content.css')
import LinkInterceptor from './linkinterceptor.jsx'
import React from 'react'
import { connect } from 'react-redux'

const Content = React.createClass({
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
    return (
      <LinkInterceptor {...this.props}>
        <div className='content' dangerouslySetInnerHTML={this.props.content} />
      </LinkInterceptor>
    )
  }
})

const mapContentToProps = function (state) {
  return { content: state.content }
}

export default connect(mapContentToProps)(Content)
