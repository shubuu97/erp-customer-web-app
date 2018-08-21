import BankingInfoComponent from '../../../components/CustomerProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import RaiseButton from 'material-ui/RaisedButton';
import asyncValidate from './validate.js';
import {postBankingData} from '../../../action/banking'
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';


class CustomerBankingDetails extends Component
{
    componentDidMount()
    {
    
        this.props.dispatch(fetchBankingDetailsData(`${process.env.APPLICATION_BFF_URL}/customer/bankingdetails?_id=5b73115a03a8187d56e12ae6`));
    }
    bankingDataSaveHandler=(values)=>
    {
      console.log(this.props,"props fff")
  
    console.log(values,"aa");

    let requestObj={
        bankingDetailInfo:values,
        customerId:"5b7530f8a3b7320018ee14b7"
    }
     this.props.dispatch(postBankingData(requestObj,'',`${process.env.APPLICATION_BFF_URL}/customer/bankingdetails`));
  
    }
    render()
    {
        const {handleSubmit} = this.props;
        return(
            <div>
                 <form onSubmit={handleSubmit(this.bankingDataSaveHandler)}>
            <BankingInfoComponent/>
            <RaiseButton label="Save" type={'submit'} />
            <RaiseButton primary={true}  label="Submit for approval" />
            </form>
            </div>
        )
    }
}

export default reduxForm({
    form:'CustomerBankingInfo',
    asyncValidate
})(CustomerBankingDetails)


      