import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';

import React, { Component } from 'react';

import { reduxForm } from 'redux-form';
import AccountInfo from '../../../components/CustomerProfile/AccountInfo'
class CustomerInfo extends Component {
    render() {
        return (
            <div>
                <AccountInfo />
            </div>
        )
    }
}

export default reduxForm({
    form: 'CustomeInfo',
    initialValues: {
        addressInfo: [
            {
                locationAddress: "",
                city: '',
                state: '',
                country: '',
                zipCode: ''
            }
        ]
    }
})(CustomerInfo)