import SiteInfoComponent from '../../../components/CompanyProfile/SiteInfo';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';
import asyncValidate from './validate.js'


class SiteInfo extends Component
{
    render()
    {
        return(
            <div>
            <SiteInfoComponent/>
            </div>
        )
    }
}

export default reduxForm({
    form:'SiteInfo',
    asyncValidate
})(SiteInfo)


      