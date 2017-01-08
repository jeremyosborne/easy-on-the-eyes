/**
 * Input a URL and navigate to it.
 */

require('./navform.css')

import classNames from 'classnames'
import qs from 'querystring'
import React from 'react'
import { connect } from 'react-redux'
import Suggestions from './suggestions.jsx'

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
    this.setState('fields', fields)
  },
  submit: function (e) {
    e.preventDefault()
    window.location.href = qs.stringify(this.state.fields)
  },
  render: function () {
    var classes = classNames('navform', {
      hide: this.props.content.__html
    })
    return (
      <div className={classes}>
        <form onSubmit={this.submit}>
          <label htmlFor='url'>
            What do you want to read today?
          </label>
          <br />
          <input type='url' name='url' id='url' />
          <input type='submit' />
          <br />
        </form>
        <Suggestions />
      </div>
    )
  }
})

const mapContentToProps = function (state) {
  return { content: state.content }
}

export default connect(mapContentToProps)(NavForm)
