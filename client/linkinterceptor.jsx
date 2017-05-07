import {viewContent} from './content'
import React from 'react'
import {connect} from 'react-redux'
import {compose, bindActionCreators} from 'redux'

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
    actions: React.PropTypes.object,
    children: React.PropTypes.node,
  }

  // Attach as a real DOM event to listen for clicks on `a`nchor tags.
  linkInterceptor = (ev) => {
    var t = ev.target
    if (t.tagName.toLowerCase() === 'a') {
      var href = t.getAttribute('href')
      if (href) {
        ev.preventDefault()
        this.props.actions.viewContent({href})
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
  return {
    actions: bindActionCreators({
      viewContent,
    }, dispatch)
  }
}

return compose(
  connect(mapStateToProps, mapDispatchToProps)
)(LinkInterceptor)
