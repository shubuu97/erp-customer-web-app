import BankingInfoComponent from '../../../components/CompanyProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import RaiseButton from 'material-ui/RaisedButton';


class BankingInfo extends Component
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
    form:'CompanyBankingInfo'
})(BankingInfo)


      