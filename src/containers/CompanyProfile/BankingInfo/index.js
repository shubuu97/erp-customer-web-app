import BankingInfoComponent from '../../../components/CompanyProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import Button from '@material-ui/core/Button';
import asyncValidate from './validate.js'


class BankingInfo extends Component
{
    render()
    {
        return(
            <div>
            <BankingInfoComponent/>
                <div className="form-btn-group">
                    <Button variant="contained" color='primary'>Save</Button>
                    <Button variant="contained" color='primary'>Submit for approval</Button>
                </div>
            </div>
        )
    }
}

export default reduxForm({
    form:'CompanyBankingInfo',
    asyncValidate
})(BankingInfo)


      