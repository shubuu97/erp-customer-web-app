import BankingInfoComponent from '../../../components/CompanyProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import RaiseButton from 'material-ui/RaisedButton';
import asyncValidate from './validate.js'


class BankingInfo extends Component
{
    render()
    {
        return(
            <div>
            <BankingInfoComponent/>
                <div className="form-btn-group">
                    <RaiseButton label="Save" />
                    <RaiseButton primary={true} label="Submit for approval" />
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form:'CompanyBankingInfo',
    asyncValidate
})(BankingInfo)


      