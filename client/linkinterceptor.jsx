// import { fetchContent } from './content-actions'
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import url from 'url'

/**
 * Clicks an anchor tags in child components/elements will be watched and content
 * will attempt to be loaded within our app.
 */
const LinkInterceptor = React.createClass({
  getInitialState: function () {
    // Reference to our DOM element after mounting.
    this._linkInterceptorEl = null

    return {}
  },
  // Easy on the eyes acts as a proxy. The page equivalent is stored in the
  // `?url=<page>` param.
  contentUrl: function () {
    var contentUrl = url.parse(window.location.href, true).query.url || ''
    if (contentUrl) {
      try {
        contentUrl = decodeURIComponent(contentUrl)
      } catch (err) {
        contentUrl = ''
      }
    }
    return contentUrl
  },
  // Attach as a real DOM event to listen for clicks on `a`nchor tags.
  linkInterceptor: function (ev) {
    var t = ev.target
    var contentUrl = this.contentUrl()
    ev.preventDefault()
    if (t.tagName.toLowerCase() === 'a') {
      var targetHref = t.getAttribute('href')
      if (targetHref) {
        ev.preventDefault()
        // Using the `url.resolve` logic should allow links to be resolved
        // correctly against the content url, whether relative or absolute.
        this.props.dispatch(push({
          pathname: '/content',
          query: {
            url: url.resolve(contentUrl, targetHref)
          }
        }))
      }
    }
  },
  componentDidMount: function () {
    // Need raw event listener for listening to `a`nchor tag clicks.
    this._linkInterceptorEl.addEventListener('click', this.linkInterceptor)
  },
  componentWillUnmount: function () {
    this._linkInterceptorEl.removeEventListener('click', this.linkInterceptor)
  },
  render: function () {
    return (
      <div className='link-interceptor' ref={(c) => {
        this._linkInterceptorEl = c
      }}>
        {this.props.children}
      </div>
    )
  }
})

// Does not listen to store changes but will send changes on click.
export default connect()(LinkInterceptor)
