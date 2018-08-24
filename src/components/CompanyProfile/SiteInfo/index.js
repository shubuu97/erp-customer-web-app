import SiteInfoFields from './SiteInfo';
import { Field,reduxForm, FieldArray } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput, ReactSelectWrapper } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem'
let prop ={};
prop.siteLicenceType = [{ label: 'India', value: 'India' }, { label: 'China', value: 'China' }];


let License = (props) => {
    const { fields, meta: { error } } = props;
    if (fields.length == 0)
        fields.push();
    return (
        <div>

            {fields.map((license, index) => (

                <div>

                    <Field label='License Number' name={`${license}.licenseNumber`} component={TextFieldInput} />




                    {fields.length != 1 && <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button>}
                </div>))}
            <Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button>

        </div>
    )
}

let Address = (props) => {
    const { fields, meta: { error } } = props;
    if (fields.length == 0)
        fields.push();
    return (
        <div>

            {fields.map((address, index) => (

                <div>

                    <Field label='Site Address' name={`${address}.siteAddress`} component={TextFieldInput} />
                    <Field label='Contact Number' name={`${address}.contactNumber`} component={TextFieldInput} />
                    <Field label='Email' name={`${address}.email`} component={TextFieldInput} />
                    <Field label='Zip Code' name={`${address}.zipCode`} component={TextFieldInput} />
                    <Field label='Country' name={`${address}.country`} component={TextFieldInput} />
                    <Field label='State' name={`${address}.state`} component={TextFieldInput} />
                    <Field label='City' name={`${address}.city`} component={TextFieldInput} />
                    




                    {fields.length != 1 && <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button>}
                </div>))}
            <Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button>

        </div>
    )
}

let Site = (props) => {
    const { fields, meta: { error } } = props;
    if (fields.length == 0)
        fields.push();
    return (
        <div>

            {fields.map((site, index) => (

                <div>
<div class="row d-flex">
          
          <div className="form-d col-md-4 col-sm-6 form-input">
          

           <Field name={`${site}.siteName`} component={TextFieldInput} label="Site Name"/>
           <Field name={`${site}.licenseType`} options={prop.siteLicenceType} component={ReactSelectWrapper} placeholder='License Type'/>
           <FieldArray name={`${site}.siteLicense`} component={License} />
           <FieldArray name={`${site}.addressInfo`} component={Address} />

           </div>
    
  </div>
                  
                    




                    {fields.length != 1 && <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button>}
                </div>))}
            <Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button>

        </div>
    )
}

class SiteInfo extends Component {
    render() {
        return (
            <div>
          
                
                 <FieldArray name="siteInfo" component={Site} />

                
          
        </div>
        )
    }
}

export default reduxForm(
    {
        form:'SiteInfo'
    }
)(SiteInfo)
