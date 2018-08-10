import React from 'react';
import {Field} from 'redux-form'
import {TextFieldInput} from './common/MaterialUiComponents.js';
import RFReactSelect from './common/reactSelectWrapper';
const fruits = [
    { value: 'apples', label: 'Apples' },
    { value: 'bananas', label: 'Bananas' },
    { value: 'grapes', label: 'Grapes' }
  ];
export default (props)=>
{
return(
    <div>
        <Field label="Adress" name="Address" component={TextFieldInput}/>
        <Field label="PostalCode" name="PostalCode" component = {TextFieldInput}/>
        <Field  label="city" name="city" component={TextFieldInput}/>
        <Field  label="state" name="state" component={TextFieldInput}/>
        <Field
  multi={false}
  name="fruits"
  options={fruits}
  component={RFReactSelect} />
    </div>
)

}