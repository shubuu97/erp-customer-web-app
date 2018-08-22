//import {addressInfo,basicInfo} from './customerRegisterFields.js';
import { Field } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput,SelectFieldInput } from '../../common/MaterialUiComponents';
import RaiseButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import BasicInfo from '../../common/BasicInfo/BasicInfoFields';
import AddressInfo from '../../common/AddressInfo/adddressInfoFields';
let props ={};
props.country = ['India','China'];
props.state = ['Rajasthan','Karnatak'];
props.city = ['jaipur','banglaore'];

export default class CustomerRegistration extends Component {

    render() {
        return (
            <div>
                <header>Basic Info</header>
                {BasicInfo.map((info) => {
                    return (
                        <Field name={info.name} label={info.label} component={info.component} />)
                }
                )}
                <header>Address Details</header>
             { AddressInfo.map((info)=>
             {
                 
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