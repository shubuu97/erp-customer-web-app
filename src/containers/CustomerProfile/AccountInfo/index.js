
import React, { Component } from 'react';

import {reduxForm,Field} from 'redux-form';

import { fetchBasicInfoData } from '../../../action/basicInfoActions';
import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';
import {connect} from 'react-redux';
import AccountInfo from '../../../components/CustomerProfile/AccountInfo'
import {fetchProfileFormData} from '../../../action/profileFormData';
import asyncValidate from './validate.js'
import {patchUpdateBasicInfo} from '../../../action/updateBasicInfo'
import Button  from '@material-ui/core/Button';




class CustomerInfo extends Component

{
    updateSubmitHandler=(values)=>
    {
      console.log(this.props,"props fff")
  
    console.log(values,"aa");

    let requestObj={
        basicInfo:values,
        _id:"5b7530f8a3b7320018ee14b7"
    }
     this.props.dispatch(patchUpdateBasicInfo(requestObj,'',`${process.env.APPLICATION_BFF_URL}/customer/basicinfo`));
  
    }
    componentDidMount()
    {
        console.log("came");
        this.props.dispatch(fetchProfileFormData(`${process.env.APPLICATION_BFF_URL}/customer/register`));

        this.props.dispatch(fetchBasicInfoData({_id: "5b7530f8a3b7320018ee14b7"},'',`${process.env.APPLICATION_BFF_URL}/customer/basicinfo/search`))
    }
    render()
    {
        const {handleSubmit} = this.props;
        console.log(this.props,'yyyy')
        return(
            <div>
                <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
               <AccountInfo/>
               <Button type={'submit'} primary={true} label="Submit"/>
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

 return {initialValues}
}

export default connect(mapStateToProps)(CustomerInfo)
