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
import {getApprovalStatus} from '../../../action/submitForApproval';
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
        customerId:localStorage.getItem('id')
    }
     this.props.dispatch(postBankingData(requestObj,'',`${APPLICATION_BFF_URL}/customer/bankingdetails`)).then((data)=>{
        if(data.data.message) {
          this.props.dispatch(showMessage({text: "Successful Operation", isSuccess: true}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
          },6000);
        }
      }, (err)=>{
        if(err.message) {
          this.props.dispatch(showMessage({text: err.message ,isSuccess: false}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: false}));
          },6000);
        }
      });
  
    }
    submitForApproval=()=>
    {
     this.props.dispatch(getApprovalStatus('submit for apporvall',`${APPLICATION_BFF_URL}/customer/approval?_id=${localStorage.getItem('id')}`)).then((data)=>{
        if(true) {
          this.props.history.push("./approval")
          this.props.dispatch(showMessage({text: "Requested Sent Successfully", isSuccess: true}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
          },6000);
        }
      }, (err)=>{
        if(err.message) {
          this.props.dispatch(showMessage({text: err.message, isSuccess: false}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: false}));
          },6000);
        }
      });
    }
    render()
    {
        const {handleSubmit} = this.props;
        console.log(this.props,"props is here")
        return(
            <div>
                 <form onSubmit={handleSubmit(this.bankingDataSaveHandler)}>
            <BankingInfoComponent/>
            <div className="form-btn-group">
                <Button variant="contained" type='submit' color='primary'>Save</Button> 
                <Button  variant="contained" disabled={this.props.invalid||!this.props.anyTouched} onClick={this.submitForApproval}  color='primary' >Submit for approval</Button>
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


      