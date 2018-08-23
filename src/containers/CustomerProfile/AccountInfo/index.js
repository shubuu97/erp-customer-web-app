
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
import withLoader from '../../../components/LoaderHoc'


class CustomerInfo extends Component

{
  
    // componentDidMount()
    // {
    //     console.log("came");
    //     this.props.dispatch(fetchProfileFormData(`${process.env.APPLICATION_BFF_URL}/customer/register`));

    //     this.props.dispatch(postBasicInfoData({_id: "5b7530f8a3b7320018ee14b7"},'',`${process.env.APPLICATION_BFF_URL}/customer/basicinfo/search`))
    // }
    render()
    {
        return(
            
            <div>
                <form>
               <AccountInfo/>
               <Button type={'submit'} primary={true} label="Submit"/>
               </form>
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

export default connect(mapStateToProps)((CustomerInfo))
