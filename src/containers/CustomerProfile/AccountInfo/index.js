
import React, { Component } from 'react';

import {reduxForm,Field} from 'redux-form';

import { fetchBasicInfoData } from '../../../action/basicInfoActions';
import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';
import {connect} from 'react-redux';
import AccountInfo from '../../../components/CustomerProfile/AccountInfo'
import {fetchProfileFormData} from '../../../action/profileFormData'
import withLoader from '../../../components/LoaderHoc'
import { stat } from 'fs';


class CustomerInfo extends Component

{
  
    render()
    {
        return(
            <div>
               <AccountInfo/>
            </div>
        )
    }
}

CustomerInfo = reduxForm({
    form:'CustomerInfo'
    
})(CustomerInfo)
function mapStateToProps(state)
{
console.log(state,"state of the art")
 let initialValues = {};
 initialValues =  state.basicInfodata.basicInfoData
 let isLoading = state.basicInfodata.isFetching
 return {initialValues, isLoading}
}

export default connect(mapStateToProps)(withLoader(CustomerInfo))
