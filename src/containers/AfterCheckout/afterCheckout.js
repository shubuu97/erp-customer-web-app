import React, { Component } from 'react';
import { line1 } from '../../components/common/AfterCheckout/afterCheckout'
import logo from './../../assets/images/logo-main.png';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { logout } from '../../action/loginAction';
import moment from 'moment';

class AfterCheckout extends Component {
    constructor(props){
        super();
        this.state = {
            total:null
        }
    }
    componentDidMount() {
        const {orderData} = this.props;
        let total=0;
        orderData.data && orderData.data.items.map((item)=>{
            total = total + (item.quantity * item.price.price);
        });
        this.setState({total});
    }
    handleSwitch=()=>
    {
        
        this.props.history.push('/productList');
       
    }
    render() {
        console.log("After checkout",this.props.orderData);
        return (<div className="message-alert">
        <img src={logo} />
            <div>{line1}</div>
            <div>Order Number: {this.props.orderData && this.props.orderData.data && this.props.orderData.data.orderId }</div>
            <div>Date: {this.props.orderData && this.props.orderData.data && moment(this.props.orderData.data.orderDate).format('MMM Do YY')}</div>
            <div>Total: $ {this.state.total}</div>
            <div>Payment method: {this.props.orderData && this.props.orderData.data && this.props.orderData.data.paymentInfo && this.props.orderData.data.paymentInfo.method}</div>
            <div>Payment transaction ID: {this.props.orderData && this.props.orderData.data && this.props.orderData.data.paymentInfo && this.props.orderData.data.paymentInfo.transactionId}</div>
            <Button onClick={this.handleSwitch} variant="contained" color='primary'>Back to Shopping</Button>
        </div>
        )
    }
}
function mapStateToProps(state)
{
    let role = state.basicInfodata.role;
    let orderData = state.orderData && state.orderData.orderData;
    console.log("order data", orderData)
    return {role, orderData}
}

export default connect(mapStateToProps)(AfterCheckout)