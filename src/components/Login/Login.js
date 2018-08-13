import LoginFields from './LoginFields.js';
import {Field} from 'redux-form';
import React,{Component} from 'react';
import {TextFieldInput} from '../common/MaterialUiComponents'

export default class Login extends  Component
{
    render()
    {
        return(
            <div>
                {LoginFields.map((LoginField)=>
                {
                 return (
                 <Field name={LoginField.name} label={LoginField.label} component={TextFieldInput}/>)
                    }
                )}
            </div>
        )
    }
}