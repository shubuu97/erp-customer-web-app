import ReactSelectWrapper from './reactSelectWrapper';
import React from 'react';
import TextField from 'material-ui/TextField';


const TextFieldInput = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )


   

  export  {
      TextFieldInput,
      ReactSelectWrapper
}
  