import React ,{Component} from 'react';
import BillingDetails from './BillingDetails';
import OrderDetails from './OrderDetails';
import ShippingDetails from './ShippingDetails';
import {connect} from 'react-redux';
import {postCheckoutData} from '../action/checkout';
import {CHECKOUT_URL} from '../constants/checkout';
class CheckOut extends Component
{
    constructor(props) {
        super();
        this.state = {
            subTotal: null,
            orderTotal: null
        };
    }
    componentDidMount() {
        let subTotal = null;
        let shipping = 10;
        let tax = 8;
        this.props.cartProductList && this.props.cartProductList.map((item)=>{
            subTotal = subTotal + item.total;
        });
        let orderTotal = subTotal + shipping + tax;
        this.setState({subTotal, orderTotal});
    }
    placeOrder = () => {
        let items = [];
        this.props.cartProductList.map((item)=>{
            let itemObj = {
                id: item.itemId,
                qty: item.quantity,
                name: item.itemInfo.itemName,
                pricePerUnit: item.itemInfo.price,
            };
            items.push(itemObj);
        })
        let orderData = {
            data: {
              items: items,
              paymentMethod: "CASH",
              shippingAmt: 10,
              isShippingSameAsBilling: false,
              billingAddress: {
                address: "529 Mansarovar Plaza",
                city: "Jaipur",
                country: "India",
                state: "Rajasthan",
                zipCode: "3232",
                addressType: false
              },
              shippingAddress: {
                address: "529 Mansarovar Plaza",
                city: "Jaipur",
                country: "India",
                state: "Rajasthan",
                zipCode: "3232",
                addressType: false
              }
            }
          }
          this.props.dispatch(postCheckoutData(CHECKOUT_URL, orderData)).then((data)=>{
            console.log("ORDER PLACED SUCCESSFULLY",data);
          }, (err)=> {
            console.log("Error in order place",err);
          });

    }
    render()
    {
        console.log(this.props.cartProductList, "Cart list in checkout");
        const {subTotal, orderTotal} = this.state;
        return(
            <div>
            <BillingDetails/>
            <ShippingDetails/>
            <OrderDetails placeOrder={this.placeOrder} cartProductList={this.props.cartProductList} orderTotal={orderTotal} subTotal={subTotal}/>
            </div>
        )
    }
}
const mapStateToPtops = (state) => {
    let cartProductList = state.productData.cartProductList;
    return {cartProductList};
}
export default connect(mapStateToPtops)(CheckOut);