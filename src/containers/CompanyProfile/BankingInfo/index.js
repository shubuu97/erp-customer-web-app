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

class BankingInfo extends Component
{

    // componentDidMount()
    // {
    
    //     this.props.dispatch(fetchBankingDetailsData(`${}/businesscustomer/bankingdetails?_id=5b7514dfab851a001b83452a`));
    // }
    bankingDataSaveHandler=(values)=>
    {
      console.log(this.props,"props fff")
  
    console.log(values,"aa");

    let requestObj={
        ...values,
        businessCustomerId : localStorage.getItem('id')
    }
     this.props.dispatch(postBankingData(requestObj,'',`${APPLICATION_BFF_URL}/businesscustomer/bankingdetails`));
  
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
                    <Button variant="contained" color='primary'>Submit for approval</Button>
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
    console.log(state,"state of licenese");
    return {initialValues,isLoading}

}


export default connect(mapStateToProps)(withLoader(BankingInfo))


      