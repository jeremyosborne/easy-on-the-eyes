/**
 * Input a URL and navigate to it.
 */

import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {
  // bindActionCreators,
  compose,
} from 'redux'
import {
  Field,
  reduxForm,
} from 'redux-form'
import {TextField} from 'redux-form-fields'
import urlJoin from 'url-join'
import validate from 'validate.js'

import styles from './index.css'  // eslint-disable-line no-unused-vars

export class ContentLoadForm extends React.Component {
  static propTypes = {
    router: PropTypes.object,
    reduxForm: PropTypes.object,
  }

  submit = (values) => {
    if (values) {
      this.props.router.push(urlJoin('/content', encodeURIComponent(values.url)))
    }
  }

  render () {
    const {
      reduxForm,
    } = this.props
    return (
      <form onSubmit={reduxForm.handleSubmit(this.submit)} styleName='styles.nav-form'>
        <div>
          <Field
            component={TextField}
            label='What do you want to read today?'
            name='url'
            fullWidth
          />
        </div>
        <RaisedButton
          fullWidth
          disabled={reduxForm.pristine || reduxForm.invalid}
          label='read it'
          type='submit'
        />
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
  return {}
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
    withRouter
  )(ContentLoadForm)
}
