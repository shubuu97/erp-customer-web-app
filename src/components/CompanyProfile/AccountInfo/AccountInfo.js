import { Field } from 'redux-form';
import React, { Component } from 'react';
import { TextFieldInput } from '../../common/MaterialUiComponents';
import Button from '@material-ui/core/Button';
import withLoader from '../../../components/LoaderHoc'

class AccountInfo extends Component {
    render() {
        return (
            <div>
                        <div className="row">
                            <div className="col-sm-12 form-d form-input">
                                <Field name='companyName'   label='Company Name' component={TextFieldInput} />
                            </div>
                        </div>
                        <div className="row m-8">
                            <div className="form-d form-input p-8 col-sm-4">
                                <Field name='firstName' label={'First Name'} component={TextFieldInput} />
                            </div>
                            <div className="form-d form-input p-8 col-sm-4">
                                <Field name='middleName' label={'Middle Name'} component={TextFieldInput} />
                            </div>
                            <div className="form-d form-input p-8 col-sm-4">
                                <Field name='lastName' label='Last Name' component={TextFieldInput} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 form-d form-input">
                                <Field props={{disabled:true}} name='email' label='Email' component={TextFieldInput} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 form-d form-input">
                                <Field name='designation' label='Designation' component={TextFieldInput} />
                            </div>
                        </div>
                
                
            </div>
        )
    }
}

export default withLoader(AccountInfo)