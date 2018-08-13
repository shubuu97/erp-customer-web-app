import {addressInfo,basicInfo} from './customerRegisterFields.js';
import { Field } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput,SelectFieldInput } from '../../common/MaterialUiComponents';
import RaiseButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
let props ={};
props.country = ['India','China'];
props.state = ['Rajasthan','Karnatak'];
props.city = ['jaipur','banglaore'];

export default class CustomerRegistration extends Component {
    render() {
        return (
            <div>
                <header>Basic Info</header>
                {basicInfo.map((info) => {
                    return (
                        <Field name={info.name} label={info.label} component={info.component} />)
                }
                )}
                <header>Address Details</header>
             { addressInfo.map((info)=>
             {
                 console.log(info.name)
                 
                 if(info.type=='select')
                 {
                
                 return (
                    
                     <Field name={info.name} component={info.component} label={info.label}>
                     {props[info.name].map((name)=>
                    {
                       return (<MenuItem value={name} primaryText={name} />)
                    })}
                     </Field>

                 )
                }
                return (<Field name={info.name} label={info.label} component={info.component} />)
             })
             }
            </div>
        )
    }
}