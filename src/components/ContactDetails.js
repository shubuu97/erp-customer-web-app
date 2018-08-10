import React from 'react';
import {Field} from 'redux-form'
import {TextFieldInput} from './common/MaterialUiComponents.js';


export default (props)=>
{
return(
    <div>
        <Field label="Title" name="Title" component={TextFieldInput}/>
        <Field label="Name" name="Name" component = {TextFieldInput}/>
        <Field  label="Email" name="Email" component={TextFieldInput}/>
        <Field  label="Job Title" name="Job_Title" component={TextFieldInput}/>
        <Field  label="Phone Number" name="Phone_Number" component={TextFieldInput}/>
      
    </div>
)

}