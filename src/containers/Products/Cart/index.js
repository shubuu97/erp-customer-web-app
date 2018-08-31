
import React from 'react';
import { connect } from 'react-redux';
import CartProductList from './ProductsInCart';
import CartTotal from './CartTotal';
import {findIndex} from 'lodash';
import { addToCart } from '../action/product';
import {showMessage} from '../../../action/common';
import Button from '@material-ui/core/Button';

class CartContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      cartProducts: [],
      details:{}
    }
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
    this.updateProductList = this.updateProductList.bind(this);
    this.backToList = this.backToList.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
  }
  componentDidMount() {
    this.props.cartProductList && this.props.cartProductList.map((item)=>{
      item.quantity = item.quantity || 1;
      item.total = item.quantity * item.itemInfo.price;
    })
    this.updateProductList(this.props.cartProductList);
    document.body.classList.add('cart-page')
  }
  componentWillUnmount(){
    document.body.classList.remove('cart-page');
  }
  
  removeProductFromCart(productId) {
    const {cartProducts} = this.state;
    let productsTemp = cartProducts;
    let productIndex = findIndex(productsTemp, {itemId:productId});
    productsTemp.splice(productIndex, 1);
    this.setState({cartProducts: productsTemp});
    this.props.dispatch(addToCart(productsTemp));
    this.props.dispatch(showMessage({text: "Product removed from cart", isSuccess: true}));
    setTimeout(()=>{
      this.props.dispatch(showMessage({text: "", isSuccess: true}));
    },6000);
    this.updateProductList(productsTemp);
  }
  updateProductList(list) {
    let subTotal = 0;
    list.map((item)=>{
      subTotal = subTotal + (item.itemInfo.price * (item.quantity || 1));
    })
    let shipping = 7;
    let tax = 10;
    let total = subTotal + shipping + tax;
    this.setState({cartProducts: list, details:{subTotal, shipping, tax, total}});
    this.props.dispatch(addToCart(list));
  }
  backToList() {
    this.props.history.push('/productList');
  }
  goToCheckout() {
    this.props.history.push('/checkout');
  }
  clearCart = () => {
    this.setState({cartProducts: []});
    this.props.dispatch(addToCart([]));
    this.props.dispatch(showMessage({text: "Cart cleared successfully", isSuccess: true}));
    setTimeout(()=>{
      this.props.dispatch(showMessage({text: "", isSuccess: true}));
    },6000);
  }
  render() {
    const {cartProducts, details} = this.state;
    return (
      <div className="container">
      {cartProducts.length ? 
      <div>
        <h2 className="cart-heading">Shopping Cart</h2>
      <div className="cart-container">
      
        <CartProductList updateProductList={this.updateProductList} backToList={this.backToList} clearCart={this.clearCart} productsList={cartProducts} removeProduct={this.removeProductFromCart}/>
        <CartTotal goToCheckout={this.goToCheckout} details={details}/>
        </div>
        
      </div> : 
      <div className="cart-empty">
        <span>There are no product in cart </span>
        <Button variant="contained" size='large' color="primary" onClick={this.backToList}>Add Product</Button>
      </div>

    }
      </div>
    )
  }
}

function mapStateToProps(state) {
  let cartProductList = state.productData.cartProductList;
  return {cartProductList};
}

export default connect(mapStateToProps)(CartContainer)
