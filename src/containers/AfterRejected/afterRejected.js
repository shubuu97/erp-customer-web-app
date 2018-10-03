import React, { Component } from 'react';
import logo from './../../assets/images/logo-main.png';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { logout } from '../../action/loginAction';

class AfterRejected extends Component {
    handleSwitch=()=>
    {
        if (this.props.role=="customer")
        this.props.history.push('/StaticProfileView');
        else
        this.props.history.push('/CompanyStaticProfileView');
    }
    render() {
        return (<div className="message-alert">
        <img src={logo} />
            <div>Your Profile have been Rejected.</div>
            <div>Kindly resubmit the details to proceed further. </div>
            
            <Button onClick={this.handleSwitch} variant="contained" color='primary'>Back to Profile</Button>
        </div>
        )
    }
}
function mapStateToProps(state)
{
    let role = state.basicInfodata.role;

    return {role}
}

export default connect(mapStateToProps)(AfterRejected)