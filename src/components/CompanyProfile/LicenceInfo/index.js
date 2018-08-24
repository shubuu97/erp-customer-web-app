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
        <div>

            {fields.map((email, index) => (

                <div>

                    <Field label='Email' name={`${email}.email`} component={TextFieldInput} />




                    {fields.length != 1 && <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button>}
                </div>))}
            <Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button>

        </div>
    )
}

let contactField = (props) => {
    const { fields, meta: { error } } = props;
    if (fields.length == 0)
        fields.push();
    return (
        <div>

            {fields.map((contact, index) => (

                <div>

                    <Field name={`${contact}.contact`} label='Contact' component={TextFieldInput} />



                    {fields.length != 1 && <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button>}
                </div>))}
            <Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button>

        </div>
    )
}


class LicenceInfo extends Component {
    render() {
        return (
            <div className="row d-flex">


                <div className="form-d col-md-4 col-sm-6 form-input">
                    <FormSection name="companyInfo">
                        <Field options={props['licenseType']} placeholder='License Type' name={'licenseType'} component={ReactSelectWrapper} label={'Licence Type'} />
                        <Field options={props['category']} placeholder='Category' name={'category'} component={ReactSelectWrapper} label={'Company Category'} />
                        <Field name={'licenseNumber'} label={'License Number'} component={TextFieldInput} />
                        <h2>Address Info</h2>
                        <FormSection name="companyAddressInfo">
                            <Field name={'companyAddress'} label={'Company Address'} component={TextFieldInput} />
                            <Field name={'zipCode'} label={'Zip Code'} component={TextFieldInput} />
                            <Field name={'country'} label={'country'} component={TextFieldInput} />
                            <Field name={'state'} label={'state'} component={TextFieldInput} />
                            <Field name={'city'} label={'city'} component={TextFieldInput} />
                        </FormSection>
                        <h2>Organization Info</h2>
                        <FormSection name="organizationInfo">
                            <Field name={'name'} label={'Name'} component={TextFieldInput} />
                            <Field name={'address'} label={'address'} component={TextFieldInput} />
                            <Field name={'zipCode'} label={'Zip Code'} component={TextFieldInput} />
                            <Field name={'country'} label={'country'} component={TextFieldInput} />
                            <Field name={'state'} label={'state'} component={TextFieldInput} />
                            <Field name={'city'} label={'city'} component={TextFieldInput} />
                        </FormSection>
                        <FieldArray name="contactNumbers" component={contactField} />
                        <FieldArray name="emailAddresses" component={emailField} />
                    </FormSection>


                </div>


                <div className="form-d col-md-4 col-sm-6 form-input">
                    {/* <Field name={info.name} label={info.label} component={info.component} /> */}
                </div>

            </div>
        )
    }
}

export default LicenceInfo
