import LoginFields from './LoginFields.js';
import {Field} from 'redux-form';
import React,{Component} from 'react';
import {TextFieldInput} from '../common/MaterialUiComponents';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';


const email=( {input,
label,
meta: { touched, error },
...custom
})=>
{
return(
<FormGroup controlId="email" bsSize="large">

<FormControl
autoFocus
type="email"
name="email"
onChange={input.onChange}
placeholder="Email"
/>
</FormGroup>)
}

const password = ({input,
label,
meta: { touched, error },
...custom
})=>
{
return(
<FormGroup controlId="password" bsSize="large">

<FormControl

onChange={input.onChange}
name="password"
type="password"
placeholder="Password"
/>
</FormGroup>
)
}

export default class Login extends Component
{

render()
{
return(
<div>
<Field name={'email'} label={'Email'} component={email}/>
<Field name={'password'} label={'Password'} component={password}/>

</div>
)
}
}
