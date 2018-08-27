import BankingInfoComponent from '../../../components/CustomerProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import Button from '@material-ui/core/Button';
import asyncValidate from './validate.js';
import {postBankingData} from '../../../action/banking'
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';
import withLoader from '../../../components/LoaderHoc';
import {connect} from 'react-redux';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'
import {showMessage} from '../../../action/common';
class CustomerBankingDetails extends Component
{
    // componentDidMount()
    // {
    
    //     this.props.dispatch(fetchBankingDetailsData(`${}/customer/bankingdetails?_id=5b73115a03a8187d56e12ae6`));
    // }
    bankingDataSaveHandler=(values)=>
    {
  

    let requestObj={
        ...values,
        customerId:"5b7530f8a3b7320018ee14b7"
    }
     this.props.dispatch(postBankingData(requestObj,'',`${APPLICATION_BFF_URL}/customer/bankingdetails`)).then((data)=>{
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
    render()
    {
        const {handleSubmit} = this.props;
        return(
            <div>
                 <form onSubmit={handleSubmit(this.bankingDataSaveHandler)}>
            <BankingInfoComponent/>
            <div className="form-btn-group">
                <Button variant="contained" type='submit' color='primary'>Save</Button> 
                <Button variant="contained"  color='primary' >Submit for approval</Button>
            </div>
            </form>
            </div>
        )
    }
}
CustomerBankingDetails=reduxForm({
    form:'CustomerBankingInfo',
    asyncValidate
    
})(CustomerBankingDetails)

const mapStateToProps=(state)=>
{
    let initialValues = state.bankDetailsData.lookUpData.data
    let isLoading= state.bankDetailsData.isFetching
    return {initialValues,isLoading}

}


export default connect(mapStateToProps)(withLoader(CustomerBankingDetails))


      