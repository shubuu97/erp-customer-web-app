import ReactSelectWrapper from './reactSelectWrapper';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import SelectField from '@material-ui/core/Select';


const TextFieldInput = (props) =>
   
  { 
    console.log(props,"prop of input")
    
    let  {input,label,meta:{touched,error,pristine},...custom} = props;
    return(
  
    <TextField
      label={label}
      placeholder={label}
      error = {touched&&error?true:false}
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
      SelectFieldInput,
}
  