/**
 * Input a URL and navigate to it.
 */

import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {push} from 'react-router-redux'
import {compose} from 'redux'
import {
  // Field,
  reduxForm,
} from 'redux-form'
// import {connect} from 'react-redux'

import './index.css'

export class NavForm extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      fields: {},
    }
  }

  handleChange = (e) => {
    var fields = this.state.fields
    fields[e.target.name] = e.target.value
    this.setState({'fields': fields})
  }

  submit = (e) => {
    e.preventDefault()
    this.props.dispatch(push({
      pathname: '/content',
      query: {
        url: this.state.fields.url,
      },
    }))
  }

  render () {
    return (
      <form onSubmit={this.submit} onChange={this.handleChange} className='nav-form'>
        <TextField floatingLabelText='What do you want to read today?' type='url' name='url' id='url' />
        <FlatButton label='read it' type='submit' />
      </form>
    )
  }
}

// see: https://github.com/redfin/react-server/issues/917
// for why we have to export in this really dumb way.
export default {rf: compose(
  reduxForm({form: 'navForm'}),
)(NavForm)}
