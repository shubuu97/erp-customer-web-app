import React, { Component } from 'react';
import { line1 } from '../../components/common/AfterCheckout/afterCheckout'
import logo from './../../assets/images/logo-main.png';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { logout } from '../../action/loginAction';

class AfterCheckout extends Component {
    handleSwitch=()=>
    {
        
        this.props.history.push('/productList');
       
    }
    render() {
        console.log("After checkout",this.props.orderData);
        return (<div className="message-alert">
        <img src={logo} />
            <div>{line1}</div>
            <div></div>
            <Button onClick={this.handleSwitch} variant="contained" color='primary'>Back to Shopping</Button>
        </div>
        )
    }
}
function mapStateToProps(state)
{
    let role = state.basicInfodata.role;
    let orderData = state.orderData.orderData;
    return {role, orderData}
}

export default connect(mapStateToProps)(AfterCheckout)