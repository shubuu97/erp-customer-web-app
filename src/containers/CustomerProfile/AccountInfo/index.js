
import React, { Component } from 'react';

import {reduxForm,Field} from 'redux-form';

import { fetchBasicInfoData } from '../../../action/basicInfoActions';
import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';
import {connect} from 'react-redux';
import AccountInfo from '../../../components/CustomerProfile/AccountInfo'



class CustomerInfo extends Component

{
    componentDidMount()
    {
        console.log("came")
        this.props.dispatch(fetchBasicInfoData({_id: "5b7530f8a3b7320018ee14b7"},'',`${process.env.APPLICATION_BFF_URL}/customer/basicinfo/search`))
    }
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
    form:'CustomeInfo',
    
})(CustomerInfo)
function mapStateToProps(state)
{
 let initialValues = {};
 initialValues =  state.basicInfodata.basicInfoData

 return {initialValues}
}

export default connect(mapStateToProps)(CustomerInfo)
