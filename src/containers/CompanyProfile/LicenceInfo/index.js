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
import { LinearProgress } from 'material-ui';
import _get from 'lodash/get';
import CircularProgress from '@material-ui/core/CircularProgress'



class LicenseInfo extends Component
{
    componentDidMount()
    {
        this.props.dispatch(fetchLicenseDetailsData(`${this.props.urlLinks.getCompanyInfo.href}?_id=${localStorage.getItem("id")}`));

    }
    updateSubmitHandler=(values)=>
    {
  

    let requestObj={
        ...values,
        businessCustomerId:localStorage.getItem('id')
    }
     this.props.dispatch(postLicenseData(requestObj,'',`${this.props.urlLinks.updateOrCreateCompanyInfo.href}`)).then((data)=>{
        if(data.data.message) {
          this.props.dispatch(showMessage({text: "Successful Operation", isSuccess: true}));
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
    let initialValues = state.licenseDetailsData.lookUpData.data;
     let companyCategories = _get(state,"licenseDetailsData.lookUpData.data.companyCategories.data",[{label:'',value:''}])
     let licenseTypes = _get(state,"licenseDetailsData.lookUpData.data.licenseTypes.data",[{label:'',value:''}])

    let isLoading = state.licenseDetailsData.isFetching;
    let licenseDetailsData =  state.licenseDetailsData.lookUpData.data;
    let isSaving =   _get(state,'updateLicenseData.isFetching',false)

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
    let urlLinks = _get(state,'urlLinks.formSearchData._links',{})
    return {initialValues,isLoading,urlLinks,companyCategories,licenseTypes,isSaving}

}


export default connect(mapStateToProps)((LicenseInfo))