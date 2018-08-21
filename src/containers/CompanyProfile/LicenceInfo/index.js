import LicenseInfoComponent from '../../../components/CompanyProfile/LicenceInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import asyncValidate from './validate.js'
import RaiseButton from 'material-ui/RaisedButton';
import { postLicenseData } from '../../../action/licenseInfo';


class LicenseInfo extends Component
{
    updateSubmitHandler=(values)=>
    {
      console.log(this.props,"props fff")
  
    console.log(values,"aa");

    let requestObj={
        companyInfo:values,
        businessCustomerId:"5b7514dfab851a001b83452a"
    }
     this.props.dispatch(postLicenseData(requestObj,'',`${process.env.APPLICATION_BFF_URL}/businesscustomer/companyinfo`));
  
    }
    render()
    {
        const {handleSubmit} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <LicenseInfoComponent/>
            <RaiseButton type={'submit'} primary={true} label="Save"/>
            </form>
            </div>
        )
    }
}

export default reduxForm({
    form:'LicenseInfo',
    asyncValidate

})(LicenseInfo)


      