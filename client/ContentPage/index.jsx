import * as content from 'content'
import ContentReader from 'ContentReader'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'

import styles from './index.css'  // eslint-disable-line no-unused-vars

export class ContentPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    content: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object,
  }

  componentDidMount () {
    const href = decodeURIComponent(this.props.params.contentHref || '')
    if (href) {
      // If on load we have content designated as part of our url state, load it...
      this.props.actions.fetchContent({href})
    } else {
      // ...otherwise why are we here?
      this.props.router.push('/')
    }
  }

  render () {
    return (
      <div styleName='styles.content-page'>
        <ContentReader content={this.props.content} />
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
  return {
    actions: bindActionCreators({
      fetchContent: content.fetchContent,
    }, dispatch)
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(ContentPage)
