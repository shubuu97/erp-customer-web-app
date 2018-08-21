import BankingInfoComponent from '../../../components/CompanyProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import RaiseButton from 'material-ui/RaisedButton';
import asyncValidate from './validate.js'

import {postBankingData} from '../../../action/banking'
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';


class BankingInfo extends Component
{

    componentDidMount()
    {
    
        this.props.dispatch(fetchBankingDetailsData(`${process.env.APPLICATION_BFF_URL}/businesscustomer/bankingdetails?_id=5b6ead2a97942e5397f61cbe`));
    }
    bankingDataSaveHandler=(values)=>
    {
      console.log(this.props,"props fff")
  
    console.log(values,"aa");

    let requestObj={
        bankingDetailInfo:values,
        businessCustomerId : "5b76c2ad58c25b0011629189"
    }
     this.props.dispatch(postBankingData(requestObj,'',`${process.env.APPLICATION_BFF_URL}/businesscustomer/bankingdetails`));
  
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
    form:'CompanyBankingInfo',
    asyncValidate
})(BankingInfo)


      