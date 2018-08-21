import LicenseInfoComponent from '../../../components/CompanyProfile/LicenceInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import asyncValidate from './validate.js'
import { postLicenseData } from '../../../action/licenseInfo';
import Button from '@material-ui/core/Button';





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
            <Button variant="contained" color='primary'>Save</Button>
            </form>
            </div>
        )
    }
}

export default reduxForm({
    form:'LicenseInfo',
    asyncValidate

})(LicenseInfo)


      