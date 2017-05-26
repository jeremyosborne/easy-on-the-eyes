import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import React from 'react'

// Errors coming in from validate.js might be arrays of strings.
const errorConcat = (error) => {
  if (Array.isArray(error)) {
    return error.join(' ')
  } else {
    return error
  }
}

export const ReduxFormTextField = ({input, label, meta: {touched, error}, ...custom}) => {
  if (touched && error) {
    error = errorConcat(error)
  }
  return (
    <TextField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )
}

ReduxFormTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
}

export default ReduxFormTextField
