import React, { Component } from 'react';
import { line1, line2 } from '../../components/common/AfterCheckout/afterCheckout'
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
            total:null,
            paymentStatus:''
        }
    }
    componentDidMount() {
        const {orderData} = this.props;
        let total=0;
       let paymentStatus =  _get(orderData,'data.paymentDetails.data.status','PLACE_ORDER');
        (_get(orderData, 'data.salesOrder.saleProducts') || _get(orderData, 'data.items', [])).map((item)=>{
            total = total + (item.quantity * item.price.price);
        });
        this.setState({total,paymentStatus});
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
       let  styleOfPaymentFailed = this.state.paymentStatus=="PAYMENT_SUCCESS"?{color:"green"}:(this.state.paymentStatus=="PAYMENT_FAILED"?{color:'red'}:null)
        console.log("After checkout",this.state);
        return (<div className="thankyou-order">
        <img src={thankyouCart} className="thankyoucart"/>
           {this.state.paymentStatus == 'PAYMENT_SUCCESS' || this.state.paymentStatus== 'PLACE_ORDER' ? <h1>{line1}</h1> : <h1 style={{color:'red'}}>{line2}</h1>}
            <div className="thankyou-box">
                <div className="d-flex justify-content-between"><label>Order Number: </label><span>{_get(this.props.orderData, 'data.salesOrder.displayId', '') || _get(this.props.orderData, 'data.displayId', '')}</span></div>
                <div className="d-flex justify-content-between"><label>Order Date: </label><span>{moment().format('MMM Do YY')}</span></div>
                <div className="d-flex justify-content-between"><label>Order Total: </label><span>$ {this.state.total}</span></div>
                {/* <div className="d-flex justify-content-between"><label>Payment Method: </label><span>{_get(this.props.orderData, 'data.salesOrder.payment.method', '') || _get(this.props.orderData, 'data.paymentInfo.method', '')}</span></div> */}
                {/* <div className="d-flex justify-content-between"><label>Transaction ID: </label><span>{_get(this.props.orderData, 'data.salesOrder.payment.transactionId', '') || _get(this.props.orderData, 'data.paymentInfo.transactionId', '')}</span></div> */}
               { this.state.paymentStatus!="PLACE_ORDER"? <div className="d-flex justify-content-between"><label>Payment Status: </label><span style={styleOfPaymentFailed} >{this.state.paymentStatus}</span></div>:null}

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