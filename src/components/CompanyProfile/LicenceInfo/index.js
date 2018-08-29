import LicenceInfoFields from './LiceneceInfo';
import { Field, reduxForm, FormSection, FieldArray } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput, ReactSelectWrapper } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem'
let props = {};
props.licenseType = [{ label: 'India', value: 'India' }, { label: 'China', value: 'China' }];
props.category = [{ label: 'India', value: 'India' }, { label: 'China', value: 'China' }];
props.country = [{ label: 'India', value: 'India' }, { label: 'China', value: 'India' }];
props.state = [{ label: 'India', value: 'India' }, { label: 'China', value: 'India' }];
props.city = [{ label: 'India', value: 'India' }, { label: 'China', value: 'India' }];


let emailField = (props) => {
    const { fields, meta: { error } } = props;
    if (fields.length == 0)
        fields.push();
    return (
        <div className="row">
        <div className="col-sm-12">
        <div className="form-box2">
        <div className="row d-flex">

            {fields.map((email, index) => (

                <div className="form-d col-md-4 col-sm-6 form-input">

                    <Field label='Email' name={`${email}.email`} component={TextFieldInput} />




                    {fields.length != 1 && <div className="top-btn-gutter"><Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
                </div>))}
                <div className="col-sm-12"><Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button></div>

        </div>
        </div>
        </div>
        </div>
    )
}

let contactField = (props) => {
    const { fields, meta: { error } } = props;
    if (fields.length == 0)
        fields.push();
    return (
        <div className="row">
        <div className="col-sm-12">
        <div className="form-box2">
        <div className="row d-flex">

            {fields.map((contact, index) => (

                <div className="form-d col-md-4 col-sm-6 form-input">

                    <Field name={`${contact}.contact`} label='Contact' component={TextFieldInput} />



                    {fields.length != 1 &&<div className="top-btn-gutter"> <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
                </div>))}
                <div className="col-sm-12"><Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button></div>

        </div>
        </div>
        </div>
        </div>
    )
}


class LicenceInfo extends Component {
   
    render() {
        return (
            <div className="row">


                <div className="col-sm-12">
                    <FormSection name="companyInfo">
                        <div className="row d-flex">
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field options={props['licenseType']} placeholder='License Type' name={'licenseType'} component={ReactSelectWrapper} label={'Licence Type'} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field options={props['category']} placeholder='Category' name={'category'} component={ReactSelectWrapper} label={'Company Category'} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field name={'licenseNumber'} label={'License Number'} component={TextFieldInput} />
                            </div>
                        </div>
                    
                    <FormSection name="companyAddressInfo">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-box">
                                    <div className="row d-flex">
                                        <div className="col-sm-12">
                                            <h2 className="box-title">Address Info</h2>
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'companyAddress'} label={'Company Address'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'zipCode'} label={'Zip Code'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'country'} label={'country'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'state'} label={'state'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'city'} label={'city'} component={TextFieldInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormSection>
                        
                    <FormSection name="organizationInfo">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-box">
                                    <div className="row d-flex">
                                        <div className="col-sm-12">
                                            <h2 className="box-title">Organization Info</h2>
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'name'} label={'Name'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'address'} label={'address'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'zipCode'} label={'Zip Code'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'country'} label={'country'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'state'} label={'state'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'city'} label={'city'} component={TextFieldInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormSection>
            
                    <FieldArray name="contactNumbers" component={contactField} />
                
                    <FieldArray name="emailAddresses" component={emailField} />
                      
                    </FormSection>


                </div>


                {/* <div className="form-d col-md-4 col-sm-6 form-input"> */}
                    {/* <Field name={info.name} label={info.label} component={info.component} /> */}
                {/* </div> */}

            </div>
        )
    }
}

export default LicenceInfo
