import * as content from 'content'
import LinkInterceptor from 'LinkInterceptor'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'

export class ContentReader extends React.Component {
  static propTypes = {
    content: PropTypes.object,
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
      <div>
        {main}
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {
    content: content.selector(state)
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {}
}

export default compose(
  connect(mapStateToProps)
)(ContentReader)
