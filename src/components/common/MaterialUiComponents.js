import ReactSelectWrapper from './reactSelectWrapper';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import SelectField from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';


const TextFieldInput = (props) =>
   
  { 
    
    let  {input,label,meta:{touched,error,pristine},...custom} = props;
    return(
    [<TextField
      label={label}
      placeholder={label}
      error = {touched&&error?true:false}
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


   

  export  {
      TextFieldInput,
      ReactSelectWrapper,
      SelectFieldInput,
}
  