import React, { Component } from 'react';

import { reduxForm, Field,FieldArray} from 'redux-form';

import CustomerBankDetails from '../../CustomerProfile/BankingInfo/customerBankDetails';
import BankDetailFields from '../../../components/common/BankDetails/bankDetails';
import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem';
let prop={};
prop.paymentTerms = ['FFF','AAA'];
prop.invoiceCurrencyCode=['INR','USD']


let BankDetailComponent = (props)=>
{
    const { fields, meta: { error } } = props;
    if(fields.length==0)
    fields.push();
    return (
        <div>
            
            {fields.map((bankDetails, index) => (
            
                <div>
                
                {BankDetailFields.map((info) => {
                    console.log(prop[info.name], "info")

                    if (info.type == 'select') {

                        return (

                            <Field name={`${bankDetails}.${info.name}`} component={info.component} label={info.label}>
                                {prop[info.name].map((name) => {
                                    return (<MenuItem value={name} primaryText={name} />)
                                })}
                            </Field>

                        )
                    }
                    return (<Field name={`${bankDetails}.${info.name}`} label={info.label} component={info.component} />)
                })


                }
              {fields.length!=1&&<RaisedButton label="Remove" primary={true} onClick={() => fields.remove(index)} />}
                </div>))}
                <RaisedButton label="Add New" primary={true} onClick={() => fields.push()} />
        </div>
    )
}

class CustomerBankingInfo extends Component {
        render() {
            return (<div>
                <header>Customer Banking Details</header>
               
                { CustomerBankDetails.map((info)=>
         {
             console.log(info.name)
             
             if(info.type=='select')
             {
            {console.log(prop[info.name],'details')}
                         return (
                
                 <Field name={info.name} component={info.component} label={info.label}>
                 {prop[info.name].map((name,index)=>
                {
                   return (<MenuItem value={name} primaryText={name} key={index} />)
                })}
                 </Field>

             )
            }
            return (<Field name={info.name} label={info.label} component={info.component} />)
         })
         }
                <header>Bank Details</header>
                <FieldArray name='bankDetails' component={BankDetailComponent}/>
               
            </div>
            )

        }
}
export default CustomerBankingInfo