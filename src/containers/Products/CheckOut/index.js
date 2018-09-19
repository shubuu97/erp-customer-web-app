import React, { Component } from 'react';
import CheckoutAddresses from './CheckoutAddresses';
import OrderDetails from './OrderDetails';
import { connect } from 'react-redux';
import { postCheckoutData } from '../action/checkout';
import { CHECKOUT_URL } from '../constants/checkout';
import { fetchLicenseDetailsData } from '../../../action/getLicenseInfo';
import {fetchBankingDetailsData} from '../../../action/getBankingDetails';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import { addToCart } from '../action/product';
import _get from 'lodash/get';
import {find} from 'lodash';


class CheckOut extends Component {
	constructor(props) {
		super();
		this.state = {
			subTotal: null,
			billingSelectedAddress:0,
			shippingSelctedAddress:0,
			orderTotal: null,
			address: [],
			toggle: false,
			paymentTerm: '',
			termCondition: false,
			showError: false,
			paymentTerms:[{ label: 'Current', value: 'current' }]
		};
	}

	billingAddressSelect=(index)=>
	{
		this.setState({billingSelectedAddress:index})
	}
	shippingAddressSelect=(index)=>
	{
		this.setState({shippingSelctedAddress:index})
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
		let address = {};
		if(this.props.role == 'customer') {
			address = this.props.userInfo.addressInfo;
			this.setState({ address });
		} else {
			this.props.dispatch(fetchLicenseDetailsData(`${this.props.urlLinks.getCompanyInfo.href}?_id=${localStorage.getItem("id")}`)).then((companyInfoData)=>{
				console.log("companyInfoData in did mount",companyInfoData);
				address = _get(companyInfoData, 'data.companyInfo.companyAddressInfo', {});
				this.state.address.push(address);
				this.setState({ address:this.state.address });
			});
		}
		this.props.dispatch(fetchBankingDetailsData(`${this.props.urlLinks.getBankingDetailsInfo.href}?_id=${localStorage.getItem("id")}`)).then((bankingData)=>{
			console.log("bankingData in did mount",bankingData);
			let paymentTermsArray = _get(bankingData,'data.paymentTerms.data', [])
			let selectedPaymentTerms = find(paymentTermsArray, {value:_get(bankingData,'data.bankingDetailInfo.paymentTerms', '')});
			let paymentTerms = [{ label: 'Current', value: 'current' }];
			paymentTerms.push(selectedPaymentTerms);
			this.setState({paymentTerms});
		});
		document.body.classList.add('checkout-page')
	}
	componentWillUnmount() {
		document.body.classList.remove('checkout-page');
	}
	placeOrder = () => {
		const { userBasicInfo, role } = this.props;
		const {  paymentTerm } = this.state;
		const shippingAddress = this.state.address[this.state.shippingSelctedAddress]
		let billingAddress = this.state.address[this.state.billingSelectedAddress]
		let items = [];
		if(!this.state.termCondition) {
			this.setState({showError: 'Please accept terms and conditions.'});
			return;
		}
		if(!paymentTerm.value) {
			this.setState({showError: 'Please accept payment term.'});
			return;
		}
		this.props.cartProductList.map((item) => {
			let itemObj = {
				id: item.itemId,
				qty: parseInt(item.quantity),
				name: item.itemName,
				pricePerUnit: item.price,
			};
			items.push(itemObj);
		})
		let orderData = {
			data: {
				customerName: userBasicInfo.basicInfoData.firstName + " " + userBasicInfo.basicInfoData.lastName,
				customerId: userBasicInfo.id,
				items: items,
				customerType: role == 'customer' ? 'Customer' : 'Business Customer',
				paymentTerms: paymentTerm.value || 'current',
				paymentMethod: "CASH",
				shippingAmt: 10,
				isShippingSameAsBilling: false,
				billingAddress: {
					address: billingAddress.companyAddress || billingAddress.address,
					city: billingAddress.city,
					country: billingAddress.country,
					state: billingAddress.state,
					zipCode: billingAddress.zipCode,
					addressType: false
				},
				shippingAddress: {
					address: shippingAddress.companyAddress || shippingAddress.address,
					city: shippingAddress.city,
					country: shippingAddress.country,
					state: shippingAddress.state,
					zipCode: shippingAddress.zipCode,
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
	toggle = () => {
		if (this.props.cartProductList.length > 0) {
			this.setState({ toggle: !this.state.toggle });
		}
	}
	paymentTermUpdate = (val) => {
		console.log(val);
		if (val) {
			this.setState({ paymentTerm: val, showError: '' });
		}
	}
	selectTermCondition = () => {
		console.log(this.state.termCondition);
		this.setState({ termCondition: !this.state.termCondition, showError: '' })
	}
	render() {
		console.log(this.props.isLoading, "isLoading in checkout");
		const { subTotal, orderTotal, address, toggle, paymentTerm, termCondition, showError, paymentTerms } = this.state;
		const { companyinfo, userInfo } = this.props;
		console.log("companyinfo is here", userInfo);
		return (
			<div className="checkout-container container">
				<div>
					<h2 className="cart-heading">Checkout</h2>
				</div>
				<div className="col-md-9 cart-table-parent">
					<div className="address-order-details">
						<div className="address-container">
							<CheckoutAddresses addressSelect={this.billingAddressSelect} selectedAddress={this.state.billingSelectedAddress} name={userInfo.firstName + ' ' + userInfo.lastName} type={'Billing Address'} address={address} />
							<CheckoutAddresses  addressSelect={this.shippingAddressSelect} selectedAddress={this.state.shippingSelctedAddress} name={userInfo.firstName + ' ' + userInfo.lastName} type={'Shipping Address'} address={address} />
						</div>
					</div>
				</div>
				<OrderDetails  termCondition={termCondition} selectTermCondition={this.selectTermCondition} 
				paymentTerms={paymentTerms} paymentTerm={paymentTerm} paymentTermUpdate={this.paymentTermUpdate} 
				collapse={toggle} toggle={this.toggle} placeOrder={this.placeOrder} cartProductList={this.props.cartProductList} 
				orderTotal={orderTotal} subTotal={subTotal} showError={showError} {...this.props}/>
			
		
			</div>
		)
	}
}
const mapStateToPtops = (state) => {
	let cartProductList = state.productData.cartProductList;
	let companyinfo = state.licenseDetailsData.lookUpData.data;
	let userBasicInfo = state.basicInfodata;
	let userInfo = state.basicInfodata && state.basicInfodata.basicInfoData;
	let role = state.basicInfodata && state.basicInfodata.role;
	let isLoading= state.orderData.isFetching;
	let urlLinks = _get(state,'urlLinks.formSearchData._links',{})
	return { cartProductList, companyinfo, userInfo, role, userBasicInfo, isLoading, urlLinks };
}
export default connect(mapStateToPtops)(CheckOut);