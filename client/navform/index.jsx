/**
 * Input a URL and navigate to it.
 */

import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {push} from 'react-router-redux'
import {compose} from 'redux'
import {connect} from 'react-redux'

import './index.css'

export class NavForm extends React.Component {
  static propTypes = {
    // content: React.PropTypes.object,
    dispatch: React.PropTypes.func
  }

  static defaultProps = {
    content: {
      __html: null,
    }
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

const mapStateToProps = function (state) {
  return { content: state.content }
}

export default compose(
  connect(mapStateToProps)
)(NavForm)
