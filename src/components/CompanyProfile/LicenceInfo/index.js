
import { Field, reduxForm, FormSection, FieldArray } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput, ReactSelectWrapper } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem';
import withLoader from '../../LoaderHoc'
import {filter} from 'lodash'

let props = {};
props.licenseTypes = [{ label: 'Type1', value: 'Type1',stateCode:'RAJ' }, { label: 'Type2', value: 'Type2', stateCode:'RAJ' },{ label: 'Type3', value: 'Type3', stateCode:'MH' },{ label: 'Type4', value: 'Type4', stateCode:'MH' }];
props.category = [{ label: 'Retailer', value: 'Retailer' }, { label: 'Distributer', value: 'Distributer' }];
props.country = [{ label: 'India', value: 'India' }, { label: 'China', value: 'India' }];
props.licenseState = [{ label: 'Rajasthan', value: 'RAJ' }, { label: 'Maharashtra', value: 'MH' }];
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

                    <Field label='Email *' name={`${email}.email`} component={TextFieldInput} />




                   {(fields.length == 1||(fields.get(index)&&fields.get(index)._id)) ?null:<div className="top-btn-gutter"> <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
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

    console.log(fields,"fields is here")
    if (fields.length == 0)
        fields.push();
    return (
        <div className="row">
        <div className="col-sm-12">
        <div className="form-box2">
        <div className="row d-flex">

            {fields.map((contact, index) => (

                <div className="form-d col-md-4 col-sm-6 form-input">

                    <Field name={`${contact}.contact`} label='Contact *' component={TextFieldInput} />
                    {console.log(fields.get(index),"index is here")}
                    {(fields.length == 1||(fields.get(index)&&fields.get(index)._id)) ?null:<div className="top-btn-gutter"> <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}
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
            <div className="form-box">
            <div className="row">
<div className="form-d col-md-4 form-input">
                    <Field props={{disabled:true}} name={'companyName'}  label={'Company Name'} component={TextFieldInput} />
                </div>
                     <FormSection name="companyInfo">
                <div className="col-sm-12">
                <div className="row">
                

                   
                    <div className="col-md-8 form-d">
                        
                            <div className="row d-flex">  
                               
                                <div className="form-d col-md-4 col-sm-6 form-input">
                                    <Field name={'licenseZipcode'} label={'License Zip Code *'} component={TextFieldInput}  />
                                </div>    
                                <div className="form-d col-md-4 col-sm-6 form-input">
                                    <label className="control-label small">License Country</label>
                                    <span>{this.props.licenseCountry}</span>
                                </div>   
                                <div className="form-d col-md-4 col-sm-6 form-input">
                                    <label className="control-label small">License State</label>
                                    <span>{this.props.licenseState}</span>
                                </div>              
                                <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                                    <Field options={this.props.licenseTypes} placeholder='License Type *' name={'licenseType'} component={ReactSelectWrapper} label={'Licence Type *'} />
                                </div>
                                <div className="form-d col-md-4 col-sm-6 form-input form-select-label">
                                    <Field options={this.props.companyCategories} placeholder='Company Category *' name={'category'} component={ReactSelectWrapper} label={'Company Category *'} />
                                </div>
                                <div className="form-d col-md-4 col-sm-6 form-input">
                                    <Field name={'licenseNumber'} label={'License Number *'} component={TextFieldInput} />
                                </div>
                            </div>
                        
                    </div>
                        
                  
                    </div>
                    <FormSection name="companyAddressInfo">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-box2">
                                    <div className="row d-flex">
                                        <div className="col-sm-12">
                                            <h2 className="box-title">Address Info</h2>
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'companyAddress'} label={'Company Address *'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'zipCode'} label={'Zip Code *'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'country'} label={'Country *'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'state'} label={'State *'} component={TextFieldInput} />
                                        </div>
                                        <div className="form-d col-md-4 col-sm-6 form-input">
                                            <Field name={'city'} label={'City *'} component={TextFieldInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormSection>
                        
                    <FormSection name="organizationInfo">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-box2">
                                    <div className="row d-flex">
                                        <div className="col-sm-12">
                                            <h2 className="box-title">Parent Organization Info</h2>
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
                     
                    


                </div>


                {/* <div className="form-d col-md-4 col-sm-6 form-input"> */}
                    {/* <Field name={info.name} label={info.label} component={info.component} /> */}
                {/* </div> */}
                </FormSection>

            </div>
            </div>
        )
    }
}

export default withLoader(LicenceInfo)
