/**
 * Input a URL and navigate to it.
 */

require('./navform.css')

import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

const NavForm = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    dispatch: React.PropTypes.func
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
    this.props.dispatch(push({
      pathname: '/content',
      query: {
        url: this.state.fields.url
      }
    }))
  },
  render: function () {
    return (
      <form onSubmit={this.submit} onChange={this.handleChange} className='nav-form'>
        <label htmlFor='url'>
          What do you want to read today?
        </label>
        <br />
        <br />
        <input type='url' name='url' id='url' placeholder='https://someplace.com/link/to/content' />
        <FlatButton label='read it' />
      </form>
    )
  }
})

const mapStateToProps = function (state) {
  return { content: state.content }
}

export default connect(mapStateToProps)(NavForm)
