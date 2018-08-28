import React, { Component } from 'react';
import { line1, line2, line3 } from '../../components/common/AfterApproval/afterApproval'
import logo from './../../assets/images/logo-main.png';
import Button from '@material-ui/core/Button';

class AfterApproval extends Component {
    render() {
        return (<div className="message-alert">
        <img src={logo} />
            <div>{line1}</div>
            <div>{line2}</div>
            <div>{line3}</div>
            <Button variant="contained" color='primary'>Go Back to Profile</Button>
        </div>
        )
    }
}
export default AfterApproval