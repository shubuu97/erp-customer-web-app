import BankingInfoComponent from '../../../components/CompanyProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import Button from '@material-ui/core/Button';
import asyncValidate from './validate.js'

import {postBankingData} from '../../../action/banking'
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';
import {connect} from 'react-redux';
import withLoader from '../../../components/LoaderHoc'
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'
import {showMessage} from '../../../action/common';
import {getApprovalStatus} from '../../../action/submitForApproval';

class BankingInfo extends Component
{

    // componentDidMount()
    // {
    
    //     this.props.dispatch(fetchBankingDetailsData(`${}/businesscustomer/bankingdetails?_id=5b7514dfab851a001b83452a`));
    // }
    bankingDataSaveHandler=(values)=>
    {
  

    let requestObj={
        ...values,
        businessCustomerId : localStorage.getItem('id')
    }
     this.props.dispatch(postBankingData(requestObj,'',`${APPLICATION_BFF_URL}/businesscustomer/bankingdetails`)).then((data)=>{
        if(data.data.message) {
          this.props.dispatch(showMessage({text: "Successful Operation", isSuccess: true}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
          },6000);
        }
      }, (err)=>{
        if(err.message) {
          this.props.dispatch(showMessage({text: "Operation Failed", isSuccess: false}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: false}));
          },6000);
        }
      });
  
    }

    submitForApproval=()=>
    {
     this.props.dispatch(getApprovalStatus('submit for apporvall',`${APPLICATION_BFF_URL}/customer/approval?_id=${localStorage.getItem('id')}`)).then((data)=>{
        console.log("Data for company register", data);
        if(true) {
          this.props.history.push("./approval")
          this.props.dispatch(showMessage('Requested Sent Successfully'));
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
                    <Button variant="contained" onClick={this.submitForApproval} color='primary'>Submit for approval</Button>
                </div>
                </form>
            </div>
        )
    }
}
 BankingInfo=reduxForm({
    form:'CompanyBankingInfo',
    asyncValidate
})(BankingInfo)

const mapStateToProps=(state)=>
{
    let initialValues = state.bankDetailsData.lookUpData.data
    let isLoading= state.bankDetailsData.isFetching
    return {initialValues,isLoading}

}


export default connect(mapStateToProps)(withLoader(BankingInfo))


      