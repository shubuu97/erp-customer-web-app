import SiteInfoComponent from '../../../components/CompanyProfile/SiteInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';
import asyncValidate from './validate.js'
import { postSiteData } from '../../../action/siteInfo';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import withLoader from '../../../components/LoaderHoc'
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'
import {showMessage} from '../../../action/common';
import expand from 'keypather/expand';
import flatten from 'keypather/flatten'
import { fetchSiteDetailsData } from '../../../action/getSiteInfo';

class SiteInfo extends Component
{

    // componentDidMount()
    // {
    
    //     this.props.dispatch(fetchSiteDetailsData(`${}/businesscustomer/siteinfo?_`));
    // }
    updateSubmitHandler=(values)=>
    {
  

    let requestObj={
        ...values,
        businessCustomerId:localStorage.getItem('id')
    }
     this.props.dispatch(postSiteData(requestObj,'',`${APPLICATION_BFF_URL}/businesscustomer/siteinfo`)).then((data)=>{
        if(data.data.message) {
            this.props.handleTabSwitch(4);
            this.props.dispatch(fetchSiteDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/siteinfo?_id=${localStorage.getItem("id")}`));

          this.props.dispatch(showMessage({text: "Successful Operation", isSuccess: true}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
          },6000);
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
            <SiteInfoComponent/>
                <div className="form-btn-group 2"> 
                    <Button variant="contained" type='submit' color='primary'>Save</Button>
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
    let isLoading = state.siteDetailsData.isFetching;
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
    return {initialValues,isLoading}

}
      
export default connect(mapStateToProps)(withLoader(SiteInfo))