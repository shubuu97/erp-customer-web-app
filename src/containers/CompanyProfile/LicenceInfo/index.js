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
import {showMessage} from '../../../action/common';


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
     this.props.dispatch(postLicenseData(requestObj,'',`${APPLICATION_BFF_URL}/businesscustomer/companyinfo`)).then((data)=>{
        console.log("Data for company register", data);
        if(data.message) {
          this.props.dispatch(showMessage(data.message));
          setTimeout(()=>{
            this.props.dispatch(showMessage(''));
          },6000);
        }
      }, (err)=>{
        console.log("Error in company register", err);
        if(err.message) {
          this.props.dispatch(showMessage(err.message));
          setTimeout(()=>{
            this.props.dispatch(showMessage(''));
          },6000);
        }
      });
  
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