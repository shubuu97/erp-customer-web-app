import CompanyRegistration from '../../../components/Register/CompanyRegistration/companyRegistration';

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';


class AccountInfo extends Component
{
    render()
    {
        return(
            <div>
            <CompanyRegistration/>
            </div>
        )
    }
}

export default reduxForm({
    form:'AccountInfo',
    initialValues:{firstName:'Allonblcik',
    middleName:'',
   lastName:'jj',
   officialEmailAddress:'jay@allonblock',
  designation:'software engineer'}
})(AccountInfo)


      