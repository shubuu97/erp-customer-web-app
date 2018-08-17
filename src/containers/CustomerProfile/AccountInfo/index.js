
import React, { Component } from 'react';

import {reduxForm,Field} from 'redux-form';

import { fetchBasicInfoData } from '../../../action/basicInfoActions';
import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';
import {connect} from 'react-redux';
import AccountInfo from '../../../components/CustomerProfile/AccountInfo'
import {fetchProfileFormData} from '../../../action/profileFormData';
import asyncValidate from './validate.js'




class CustomerInfo extends Component

{
    componentDidMount()
    {
        console.log("came");
        this.props.dispatch(fetchProfileFormData(`${process.env.APPLICATION_BFF_URL}/customer/register`));

        this.props.dispatch(fetchBasicInfoData({_id: "5b7530f8a3b7320018ee14b7"},'',`${process.env.APPLICATION_BFF_URL}/customer/basicinfo/search`))
    }
    render()
    {
        console.log(this.props,'yyyy')
        return(
            <div>
               <AccountInfo/>
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

 return {initialValues}
}

export default connect(mapStateToProps)(CustomerInfo)
