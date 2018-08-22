import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';

import React, { Component } from 'react';

import { reduxForm, Field, FieldArray } from 'redux-form';

import AddressInfoFields from '../../common/AddressInfo/adddressInfoFields';
import BasicInfoFields from '../../common/BasicInfo/BasicInfoFields';
import AccountInfo from './accountInfoFields';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


let prop = {};
prop.country = ['India', 'China'];
prop.state = ['Rajasthan', 'Karnatak'];
prop.city = ['jaipur', 'banglaore'];


const AddressInfo = (props) => {
    const { fields, meta: { error } } = props;
    if(fields.length==0)
    fields.push();
    return (
        <div>
            
            {fields.map((Address, index) => (
            
                <div>
             
                {AddressInfoFields.map((info) => {

                    if (info.type == 'select') {

                        return (

                            <Field name={`${Address}.${info.name}`} component={info.component} label={info.label}>
                                {prop[info.name].map((name) => {
                                    return (<MenuItem value={name} primaryText={name} />)
                                })}
                            </Field>

                        )
                    }
                    return (<Field name={`${Address}.${info.name}`} label={info.label} component={info.component} />)
                })


                }
              {fields.length!=1&&<RaisedButton label="Remove" primary={true} onClick={() => fields.remove(index)} />}
                </div>))}
                <RaisedButton label="Add New" primary={true} onClick={() => fields.push()} />
        </div>
    )
}
export default (props) => {

    return (
        <div>
            <header>Basic Info</header>
            {BasicInfoFields.map((info) => {
                return (
                    <Field name={info.name} label={info.label} component={info.component} />)
            }
            )}
            {AccountInfo.map((info) => {
                return (
                    <Field name={info.name} label={info.label} component={info.component} />)
            })

            }
            <header>Address Details</header>
            <FieldArray name="addressInfo" component={AddressInfo} />
            
        </div>
    )
}


