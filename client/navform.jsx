/**
 * Input a URL and navigate to it.
 */

require('./navform.css')

import {fetchContent} from './content-actions'
import React from 'react'
import {connect} from 'react-redux'

const NavForm = React.createClass({
  propTypes: {
    content: React.PropTypes.object
  },
  getDefaultProps: function () {
    const content = Object.freeze({
      __html: null
    })
    return {
      content: content
    }
  },
  getInitialState: function () {
    return {
      fields: {}
    }
  },
  handleChange: function (e) {
    var fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({'fields': fields})
  },
  submit: function (e) {
    e.preventDefault()
    // window.location.href = '/content?' + qs.stringify(this.state.fields)
    this.props.dispatch(fetchContent(this.state.fields))
  },
  render: function () {
    return (
      <form onSubmit={this.submit} onChange={this.handleChange} className='nav-form'>
        <label htmlFor='url'>
          What do you want to read today?
        </label>
        <br />
        <input type='url' name='url' id='url' />
        <input type='submit' />
      </form>
    )
  }
})

const mapContentToProps = function (state) {
  return { content: state.content }
}

export default connect(mapContentToProps)(NavForm)
