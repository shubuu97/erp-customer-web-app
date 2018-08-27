import LicenseInfoComponent from '../../../components/CompanyProfile/LicenceInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import asyncValidate from './validate.js'
import { postLicenseData } from '../../../action/licenseInfo';
import {fetchLicenseDetailsData} from '../../../action/getLicenseInfo';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import withLoader from '../../../components/LoaderHoc'
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'



class LicenseInfo extends Component
{
    // componentDidMount()
    // {
    
    //     this.props.dispatch(fetchLicenseDetailsData(`${}/businesscustomer/companyinfo?_`));
    // }
    updateSubmitHandler=(values)=>
    {
  

    let requestObj={
        ...values,
        businessCustomerId:localStorage.getItem('id')
    }
     this.props.dispatch(postLicenseData(requestObj,'',`${APPLICATION_BFF_URL}/businesscustomer/companyinfo`));
  
    }
    render()
    {
        const {handleSubmit} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <LicenseInfoComponent/>
            <div className="row d-flex">
                <div className="col-sm-12">
                    <Button variant="contained" type='submit' color='primary'>Save</Button>
                </div>
            </div>
            </form>
            </div>
        )
    }
}

LicenseInfo = reduxForm({
    form:'LicenseInfo',
    asyncValidate

    

})(LicenseInfo)

const mapStateToProps=(state)=>
{
    let initialValues = state.licenseDetailsData.lookUpData.data
    let isLoading = state.licenseDetailsData.isFetching
    return {initialValues,isLoading}

}


export default connect(mapStateToProps)(withLoader(LicenseInfo))