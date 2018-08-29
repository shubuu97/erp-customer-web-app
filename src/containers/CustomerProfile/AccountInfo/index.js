
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
          this.props.dispatch(showMessage("Successful Operation"));
          setTimeout(()=>{
            this.props.dispatch(showMessage(''));
          },6000);
        }
      }, (err)=>{
        if(err.message) {
          this.props.dispatch(showMessage("Operation Failed"));
          setTimeout(()=>{
            this.props.dispatch(showMessage(''));
          },6000);
        }
      });
  
    }
    // componentDidMount()
    // {
    //     this.props.dispatch(fetchProfileFormData(`${}/customer/register`));

    //     this.props.dispatch(postBasicInfoData({_id: "5b7530f8a3b7320018ee14b7"},'',`${}/customer/basicinfo/search`))
    // }
    render()
    {
        const {handleSubmit} = this.props;
        return(
            
            <div>
                
                <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
               <AccountInfo/>
                <div className="form-btn-group">
                  <Button type='submit' variant="contained" color='primary'   label="Submit">Save </Button>
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
 if(state.zipCodeData.meta)
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
 return {initialValues, isLoading}
}

export default connect(mapStateToProps)(withLoader(CustomerInfo))
