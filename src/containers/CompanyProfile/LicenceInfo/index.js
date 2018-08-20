import LicenseInfoComponent from '../../../components/CompanyProfile/LicenceInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';

import asyncValidate from './validate.js'


class LicenseInfo extends Component
{
    render()
    {
        return(
            <div>
            <LicenseInfoComponent/>
            </div>
        )
    }
}

export default reduxForm({
    form:'LicenseInfo',
    asyncValidate

})(LicenseInfo)


      