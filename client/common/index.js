import TextField from 'material-ui/TextField'
import React from 'react'

export const RFTextField = ({input, label, meta: {touched, error}, ...custom}) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

RFTextField.propTypes = {
  input: React.PropTypes.node,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
}
