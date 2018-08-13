import React,{PureComponent} from 'react';
import CompanyRegister from '../../../components/Register/CompanyRegistration/companyRegistration.js';

import {reduxForm} from 'redux-form'
class CompanyRegistration extends PureComponent
{
 render()
 {
   return(
       <div>
           <CompanyRegister />
        </div>
   )
 }   
}


export default reduxForm(
 {form:'CompanyRegistration'}
)(CompanyRegistration)
