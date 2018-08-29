import React,{Component} from 'react';
import {string,string1} from '../../components/common/AfterRegistration/afterRegistration'
import logo from './../../assets/images/logo-main.png';
import Button from '@material-ui/core/Button';

class AfterRegister extends Component
{
    render()
    {
        return(<div className="message-alert">
        <img src={logo} />
            <div>{string}</div>
            <div>{string1}</div>
            <Button variant="contained" color='primary'>Go Back to Login</Button>
            </div>
        )
    }
}
export default AfterRegister