import React, { Component } from 'react';
import { line1, line2, line3 } from '../../components/common/AfterApproval/afterApproval'
import logo from './../../assets/images/logo-main.png';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { logout } from '../../action/loginAction';

class AfterApproval extends Component {
    handleSwitch=()=>
    {
        this.props.dispatch(logout());
        localStorage.clear();
        this.props.history.push('/');
    }
    render() {
        return (<div className="message-alert">
        <img src={logo} />
            <div>{line1}</div>
            <div>{line2}</div>
            <div>{line3}</div>
            <Button onClick={this.handleSwitch} variant="contained" color='primary'>OK</Button>
        </div>
        )
    }
}
function mapStateToProps(state)
{
    let role = state.basicInfodata.role;

    return {role}
}

export default connect(mapStateToProps)(AfterApproval)