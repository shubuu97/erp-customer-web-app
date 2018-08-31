import React, { Component } from 'react';
import CheckoutAddresses from './CheckoutAddresses';
import OrderDetails from './OrderDetails';
import { connect } from 'react-redux';
import { postCheckoutData } from '../action/checkout';
import { CHECKOUT_URL } from '../constants/checkout';
import {fetchLicenseDetailsData} from '../../../action/getLicenseInfo';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';
import { addToCart } from '../action/product';

class CheckOut extends Component {
	constructor(props) {
		super();
		this.state = {
			subTotal: null,
			orderTotal: null,
			address: {}
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
		 this.props.dispatch(fetchLicenseDetailsData(`${APPLICATION_BFF_URL}/businesscustomer/companyinfo?_id=${localStorage.getItem("id")}`));
		let address = {};
		address = this.props.role == 'customer' ? this.props.userInfo.addressInfo[0] : this.props.companyinfo.companyInfo.companyAddressInfo;
		this.setState({address});
	}
	placeOrder = () => {
		const {companyinfo} = this.props;
		const {address} = this.state;
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
					address: address.companyAddress || address.address,
					city: address.city,
					country: address.country,
					state: address.state,
					zipCode: address.zipCode,
					addressType: false
				},
				shippingAddress: {
					address: address.companyAddress || address.address,
					city: address.city,
					country: address.country,
					state: address.state,
					zipCode: address.zipCode,
					addressType: false
				}
			}
		}
		this.props.dispatch(postCheckoutData(CHECKOUT_URL, orderData)).then((data) => {
			console.log("ORDER PLACED SUCCESSFULLY", data);
			this.props.dispatch(addToCart([]));
			this.props.history.push('/orderSuccess');
		}, (err) => {
			console.log("Error in order place", err);
		});

	}
	render() {
		console.log(this.props.cartProductList, "Cart list in checkout");
		const { subTotal, orderTotal, address } = this.state;
		const {companyinfo, userInfo} = this.props;
		console.log("companyinfo is here",userInfo);
		return (
			<div className="checkout-container">
				<div>
					<h4>CHECKOUT</h4>
				</div>
				<div className="address-order-details">
					<div className="address-container">
						<CheckoutAddresses  name={userInfo.firstName + ' ' + userInfo.lastName} type={'Billing Address'} address={address}/>
						<CheckoutAddresses  name={userInfo.firstName + ' ' + userInfo.lastName} type={'Shipping Address'} address={address}/>
					</div>
					<OrderDetails placeOrder={this.placeOrder} cartProductList={this.props.cartProductList} orderTotal={orderTotal} subTotal={subTotal} />
				</div>
			</div>
		)
	}
}
const mapStateToPtops = (state) => {
	let cartProductList = state.productData.cartProductList;
	let companyinfo =  state.licenseDetailsData.lookUpData.data;
	let userInfo = state.basicInfodata && state.basicInfodata.basicInfoData;
	let role = state.basicInfodata && state.basicInfodata.role;
	return { cartProductList, companyinfo, userInfo, role };
}
export default connect(mapStateToPtops)(CheckOut);