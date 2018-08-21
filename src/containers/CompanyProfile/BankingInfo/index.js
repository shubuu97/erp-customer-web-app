import BankingInfoComponent from '../../../components/CompanyProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import Button from '@material-ui/core/Button';
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

                <div className="form-btn-group">
                    <Button variant="contained" color='primary'>Save</Button>
                    <Button variant="contained" color='primary'>Submit for approval</Button>
                </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form:'CompanyBankingInfo',
    asyncValidate
})(BankingInfo)


      