import ReactSelectWrapper from './reactSelectWrapper';
import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';


const TextFieldInput = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) =>
  { 
    console.log(touched,error)
    return(
    <TextField
      label={label}
      placeholder={label}
      errorText={touched && error}
     
      {...input}
      {...custom}
    />
  )
}

  const SelectFieldInput = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => (
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  )


   

  export  {
      TextFieldInput,
      ReactSelectWrapper,
      SelectFieldInput
}
  