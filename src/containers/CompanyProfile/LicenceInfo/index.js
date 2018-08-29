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
import expand from 'keypather/expand';
import flatten from 'keypather/flatten'

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
        if(data.data.message) {
         this.props.handleTabSwitch(3)
          this.props.dispatch(showMessage({text: "Successful Operation", isSuccess: true}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
          },6000);
        }
      }, (err)=>{
        if(err.message) {
          this.props.dispatch(showMessage({text: "Operation Failed", isSuccess: false}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: false}));
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
                <div className="col-sm-12 form-btn-group">
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
    asyncValidate:asyncValidate,
    enableReinitialize:true,
 keepDirtyOnReinitialize:true

})(LicenseInfo)

const mapStateToProps=(state)=>
{
    let initialValues = state.licenseDetailsData.lookUpData.data;
    let isLoading = state.licenseDetailsData.isFetching;
    if(state.zipCodeData.meta)
    {
     let meta = state.zipCodeData.meta;
     if(meta.form=="LicenseInfo"&&state.form&&state.form.LicenseInfo &&state.form.LicenseInfo.values)
     {
      let fieldValue = meta.field !== 'zipCode' ? meta.field.split('.zipCode')[0] : 'zipCode';
      if(fieldValue != 'zipCode') {
  
        let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
        let expandObj = {};
        expandObj = flatten(state.form.LicenseInfo.values)
        expandObj[`${fieldValue}.country`] = country;
        expandObj[`${fieldValue}.state`] = stateobj;
        expandObj[`${fieldValue}.city`] = city;
  
         initialValues = expand(expandObj);
    
    
  
      } else {
        let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
        initialValues.country = country;
        initialValues.state = stateobj;
        initialValues.city = city;
      }
     }
    }
    return {initialValues,isLoading}

}


export default connect(mapStateToProps)(withLoader(LicenseInfo))