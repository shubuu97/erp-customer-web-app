
import React, { Component } from 'react';

import {reduxForm,Field} from 'redux-form';

import { postBasicInfoData } from '../../../action/basicInfoActions';
import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';
import {connect} from 'react-redux';
import AccountInfo from '../../../components/CustomerProfile/AccountInfo'
import {fetchProfileFormData} from '../../../action/profileFormData';
import asyncValidate from './validate.js'
import {patchUpdateBasicInfo} from '../../../action/updateBasicInfo'
import Button  from '@material-ui/core/Button';
import withLoader from '../../../components/LoaderHoc';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'
import {showMessage} from '../../../action/common';
import expand from 'keypather/expand';
import flatten from 'keypather/flatten'
import _get from 'lodash/get'

class CustomerInfo extends Component

{
    updateSubmitHandler=(values)=>
    {
  

    let requestObj={
        basicInfo:values,
        _id:localStorage.getItem('id')
    }
    
     this.props.dispatch(patchUpdateBasicInfo(requestObj,'',`${APPLICATION_BFF_URL}/customer/basicinfo`)).then((data)=>{
        if(data.data.message) {
          setTimeout(()=>{
            this.props.handleTabSwitch(1);
          },2000);

          this.props.dispatch(showMessage({text: "Successfully Saved", isSuccess: true}));
          
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
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
    componentWillMount()
    {
      this.props.dispatch(postBasicInfoData({  email: localStorage.getItem('email')  }, '', `${APPLICATION_BFF_URL}/user/logindata`))

    }
   
    render()
    {
        const {handleSubmit} = this.props;
        return(
            
            <div>
                
                <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
               <AccountInfo {...this.props}/>
                <div className="form-btn-group">
                  <Button type='submit' variant="contained" color='primary'   label="Submit">Save and continue</Button>
                </div>
               </form>
            </div>
        )
    }
}

CustomerInfo = reduxForm({
    form:'CustomerInfo',
    asyncValidate,
  enableReinitialize:true,
  keepDirtyOnReinitialize:true
    
})(CustomerInfo)
function mapStateToProps(state)
{
  let initialValues = {};
  initialValues =  state.basicInfodata.basicInfoData
  let isLoading = state.basicInfodata.isFetching;
  let urlLinks = _get(state,'urlLinks.formSearchData._links',{})
 if(state.zipCodeData &&state.zipCodeData.meta)
  {
   let meta = state.zipCodeData.meta;
   if(meta.form=="CustomerInfo" &&state.form&&state.form.CustomerInfo &&state.form.CustomerInfo.values)
   {
    let fieldValue = meta.field !== 'zipCode' ? meta.field.split('.zipCode')[0] : 'zipCode';
    if(fieldValue != 'zipCode') {

      let {country,state:stateobj,city}  = state.zipCodeData.lookUpData;
      let expandObj = {};
      expandObj = flatten(state.form.CustomerInfo.values)
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
 return {initialValues, isLoading,urlLinks}
}

export default connect(mapStateToProps)(CustomerInfo)
