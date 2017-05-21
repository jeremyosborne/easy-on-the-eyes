/**
 * Input a URL and navigate to it.
 */

import {viewContent} from 'content'
import FlatButton from 'material-ui/FlatButton'
import React from 'react'
import {connect} from 'react-redux'
import {compose, bindActionCreators} from 'redux'
import {
  Field,
  reduxForm,
} from 'redux-form'
import {TextField} from 'redux-form-fields'
import validate from 'validate.js'

import './index.css'

export class ContentLoadForm extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    reduxForm: React.PropTypes.object,
  }

  submit = (values) => {
    if (values) {
      this.props.actions.viewContent({
        href: values.url,
      })
    }
  }

  render () {
    const {
      reduxForm,
    } = this.props
    return (
      <form onSubmit={reduxForm.handleSubmit(this.submit)} className='nav-form'>
        <Field
          component={TextField}
          label='What do you want to read today?'
          name='url'
        />
        <FlatButton disabled={reduxForm.pristine || reduxForm.invalid} label='read it' type='submit' />
      </form>
    )
  }
}

export const validateRules = {
  url: {
    presence: true,
    url: {message: 'please make it look like a URL'},
  }
}

export const validator = (values) => {
  return validate(values, validateRules, {fullMessages: false})
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

// see: https://github.com/redfin/react-server/issues/917
// for why we have to export in this really dumb way.
export default {
  rf: compose(
    reduxForm({
      form: 'navForm',
      propNamespace: 'reduxForm',
      validate: validator,
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(ContentLoadForm)
}
