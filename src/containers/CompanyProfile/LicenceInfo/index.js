import LicenseInfoComponent from '../../../components/CompanyProfile/LicenceInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import asyncValidate from './validate.js'
import { postLicenseData } from '../../../action/licenseInfo';
import {fetchLicenseDetailsData} from '../../../action/getLicenseInfo';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

import {showMessage} from '../../../action/common';
import expand from 'keypather/expand';
import flatten from 'keypather/flatten';
import _get from 'lodash/get';
import CircularProgress from '@material-ui/core/CircularProgress';
import {receiveZip} from '../../../action/fetchFromZip';
import {filter} from 'lodash';



class LicenseInfo extends Component
{
  componentWillMount()
    {
        this.props.dispatch(fetchLicenseDetailsData(`${this.props.urlLinks.getCompanyInfo.href}?_id=${localStorage.getItem("id")}`));

    }
    updateSubmitHandler=(values)=>
    {
    let requestObj={
        ...values,
        businessCustomerId:localStorage.getItem('id')
    };
    requestObj.companyInfo.licenseCountry = this.props.licenseCountry;
    requestObj.companyInfo.licenseState = this.props.licenseState;
    let organizationInfo = _get(requestObj,'companyInfo.organizationInfo',null);
   if(organizationInfo)
    {
    let allnullCount = 0;
     Object.keys(organizationInfo).forEach((key,index)=>
    {
    if(organizationInfo[key]==''||organizationInfo[key]==undefined)
    {
      allnullCount++;
    }
    })
    if (allnullCount==Object.keys(organizationInfo).length)
    {
      delete requestObj.companyInfo.organizationInfo
    }
    }
     this.props.dispatch(postLicenseData(requestObj,'',`${this.props.urlLinks.updateOrCreateCompanyInfo.href}`)).then((data)=>{
        if(data.data.message) {
          this.props.dispatch(showMessage({text: "Successfully Saved", isSuccess: true}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
          },2000);
          setTimeout(()=>{
            this.props.handleTabSwitch(2);
          },2000);

        }
      }, (err)=>{
        if(err.message) {
          this.props.dispatch(showMessage({text: err.message, isSuccess: false}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: false}));
          },6000);
        }
      });
  
    }
    componentWillUnmount()
    {
     this.props.dispatch(receiveZip(null,null,null,null))
    }
    render()
    {
        console.log("this is props",this.props)
        const {handleSubmit} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <LicenseInfoComponent {...this.props} licenseDetailsData = {this.props.licenseDetailsData}/>
            <div className="row d-flex">
                <div className="col-sm-12 form-btn-group">
                <Button disabled={this.props.isSaving} variant="contained" type='submit' color='primary' disabled={this.props.isSaving}>{!this.props.isSaving && 'SAVE AND CONTINUE'}{this.props.isSaving && <CircularProgress size={24} />}</Button>

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
    console.log(state,"state is here")
    let licenseTypes = [];
    let licenseCountry = _get(state,"licenseDetailsData.lookUpData.data.companyInfo.licenseCountry", '');
    let licenseState = _get(state,"licenseDetailsData.lookUpData.data.companyInfo.licenseState", '');
    let licenseZipcode = _get(state,"licenseDetailsData.lookUpData.data.companyInfo.licenseZipcode", '');
    
    let initialValues = state.licenseDetailsData.lookUpData.data;
     let companyCategories = _get(state,"licenseDetailsData.lookUpData.data.companyCategories.data",[{label:'',value:''}])
     let licenseTypesFullList = _get(state,"licenseDetailsData.lookUpData.data.licenseTypes.data",[{label:'',value:''}])
    console.log("licenseTypes Complete",licenseTypesFullList);
    let isLoading = state.licenseDetailsData.isFetching;
    let licenseDetailsData =  state.licenseDetailsData.lookUpData.data;
    let isSaving =   _get(state,'updateLicenseData.isFetching',false)
    if(licenseState) {
      licenseTypes = filter(licenseTypesFullList, license => license.state == licenseState);
    }
    if(state.zipCodeData.meta)
    {
      console.log(state.zipCodeData.meta,"meta is here")
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
    if(state.licenseZipCodeData.meta)
    {
     
     let meta = state.licenseZipCodeData.meta;
     if(meta.form=="LicenseInfo"&&state.form&&state.form.LicenseInfo &&state.form.LicenseInfo.values)
     {
      let fieldValue = meta.field !== 'licenseZipCode' ? meta.field.split('.licenseZipCode')[0] : 'licenseZipCode';
      if(fieldValue != 'licenseZipCode') {
  
        let {country,state:stateobj,city, zipCode}  = state.licenseZipCodeData.lookUpData;
        licenseCountry = country;
        licenseState = stateobj;
        licenseZipcode = zipCode;
         licenseTypes = filter(licenseTypesFullList, license => license.state == stateobj);
          
  
      } 
     }
    }
    let urlLinks = _get(state,'urlLinks.formSearchData._links',{});
    return {initialValues,isLoading,urlLinks,companyCategories,licenseTypes,isSaving, licenseCountry, licenseState, licenseZipcode}

}


export default connect(mapStateToProps)((LicenseInfo))