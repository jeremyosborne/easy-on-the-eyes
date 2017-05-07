import muiTextField from 'material-ui/TextField'
import React from 'react'

export const TextField = ({input, label, meta: {touched, error}, ...custom}) => (
  <muiTextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

TextField.propTypes = {
  input: React.PropTypes.node,
  label: React.PropTypes.string,
  meta: React.PropTypes.object,
}

export default TextField
