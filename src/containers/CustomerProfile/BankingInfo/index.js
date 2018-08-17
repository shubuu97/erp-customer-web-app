import BankingInfoComponent from '../../../components/CustomerProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import RaiseButton from 'material-ui/RaisedButton';
import asyncValidate from './validate.js'


class CustomerBankingDetails extends Component
{
    render()
    {
        return(
            <div>
            <BankingInfoComponent/>
            <RaiseButton label="Save" />
            <RaiseButton primary={true} label="Submit for approval" />
            </div>
        )
    }
}

export default reduxForm({
    form:'CustomerBankingInfo',
    asyncValidate
})(CustomerBankingDetails)


      