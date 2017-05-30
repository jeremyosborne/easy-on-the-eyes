import LinkInterceptor from 'LinkInterceptor'
import PropTypes from 'prop-types'
import React from 'react'

export class ContentReader extends React.Component {
  static propTypes = {
    content: PropTypes.object,
  }

  static defaultProps = {
    content: {}
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
    } else if (content.loading && content.url) {
      main = (
        <div>Retrieving content from {content.url}.</div>
      )
    } else if (content.text) {
      main = (
        <LinkInterceptor>
          <div dangerouslySetInnerHTML={{__html: content.text}} />
        </LinkInterceptor>
      )
    } else {
      main = (
        <div>There is no content to show.</div>
      )
    }
    return (
      <div>
        {main}
      </div>
    )
  }
}

export default ContentReader
