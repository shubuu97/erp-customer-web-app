import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';

import CustomerBankDetails from '../../../components/CustomerProfile/BankingInfo/customerBankDetails';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails';
import RaiseButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem';


class CustomerBankingInfo extends Component {
        render() {
            return (<div>
                <header>Customer Banking Details</header>
                {CustomerBankDetails.map((info) => {
                    return (
                        <Field name={info.name} label={info.label} component={info.component} />)
                }
                )}

                <header>Bank Details</header>
                {BankDetailFields.map((info) => {
                    return (
                        <Field name={info.name} label={info.label} component={info.component} />)
                })

                }
                <RaiseButton label="Save" />
                <RaiseButton primary={true} label="Submit for approval" />
            </div>
            )

        }
}
export default reduxForm({
    form:'CustomerBankingInfo'
})(CustomerBankingInfo)