import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';

import React, { Component } from 'react';

import { reduxForm, Field, FieldArray } from 'redux-form';

import AddressInfoFields from '../../common/AddressInfo/adddressInfoFields';
import BasicInfoFields from '../../common/BasicInfo/BasicInfoFields';
import accountInfoFields from './accountInfoFields'
import AccountInfo from './accountInfoFields';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

let prop = {};
prop.country = [{label:'India',value:'India'},{label:'China',value:'India'}];
prop.state = [{label:'India',value:'India'},{label:'China',value:'India'}];
prop.city = [{label:'India',value:'India'},{label:'China',value:'India'}];

const AddressInfo = (props) => {
    const { fields, meta: { error } } = props;
    if(fields.length==0)
    fields.push();
    return (
        <div className="col-sm-12">
            
            {fields.map((Address, index) => (
            
                <div className="row d-flex">
                {AddressInfoFields.map((info) => {

                    if (info.type == 'select') {

                        return (
                            <div className="col-md-4 col-sm-6 form-d form-input">
                            <Field name={`${Address}.${info.name}`} options={prop[info.name]} component={info.component} label={info.label}></Field>
                            </div>
                        )
                    }
                    return (
                    <div className="col-md-4 col-sm-6 form-d form-input">
                        <Field name={`${Address}.${info.name}`} label={info.label} component={info.component} />
                    </div>
                    )
                })


                }
              {fields.length!=1&&<div className="col-md-4 col-sm-6"><Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
                </div>))}
                <div className="form-btn-group">
                    <Button onClick={() => fields.push()} variant="contained" color='primary'>Add New</Button>
                </div>
        </div>
    )
}
export default (props) => {

    return (
        <div className="row d-flex">
            <header className="box-heading2 col-sm-12">Basic Info</header>
            {BasicInfoFields.map((info) => {
                return (
                    <div className="col-md-4 col-sm-6 form-d form-input" >
                        <Field name={info.name} label={info.label} component={info.component} />
                    </div>
                    )
            }
            )}
            {accountInfoFields.map((info) => {
                return (
                    <div className="col-md-4 col-sm-6 form-d form-input" >
                        <Field name={info.name} label={info.label} component={info.component} />
                    </div>
                    )
            }
            )}
            
            <header className="box-heading2 col-sm-12">Address Details</header>
            
                <FieldArray name="addressInfo" component={AddressInfo} />
            
        </div>
    )
}


