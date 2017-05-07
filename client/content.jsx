import * as content from './content'
import LinkInterceptor from './linkinterceptor'
import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'

import './content.css'

export class Content extends React.Component {
  static propTypes = {
    isError: React.PropTypes.bool,
    // isFetching: React.PropTypes.bool,
    // urlBeingFetched: React.PropTypes.string,
    text: React.PropTypes.object,
  }

  static defaultProps = {
    content: content.content()
  }

  render () {
    const {
      isError,
      // isFetching,
      // urlBeingFetched
    } = this.props
    let main = null
    if (isError) {
      main = (
        <div>You has error.</div>
      )
    // } else if (isFetching) {
    //   main = (
    //     <div>Retrieving content from {urlBeingFetched}.</div>
    //   )
    } else {
      main = (
        <LinkInterceptor>
          <div dangerouslySetInnerHTML={this.props.text} />
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
    content: content.selector(state)
  }
}

export default compose(
  connect(mapStateToProps)
)(Content)
