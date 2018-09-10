import BankingInfoComponent from '../../../components/CompanyProfile/BankingInfo';

import React,{Component} from 'react';


import {reduxForm} from 'redux-form';

import Button from '@material-ui/core/Button';
import asyncValidate from './validate.js'

import {postBankingData} from '../../../action/banking'
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';
import {connect} from 'react-redux';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'
import {showMessage} from '../../../action/common';
import {getApprovalStatus} from '../../../action/submitForApproval';
import _get from 'lodash/get' 

class BankingInfo extends Component
{

    componentDidMount()
    {
      //this.props.dispatch(fetchBankingDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/bankingdetails?_id=${localStorage.getItem("id")}`));
      this.props.dispatch(fetchBankingDetailsData(`${this.props.urlLinks.getBankingDetailsInfo.href}?_id=${localStorage.getItem("id")}`))
    }
    bankingDataSaveHandler=(values)=>
    {
  

    let requestObj={
        ...values,
        businessCustomerId : localStorage.getItem('id')
    }
     this.props.dispatch(postBankingData(requestObj,'',`${this.props.urlLinks.updateOrCreateBankingDetails.href}`)).then((data)=>{
        if(data.data.message) {

          this.props.dispatch(showMessage({text: "Successfully Saved", isSuccess: true}));
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

    submitForApproval=()=>
    {
     this.props.dispatch(getApprovalStatus('submit for apporvall',`${APPLICATION_BFF_URL}/customer/approval?_id=${localStorage.getItem('id')}`)).then((data)=>{
        console.log("Data for company register", data);
        if(true) {
          this.props.history.push("./approval")
          this.props.dispatch(showMessage({text: 'Requested Sent Successfully', isSuccess: true}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: '', isSuccess: true}));
          },6000);
        }
      }, (err)=>{
        console.log("Error in company register", err);
        if(err.message) {
          this.props.dispatch(showMessage({text: err.message, isSuccess: false}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: '', isSuccess: false}));
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
<BankingInfoComponent {...this.props}/>

                <div className="form-btn-group">
                    <Button variant="contained" type='submit' color='primary'>Save</Button>
                    <Button variant="contained"  disabled={this.props.invalid||!this.props.anyTouched} onClick={this.submitForApproval} color='primary'>Submit for approval</Button>
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
    let isLoading= state.bankDetailsData.isFetching;
    let paymentTerms = _get(state,"bankDetailsData.lookUpData.data.paymentTerms.data",[{label:'',value:''}])
    let currencyCodes   = _get(state,"bankDetailsData.lookUpData.data.currencyCodes.data",[{label:'',value:''}])
    let urlLinks = _get(state,'urlLinks.formSearchData._links',{})
    
    let paymentMethods   = _get(state,"bankDetailsData.lookUpData.data.paymentMethods.data",[{label:'',value:''}])

    return {initialValues,isLoading,urlLinks,currencyCodes,paymentTerms,paymentMethods}

}


export default connect(mapStateToProps)(BankingInfo)


      