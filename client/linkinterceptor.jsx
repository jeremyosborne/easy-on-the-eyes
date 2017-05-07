// import { fetchContent } from './content-actions'
import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import url from 'url'

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
    children: React.PropTypes.node,
    dispatch: React.PropTypes.func,
  }

  // Attach as a real DOM event to listen for clicks on `a`nchor tags.
  linkInterceptor = (ev) => {
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

// Does not listen to store changes but will send changes on click.
export default connect()(LinkInterceptor)
