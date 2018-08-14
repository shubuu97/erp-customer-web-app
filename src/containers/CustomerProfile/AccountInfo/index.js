import CustomerRegistration from '../../../components/Register/CustomerRegistration/customerRegistration';

import React,{Component} from 'react';

import {reduxForm,Field} from 'redux-form';

import AddressInfoFields from '../../../components/common/AddressInfo/adddressInfoFields';
import BasicInfoFields from '../../../components/common/BasicInfo/BasicInfoFields';
import MenuItem from 'material-ui/MenuItem';


let props ={};
props.country = ['India','China'];
props.state = ['Rajasthan','Karnatak'];
props.city = ['jaipur','banglaore'];
class CustomerInfo extends Component
{
    render()
    {
        return(
            <div>
                <header>Basic Info</header>
                {BasicInfoFields.map((info) => {
                    return (
                        <Field name={info.name} label={info.label} component={info.component} />)
                }
                )}
                <header>Address Details</header>
             { AddressInfoFields.map((info)=>
             {
                 console.log(info.name)
                 
                 if(info.type=='select')
                 {
                
                 return (
                    
                     <Field name={info.name} component={info.component} label={info.label}>
                     {props[info.name].map((name)=>
                    {
                       return (<MenuItem value={name} primaryText={name} />)
                    })}
                     </Field>

                 )
                }
                return (<Field name={info.name} label={info.label} component={info.component} />)
             })
             }
            </div>
        )
    }
}

export default reduxForm({
    form:'CustomeInfo',
    initialValues:{firstName:'Allonblcik',
    middleName:'',
   lastName:'jj',
   emailId:'jay@allonblock',
  designation:'software engineer',
locationAddress:"529,5th Floor",
city:'Jaipur',
state:'Rajasthan',
country:'India',
zipCode:'302020'}
})(CustomerInfo)