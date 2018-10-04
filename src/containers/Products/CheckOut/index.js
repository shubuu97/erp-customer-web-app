import React, { Component } from 'react';
import OrderDetails from './OrderDetails';
import { connect } from 'react-redux';
import { postCheckoutData } from '../action/checkout';
import { CHECKOUT_URL } from '../constants/checkout';
import { showMessage } from '../../../action/common';
import { fetchLicenseDetailsData } from '../../../action/getLicenseInfo';
import { fetchBankingDetailsData } from '../../../action/getBankingDetails';
import { postData } from '../../../action/common/post';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import { addToCart } from '../action/product';
import _get from 'lodash/get';
import { find } from 'lodash';
import AddressBook from '../../AddressBook/checkoutAddress'


class CheckOut extends Component {
	constructor(props) {
		super();
		this.state = {
			isPaying: false,
			currency: '',
			subTotal: null,
			billingSelectedAddress: 0,
			shippingSelctedAddress: 0,
			orderTotal: null,
			address: [],
			toggle: false,
			paymentTerm: '',
			termCondition: false,
			showError: false,
			payNow: false,
			paymentMethod: {
				value: props.preferedPaymentMethod,
				label: props.preferedPaymentMethod
			},
			paymentTerms: [{ label: 'Current', value: 'current' }],
			paymentConfig: []
		};
	}

	billingAddressSelect = (index) => {
		this.setState({ billingSelectedAddress: index })
	}
	shippingAddressSelect = (index) => {
		this.setState({ shippingSelctedAddress: index })
	}
	componentDidMount() {
		let subTotal = null;
		let shipping = 10;
		let tax = 8;
		let currency = ''
		this.props.cartProductList && this.props.cartProductList.map((item) => {
			subTotal = subTotal + item.total;
			currency = item.currency && item.currency.code;
		});
		let orderTotal = subTotal + shipping + tax;
		this.setState({ subTotal, orderTotal, currency });
		let address = {};
		if (this.props.role == 'customer') {
			address = this.props.userInfo.addressInfo;
			this.setState({ address });
		} else {
			this.props.dispatch(fetchLicenseDetailsData(`${this.props.urlLinks.getCompanyInfo.href}?_id=${localStorage.getItem("id")}`)).then((companyInfoData) => {
				console.log("companyInfoData in did mount", companyInfoData);
				address = _get(companyInfoData, 'data.companyInfo.companyAddressInfo', {});
				this.state.address.push(address);
				this.setState({ address: this.state.address });
			});
		}
		this.props.dispatch(fetchBankingDetailsData(`${this.props.urlLinks.getBankingDetailsInfo.href}?_id=${localStorage.getItem("id")}`)).then((bankingData) => {
			console.log("bankingData in did mount", bankingData);
			let paymentTermsArray = _get(bankingData, 'data.paymentTerms.data', [])
			let selectedPaymentTerms = find(paymentTermsArray, { value: _get(bankingData, 'data.bankingDetailInfo.paymentTerms', '') });
			this.setState({ paymentTerm: selectedPaymentTerms });
		});
		document.body.classList.add('checkout-page');
		let options = {
			init: "REQUEST_PAYMENT_CONFIG",
			success: "RECEIVED_PAYMENT_CONFIG",
			error: "RECEIVED_PAYMENT_CONFIG_ERROR"
		}
		this.props.dispatch(postData(`${APPLICATION_BFF_URL}/order/checkout`, null, null, options)).then((paymentConfig) => {
			console.log('paymentConfig', paymentConfig);
			this.setState({ paymentConfig: _get(paymentConfig, "data.paymentVendors", []) });
		}, (error) => {
			console.log(error);
		});
	}
	componentWillUnmount() {
		document.body.classList.remove('checkout-page');
	}
	placeOrder = () => {
		const { userBasicInfo, role } = this.props;
		const { paymentTerm } = this.state;
		let billingAddress = find(this.props.billingAddress, { 'isPrimary': true });
		let shippingAddress = find(this.props.shippingAddress, { 'isPrimary': true });

		// const shippingAddress = this.state.address[this.state.shippingSelctedAddress]
		// let billingAddress = this.state.address[this.state.billingSelectedAddress]
		let items = [];
		if (!this.state.termCondition) {
			this.setState({ showError: 'Please accept terms and conditions.' });
			return;
		}
		if (!paymentTerm.value) {
			this.setState({ showError: 'Please accept payment term.' });
			return;
		}
		if (!shippingAddress) {
			this.props.dispatch(showMessage({ text: 'Please add or select shipping address', isSuccess: false }));
			setTimeout(() => {
				this.props.dispatch(showMessage({ text: '', isSuccess: false }));
			}, 6000);
			return;
		}
		if (!billingAddress) {
			this.props.dispatch(showMessage({ text: 'Please add or select billing address', isSuccess: false }));
			setTimeout(() => {
				this.props.dispatch(showMessage({ text: '', isSuccess: false }));
			}, 6000);
			return;
		}
		this.props.cartProductList.map((item) => {
			let itemObj = {
				id: item.itemId,
				qty: parseInt(item.quantity),
				name: item.itemName,
				pricePerUnit: item.price,
				weight: {
					weightPerUnit: _get(item.weight, 'label', '').split(' ') && parseFloat(_get(item.weight, 'label', '').split(' ')[0]),
					uom: 'g'
					// uom: _get(item.weight, 'label', '').split(' ') && _get(item.weight, 'label', '').split(' ')[1]
				}
			};
			items.push(itemObj);
		})
		let orderData = {
			data: {
				displayId: userBasicInfo.basicInfoData.displayId || '',
				customerName: userBasicInfo.basicInfoData.firstName + " " + userBasicInfo.basicInfoData.lastName,
				customerId: userBasicInfo.id,
				items: items,
				customerType: role == 'customer' ? 'Customer' : 'Business Customer',
				paymentTerms: paymentTerm.value || 'current',
				paymentMethod: "CASH",
				shippingAmt: 10,
				isBillingSameAsShipping: false,
				shippingAddress: {
					address: shippingAddress.address,
					city: shippingAddress.city,
					country: shippingAddress.country,
					state: shippingAddress.state,
					zipCode: shippingAddress.zipCode,
					addressType: false,
					fullName: shippingAddress.fullName,
					contactNumber: shippingAddress.contactNumber
				}
			}
		}
		if (billingAddress) {
			orderData.data.billingAddress = {
				address: billingAddress.address,
				city: billingAddress.city,
				country: billingAddress.country,
				state: billingAddress.state,
				zipCode: billingAddress.zipCode,
				addressType: false,
				fullName: billingAddress.fullName,
				contactNumber: billingAddress.contactNumber
			}
		} else {
			orderData.data.isBillingSameAsShipping = true;
		}
		this.props.dispatch(postCheckoutData(CHECKOUT_URL, orderData)).then((data) => {
			console.log("ORDER PLACED SUCCESSFULLY", data);
			this.props.dispatch(addToCart([]));
			this.props.history.push('/orderSuccess');
		}, (err) => {
			console.log("Error in order place", err);
			this.props.dispatch(showMessage({ text: err.message || 'Something went wrong with payment', isSuccess: false }));
			setTimeout(() => {
				this.props.dispatch(showMessage({ text: '', isSuccess: false }));
			}, 6000);
		});

	}

	makePayment = (paymentObj, paymentMethod) => {
		const { userBasicInfo, role } = this.props;
		const { paymentTerm } = this.state;
		console.log("paymentObj==", paymentObj);
		let billingAddress = find(this.props.billingAddress, { 'isPrimary': true });
		let shippingAddress = find(this.props.shippingAddress, { 'isPrimary': true });

		let items = [];
		if (!this.state.termCondition) {
			this.setState({ showError: 'Please accept terms and conditions.' });
			return;
		}
		if (!paymentTerm.value) {
			this.setState({ showError: 'Please accept payment term.' });
			return;
		}
		if (!shippingAddress) {
			this.props.dispatch(showMessage({ text: 'Please add or select shipping address', isSuccess: false }));
			setTimeout(() => {
				this.props.dispatch(showMessage({ text: '', isSuccess: false }));
			}, 6000);
			return;
		}
		if (!billingAddress) {
			this.props.dispatch(showMessage({ text: 'Please add or select billing address', isSuccess: false }));
			setTimeout(() => {
				this.props.dispatch(showMessage({ text: '', isSuccess: false }));
			}, 6000);
			return;
		}
		this.props.cartProductList.map((item) => {
			let itemObj = {
				id: item.itemId,
				qty: parseInt(item.quantity),
				name: item.itemName,
				pricePerUnit: item.price,
				weight: {
					weightPerUnit: _get(item.weight, 'label', '').split(' ') && parseFloat(_get(item.weight, 'label', '').split(' ')[0]),
					uom: 'g'
					// uom: _get(item.weight, 'label', '').split(' ') && _get(item.weight, 'label', '').split(' ')[1]
				}
			};
			items.push(itemObj);
		})
		let orderData = {
			data: {
				displayId: userBasicInfo.basicInfoData.displayId || '',
				customerName: userBasicInfo.basicInfoData.firstName + " " + userBasicInfo.basicInfoData.lastName,
				customerId: userBasicInfo.id,
				items: items,
				customerType: role == 'customer' ? 'Customer' : 'Business Customer',
				paymentTerms: paymentTerm.value || 'current',
				paymentMethod: paymentMethod || "CASH",
				shippingAmt: 10,
				isBillingSameAsShipping: false,
				opaqueData: paymentObj.opaqueData,
				messages: {
					statusCode: _get(paymentObj.messages, 'message[0].code', ''),
					encryptedCardData: paymentObj.encryptedCardData
				},
				shippingAddress: {
					address: shippingAddress.companyAddress || shippingAddress.address,
					city: shippingAddress.city,
					country: shippingAddress.country,
					state: shippingAddress.state,
					zipCode: shippingAddress.zipCode,
					addressType: false,
					fullName: shippingAddress.fullName,
					contactNumber: shippingAddress.contactNumber
				}
			}
		}
		if (billingAddress) {
			orderData.data.billingAddress = {
				address: billingAddress.address,
				city: billingAddress.city,
				country: billingAddress.country,
				state: billingAddress.state,
				zipCode: billingAddress.zipCode,
				addressType: false,
				fullName: billingAddress.fullName,
				contactNumber: billingAddress.contactNumber
			}
		} else {
			orderData.data.isBillingSameAsShipping = true;
		}
		this.setState({ isPaying: true });
		this.props.dispatch(postCheckoutData(`${APPLICATION_BFF_URL}/order/makepayment`, orderData)).then((data) => {
			console.log("ORDER PLACED SUCCESSFULLY", data);
			this.props.dispatch(addToCart([]));
			this.props.history.push('/orderSuccess');
			this.setState({ isPaying: false });
		}, (err) => {
			console.log("Error in order place", err);
			this.props.dispatch(showMessage({ text: err.message || 'Something went wrong with payment', isSuccess: false }));
			setTimeout(() => {
				this.props.dispatch(showMessage({ text: '', isSuccess: false }));
			}, 6000);
			this.setState({ isPaying: false });
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
	handlePay = () => {
		if (!this.state.termCondition) {
			this.setState({ showError: 'Please accept terms and conditions.', payNow: false });
			return;
		} else {
			this.setState({ payNow: !this.state.payNow })
		}
	}
	paymentMethodUpdate = (val) => {
		this.setState({ paymentMethod: val })
	}

	render() {
		console.log(this.props.isLoading, "isLoading in checkout");
		const { paymentConfig, subTotal, orderTotal, address, toggle, paymentTerm, termCondition, showError, paymentTerms, paymentMethod, currency } = this.state;
		const { companyinfo, userInfo, paymenyWithCheckValues, paymentMethods, bankingData, preferedPaymentMethod } = this.props;
		console.log("companyinfo is here", userInfo);
		return (
			<div className="checkout-container container">
				<div>
					<h2 className="cart-heading">Checkout</h2>
				</div>
				<div className="col-md-9 cart-table-parent">
					<div className="address-order-details">
						<div className="address-container">
							<AddressBook />
						</div>
					</div>
				</div>
				<OrderDetails
					handlePay={this.handlePay}
					paymenyWithCheckValues={paymenyWithCheckValues}
					currency={currency}
					bankingData={bankingData}
					paymentMethod={paymentMethod}
					paymentMethods={paymentMethods}
					paymentMethodUpdate={this.paymentMethodUpdate}
					payNow={this.state.payNow}
					termCondition={termCondition} selectTermCondition={this.selectTermCondition}
					paymentTerm={paymentTerm} paymentTermUpdate={this.paymentTermUpdate}
					collapse={toggle} toggle={this.toggle} placeOrder={this.placeOrder} cartProductList={this.props.cartProductList}
					orderTotal={orderTotal} subTotal={subTotal} showError={showError} paymentConfig={paymentConfig} makePayment={this.makePayment} {...this.props} />

				{this.state.isPaying && <div className="payment-loader">
					<div>
						<div className="pl-text">Payment Processing</div>
						<div className="spinner">
							<div className="rect1"></div>
							<div className="rect2"></div>
							<div className="rect3"></div>
							<div className="rect4"></div>
							<div className="rect5"></div>
						</div>
					</div>
				</div>}
			</div>
		)
	}
}
const mapStateToPtops = (state) => {
	let billingAddress = _get(state, 'AddressBookData.lookUpData.data.billingAddress', []);
	let shippingAddress = _get(state, 'AddressBookData.lookUpData.data.shippingAddress', []);
	let cartProductList = state.productData.cartProductList;
	let companyinfo = state.licenseDetailsData.lookUpData.data;
	let preferedPaymentMethod = _get(state, 'bankDetailsData.lookUpData.data.bankingDetailInfo.preferredPaymentMethods', '')
	let bankingData = _get(state, 'bankDetailsData.lookUpData.data')
	let paymentMethods = _get(state, 'bankDetailsData.lookUpData.data.paymentMethods.data', [])
	let userBasicInfo = state.basicInfodata;
	let userInfo = state.basicInfodata && state.basicInfodata.basicInfoData;
	let role = state.basicInfodata && state.basicInfodata.role;
	let isLoading = state.orderData.isFetching;
	let paymenyWithCheckValues = _get(state, 'form.payWithCard.values')
	let urlLinks = _get(state, 'urlLinks.formSearchData._links', {})
	return { billingAddress, shippingAddress, bankingData, cartProductList, paymenyWithCheckValues, companyinfo, userInfo, role, userBasicInfo, isLoading, urlLinks, paymentMethods, preferedPaymentMethod };
}
export default connect(mapStateToPtops)(CheckOut);