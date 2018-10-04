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
import _get from 'lodash/get';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class BankingInfo extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      openSubmitApprove:false
    }
  }
  componentWillMount()
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
          this.setState({openSubmitApprove:true})
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
      let requestObj={
        ...this.props.formValue,
        businessCustomerId : localStorage.getItem('id')
    }
    // this.props.dispatch(postBankingData(requestObj,'',`${this.props.urlLinks.updateOrCreateBankingDetails.href}`))
    
     this.props.dispatch(getApprovalStatus('submit for apporvall',`${APPLICATION_BFF_URL}/businessCustomer/approval?_id=${localStorage.getItem('id')}`)).then((data)=>{
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
    closeSubmitForApprove = () =>{
      this.setState({openSubmitApprove: false});
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
                </div>
                </form>
                <Dialog
                        open={this.state.openSubmitApprove  }
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        className="dialogbox-ui small"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            {/* <h2 className="modal-title">{"Confirmation"}</h2> */}
                            <span onClick={()=>this.closeSubmitForApprove()}>close</span>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <p className="text-dialog">Your profile is ready to submit.</p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className="col-sm-12 dialog-btn">
                            <Button onClick={this.submitForApproval} variant="contained" color="primary">
                               Submit for Approval
                            </Button>
                            
                        </DialogActions>
                    </Dialog>
            </div>
        )
    }
}
 BankingInfo=reduxForm({
    form:'CompanyBankingInfo',
    asyncValidate,
    enableReinitialize:true,
    keepDirtyOnReinitialize:true
})(BankingInfo)

const mapStateToProps=(state)=>
{
    let initialValues = state.bankDetailsData.lookUpData.data;
    let imageUrl = _get(state,'bankDetailsData.lookUpData.data.bankingDetailInfo.voidCheckUrl','')

    let isLoading= state.bankDetailsData.isFetching;
 let    formValue = _get(state,'form.CompanyBankingInfo.values',{})
    let paymentTerms = _get(state,"bankDetailsData.lookUpData.data.paymentTerms.data",[{label:'',value:''}])
    let currencyCodes   = _get(state,"bankDetailsData.lookUpData.data.currencyCodes.data",[{label:'',value:''}])
    let urlLinks = _get(state,'urlLinks.formSearchData._links',{})
    
    let paymentMethods   = _get(state,"bankDetailsData.lookUpData.data.paymentMethods.data",[{label:'',value:''}])

    return {initialValues,isLoading,urlLinks,currencyCodes,paymentTerms,paymentMethods,formValue,imageUrl}

}


export default connect(mapStateToProps)(BankingInfo)


      