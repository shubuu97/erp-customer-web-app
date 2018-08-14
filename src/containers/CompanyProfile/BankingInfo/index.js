import BankingInfoComponent from '../../../components/CompanyProfile/BankingInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';


class BankingInfo extends Component
{
    render()
    {
        return(
            <div>
            <BankingInfoComponent/>
            </div>
        )
    }
}

export default reduxForm({
    form:'CompanyBankingInfo'
})(BankingInfoComponent)


      