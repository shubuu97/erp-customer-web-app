import React, { Component } from 'react';
import CheckoutAddresses from './CheckoutAddresses';
import OrderDetails from './OrderDetails';
import { connect } from 'react-redux';
import { postCheckoutData } from '../action/checkout';
import { CHECKOUT_URL } from '../constants/checkout';
class CheckOut extends Component {
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
		this.props.cartProductList && this.props.cartProductList.map((item) => {
			subTotal = subTotal + item.total;
		});
		let orderTotal = subTotal + shipping + tax;
		this.setState({ subTotal, orderTotal });
		// this.props.dispatch(fetchLicenseDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/companyinfo?_id=${localStorage.getItem("id")}`));
	}
	placeOrder = () => {
		let items = [];
		this.props.cartProductList.map((item) => {
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
		this.props.dispatch(postCheckoutData(CHECKOUT_URL, orderData)).then((data) => {
			console.log("ORDER PLACED SUCCESSFULLY", data);
			this.props.history.push('/orderSuccess');
		}, (err) => {
			console.log("Error in order place", err);
		});

	}
	render() {
		console.log(this.props.cartProductList, "Cart list in checkout");
		const { subTotal, orderTotal } = this.state;
		return (
			<div className="checkout-container">
				<div>
					<h4>CHECKOUT</h4>
				</div>
				<div className="address-order-details">
					<div className="address-container">
						<CheckoutAddresses type={'Billing Address'} />
						<CheckoutAddresses type={'Shipping Address'} />
					</div>
					<OrderDetails placeOrder={this.placeOrder} cartProductList={this.props.cartProductList} orderTotal={orderTotal} subTotal={subTotal} />
				</div>
			</div>
		)
	}
}
const mapStateToPtops = (state) => {
	let cartProductList = state.productData.cartProductList;
	return { cartProductList };
}
export default connect(mapStateToPtops)(CheckOut);