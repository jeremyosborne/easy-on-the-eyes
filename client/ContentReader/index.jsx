import * as content from 'content'
import LinkInterceptor from 'LinkInterceptor'
import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'

import './index.css'

export class ContentReader extends React.Component {
  static propTypes = {
    content: React.PropTypes.object,
  }

  render () {
    const {
      content,
    } = this.props
    let main = null
    if (content.isError) {
      main = (
        <div>You has error.</div>
      )
    } else if (content.loading) {
      main = (
        <div>Retrieving content from {content.url}.</div>
      )
    } else {
      main = (
        <LinkInterceptor>
          <div dangerouslySetInnerHTML={{__html: content.text}} />
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
)(ContentReader)
