
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


class CustomerInfo extends Component

{
    updateSubmitHandler=(values)=>
    {
  

    let requestObj={
        basicInfo:values,
        _id:localStorage.getItem('id')
    }
     this.props.dispatch(patchUpdateBasicInfo(requestObj,'',`${APPLICATION_BFF_URL}/customer/basicinfo`)).then((data)=>{
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
               <Button type='submit' variant="contained" color='primary'   label="Submit">Save </Button>
               </form>
            </div>
        )
    }
}

CustomerInfo = reduxForm({
    form:'CustomerInfo',
    asyncValidate
    
    
})(CustomerInfo)
function mapStateToProps(state)
{
 let initialValues = {};
 initialValues =  state.basicInfodata.basicInfoData
 let isLoading = state.basicInfodata.isFetching
 return {initialValues, isLoading}
}

export default connect(mapStateToProps)(withLoader(CustomerInfo))
