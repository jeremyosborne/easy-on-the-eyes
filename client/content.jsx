require('./content.css')

import * as content from 'easy-on-the-eyes-content'
import LinkInterceptor from './linkinterceptor'
import React from 'react'
import { connect } from 'react-redux'

const Content = React.createClass({
  propTypes: {
    // Dangerous html friendly object.
    content: React.PropTypes.object
  },
  getDefaultProps: function () {
    return {
      content: content.genContent()
    }
  },
  render: function () {
    const {
      isError,
      isFetching,
      urlBeingFetched
    } = this.props
    let main = null
    if (isError) {
      main = (
        <div>You has error.</div>
      )
    } else if (isFetching) {
      main = (
        <div>Retrieving content from {urlBeingFetched}.</div>
      )
    } else {
      main = (
        <LinkInterceptor>
          <div dangerouslySetInnerHTML={this.props.content} />
        </LinkInterceptor>
      )
    }
    return (
      <div className='content'>
        {main}
      </div>
    )
  }
})

const mapStateToProps = function (state) {
  return {
    error: content.error(state),
    isError: content.isError(state),
    isFetching: content.isFetching(state),
    urlBeingFetched: content.urlBeingFetched(state),
    content: state.content
  }
}

export default connect(mapStateToProps)(Content)
