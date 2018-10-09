import ReactSelectWrapper from './reactSelectWrapper';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import SelectField from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FileUpload from './fileUpload';
import CheckBox from '@material-ui/core/Checkbox'

const TextFieldInput = (props, autoFocus) =>
   
  { 
    
    let  {input,label,meta:{touched,error,pristine},...custom} = props;
    console.log(input,"error is here")
    return(
    [<TextField
      label={label}
      placeholder={label}
      error = {touched&&error?true:false}
      autoFocus={autoFocus}
      {...input}
      {...custom}
    />,
    <div>{touched && error && <div className="text-input error"><FormHelperText >
				{error}
			</FormHelperText>
      </div>}
      </div>]
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

  const CheckBoxInput = ({ input,label }) => (
    [
    <InputLabel htmlFor={label}>{label}</InputLabel>,
    <CheckBox
      id={label}
      checked={input.value ? true : false}
      onChange={input.onChange}
    />
    ]
  )


   

  export  {
      TextFieldInput,
      ReactSelectWrapper,
      SelectFieldInput,
      FileUpload,
      CheckBoxInput
}
  