import './content.css'

import * as content from 'easy-on-the-eyes-content'
import LinkInterceptor from './linkinterceptor'
import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'

export class Content extends React.Component {
  static propTypes = {
    content: React.PropTypes.object,
    isError: React.PropTypes.bool,
    isFetching: React.PropTypes.bool,
    urlBeingFetched: React.PropTypes.string
  }

  static defaultProps = {
    content: content.genContent()
  }

  render () {
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
}

export const mapStateToProps = function (state) {
  return {
    error: content.error(state),
    isError: content.isError(state),
    isFetching: content.isFetching(state),
    urlBeingFetched: content.urlBeingFetched(state),
    content: state.content
  }
}

export default compose(
  connect(mapStateToProps)
)(Content)
