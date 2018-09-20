import React, { Component } from 'react';
import { line1 } from '../../components/common/AfterCheckout/afterCheckout'
import logo from './../../assets/images/logo-main.png';
import thankyouCart from './../../assets/images/thankyou-cart-icon.png';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { logout } from '../../action/loginAction';
import moment from 'moment';
import _get from 'lodash/get';

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
        _get(orderData, 'data.salesOrder.saleProducts', []).map((item)=>{
            total = total + (item.quantity * item.price.price);
        });
        this.setState({total});
        document.body.classList.add('order-success-page')
    }
    componentWillUnmount(){
      document.body.classList.remove('order-success-page');
    }
    handleSwitch=()=>
    {
        
        this.props.history.push('/productList');
       
    }
    render() {
        console.log("After checkout",this.props.orderData);
        return (<div className="thankyou-order">
        <img src={thankyouCart} className="thankyoucart"/>
            <h1>{line1}</h1>
            <div className="thankyou-box">
                <div className="d-flex justify-content-between"><label>Order Number: </label><span>{_get(this.props.orderData, 'data.salesOrder.displayId', '')}</span></div>
                <div className="d-flex justify-content-between"><label>Order Date: </label><span>{moment().format('MMM Do YY')}</span></div>
                <div className="d-flex justify-content-between"><label>Order Total: </label><span>$ {this.state.total}</span></div>
                <div className="d-flex justify-content-between"><label>Payment Method: </label><span>{_get(this.props.orderData, 'data.salesOrder.payment.method', '')}</span></div>
                <div className="d-flex justify-content-between"><label>Transaction ID: </label><span>{_get(this.props.orderData, 'data.salesOrder.payment.transactionId', '')}</span></div>
            </div>
            <Button onClick={this.handleSwitch} size="large" variant="contained" color='primary'>Continue Shopping</Button>
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