import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {
  // bindActionCreators,
  compose,
} from 'redux'
import url from 'url'
import urlJoin from 'url-join'

/**
 * Clicks an anchor tags in child components/elements will be watched and content
 * will attempt to be loaded within our app.
 */
export class LinkInterceptor extends React.Component {
  constructor (props) {
    super(props)

    // Reference to our DOM element after mounting.
    this._linkInterceptorEl = null
  }

  static propTypes = {
    children: PropTypes.node,
    params: PropTypes.object,
    router: PropTypes.object,
  }

  // Determine what is our base url for our page for links to relative references
  // since our "page" is mainly determined by the `?url=` query parameter and not
  // the domain hosting easy-on-the-eyes.
  contentUrl = () => {
    // Check to see if there is a current contentHref in the URL
    return decodeURIComponent(this.props.params.contentHref || '')
  }

  // Attach as a real DOM event to listen for clicks on `a`nchor tags.
  linkInterceptor = (ev) => {
    var t = ev.target
    if (t.tagName.toLowerCase() === 'a') {
      var href = t.getAttribute('href')
      if (href) {
        ev.preventDefault()
        this.props.router.push(urlJoin(
          '/content',
          // If we are viewing a page, we need to handle relative links relatively
          // from the current content.
          url.resolve(this.contentUrl(), encodeURIComponent(href))
        ))
      }
    }
  }

  componentDidMount () {
    // Need raw event listener for listening to `a`nchor tag clicks.
    this._linkInterceptorEl.addEventListener('click', this.linkInterceptor)
  }

  componentWillUnmount () {
    this._linkInterceptorEl.removeEventListener('click', this.linkInterceptor)
  }

  render () {
    return (
      <div className='link-interceptor' ref={(c) => {
        this._linkInterceptorEl = c
      }}>
        {this.props.children}
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
  return {}
}

export const mapDispatchToProps = (dispatch) => {
  return {}
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(LinkInterceptor)
