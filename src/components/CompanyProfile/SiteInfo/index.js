
import { Field, reduxForm, FieldArray } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput, ReactSelectWrapper } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem';
import withLoader from '../../LoaderHoc'

let prop = {};
prop.siteLicenceType = [{ label: 'India', value: 'India' }, { label: 'China', value: 'China' }];


let License = (props) => {
    const { fields, meta: { error } } = props;
    if (fields.length == 0)
        fields.push();
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="form-box2">
                    <div className="row d-flex">

                        {fields.map((license, index) => (

                            <div className="form-d col-md-4 col-sm-6 form-input">

                                <Field label='License Number *' name={`${license}.licenseNumber`} component={TextFieldInput} />


                                {(fields.length == 1 || (fields.get(index) && fields.get(index)._id)) ? null : <div className="top-btn-gutter"> <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}


                            </div>))}
                        <div className="col-sm-12"><Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

let Address = (props) => {
    const { fields, meta: { error } } = props;
    if (fields.length == 0)
        fields.push();
    return (
        <div className="row">
            <div className="col-sm-12">



                {fields.map((address, index) => (
                    <div className="form-box2">
                        <div className="row d-flex">

                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field label='Site Address *' name={`${address}.siteAddress`} component={TextFieldInput} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field label='Contact Number *' name={`${address}.contactNumber`} component={TextFieldInput} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field label='Email *' name={`${address}.email`} component={TextFieldInput} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field label='Zip Code *' name={`${address}.zipCode`} component={TextFieldInput} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field label='Country *' name={`${address}.country`} component={TextFieldInput} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field label='State *' name={`${address}.state`} component={TextFieldInput} />
                            </div>
                            <div className="form-d col-md-4 col-sm-6 form-input">
                                <Field label='City *' name={`${address}.city`} component={TextFieldInput} />
                            </div>


                            {(fields.length == 1 || (fields.get(index) && fields.get(index)._id)) ? null : <div className="col-sm-12"> <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}

                        </div> </div>))}


                <div className="col-sm-12 form-btn-group-left"><Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button></div>

            </div>
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

                <div className="form-box">
                    <div class="row d-flex">

                        <div className="form-d col-md-4 col-sm-6 form-input">
                            <Field name={`${site}.siteName`} component={TextFieldInput} label="Site Name *" />
                        </div>
                        <div className="form-d col-md-4 col-sm-6 form-input">
                            <Field name={`${site}.licenseType`} options={props.licenseTypes} component={ReactSelectWrapper} placeholder='License Type *' />
                        </div>
                        <div className="form-d col-md-4 col-sm-6 form-btn-group">
                            <Button variant="contained" color='primary' onClick={() => fields.push()}>Add new</Button>
                        </div>

                    </div>

                    <FieldArray name={`${site}.siteLicense`} component={License} />
                    <FieldArray name={`${site}.addressInfo`} component={Address} />




                    {(fields.length == 1 || (fields.get(index) && fields.get(index)._id)) ? null : <div className="col-sm-12 form-btn-group-left"> <Button variant="contained" color='secondary' onClick={() => fields.remove(index)}>Remove</Button></div>}


                </div>))}


        </div>
    )
}

class SiteInfo extends Component {
    render() {
        return (
            <div>


                <FieldArray {...this.props} name="siteInfo" component={Site} />



            </div>
        )
    }
}

export default withLoader(SiteInfo)
