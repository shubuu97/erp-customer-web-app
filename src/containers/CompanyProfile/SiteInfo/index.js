import SiteInfoComponent from '../../../components/CompanyProfile/SiteInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';
import asyncValidate from './validate.js'
import { postSiteData } from '../../../action/siteInfo';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'
import {showMessage} from '../../../action/common';
import expand from 'keypather/expand';
import flatten from 'keypather/flatten'
import { fetchSiteDetailsData } from '../../../action/getSiteInfo';
import _get from 'lodash/get'
import CircularProgress from '@material-ui/core/CircularProgress'

class SiteInfo extends Component
{

    componentWillMount()
    {


      this.props.dispatch(fetchSiteDetailsData(`${this.props.urlLinks.getSiteInfo.href}?_id=${localStorage.getItem("id")}`));

    }
    updateSubmitHandler=(values)=>
    {
if(!values.siteInfo[0].siteName||values.siteInfo[0].siteName=='')
{
  this.props.handleTabSwitch(3);
  return;
}
    let requestObj={
        ...values,
        businessCustomerId:localStorage.getItem('id')
    }
     this.props.dispatch(postSiteData(requestObj,'',`${this.props.urlLinks.updateOrCreateSiteInfo.href}`)).then((data)=>{
        if(data.data.message) {
          

          this.props.dispatch(showMessage({text: "Successful Operation", isSuccess: true}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
          },2000);
          setTimeout(()=>{
            this.props.handleTabSwitch(3);
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
        const {handleSubmit} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <SiteInfoComponent  {...this.props}/>
                <div className="form-btn-group 2"> 
                <Button disabled={this.props.isSaving} variant="contained" type='submit' color='primary' disabled={this.props.isSaving}>{!this.props.isSaving && 'SAVE AND CONTINUE'}{this.props.isSaving && <CircularProgress size={24} />}</Button>

                </div>
            </form>
            </div>
        )
    }
}

SiteInfo=reduxForm({
    form:'SiteInfo',
    asyncValidate:asyncValidate,
    enableReinitialize:true,
  keepDirtyOnReinitialize:true
})(SiteInfo)

const mapStateToProps=(state)=>
{
    let initialValues = state.siteDetailsData.lookUpData.data;
    let licenseTypes = _get(state,"siteDetailsData.lookUpData.data.licenseTypes.data",[{label:'',value:''}])

    let isLoading = state.siteDetailsData.isFetching;
    let urlLinks = _get(state,'urlLinks.formSearchData._links',{});
    let isSaving =   _get(state,'updateSiteData.isFetching',false)

    if(state.zipCodeData.meta)
  {
   let meta = state.zipCodeData.meta;
   if(meta.form=="SiteInfo" &&state.form&&state.form.SiteInfo &&state.form.SiteInfo.values)
   {
    let fieldValue = meta.field !== 'zipCode' ? meta.field.split('.zipCode')[0] : 'zipCode';
    if(fieldValue != 'zipCode') {

      let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
      let expandObj = {};
      expandObj = flatten(state.form.SiteInfo.values)
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
    return {initialValues,isLoading,urlLinks,licenseTypes,isSaving}

}
      
export default connect(mapStateToProps)((SiteInfo))