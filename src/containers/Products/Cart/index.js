
import React from 'react';
import { connect } from 'react-redux';
import CartProductList from './ProductsInCart';
import CartTotal from './CartTotal';
import {findIndex} from 'lodash';
import Button from '@material-ui/core/Button';
import { addToCart } from '../action/product';
import {showMessage} from '../../../action/common';

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
    this.productDataList = [{
      id: "1",
      itemCode: "ASD",
      price: 56,
      description: "This is a hot case",
      name: "hot1",
      quantity: 1,
      image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
    },
    {
      id: "2",
      itemCode: "PUO",
      price: 687,
      description: "This is another one",
      name: "TOp2",
      quantity: 1,
      image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
    },
    {
      id: "3",
      itemCode: "UOUO",
      price: 989,
      description: "This is is kijek theresd",
      name: "hot cokkoi",
      quantity: 1,
      image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
    }];
    this.updateProductList(this.props.cartProductList);
  }
  removeProductFromCart(productId) {
    const {cartProducts} = this.state;
    let productsTemp = cartProducts;
    let productIndex = findIndex(productsTemp, {itemId:productId});
    productsTemp.splice(productIndex, 1);
    this.setState({cartProducts: productsTemp});
    this.props.dispatch(addToCart(productsTemp));
    this.props.dispatch(showMessage("Product removed from cart"));
    setTimeout(()=>{
      this.props.dispatch(showMessage(''));
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
  }
  backToList() {
    this.props.history.push('/productList');
  }
  goToCheckout() {
    this.props.history.push('/checkout');
  }
  render() {
    const {cartProducts, details} = this.state;
    return (
      <div >
      {cartProducts.length ? 
      <div>
      <div className="cart-container">
        <CartProductList updateProductList={this.updateProductList} productsList={cartProducts} removeProduct={this.removeProductFromCart}/>
        <CartTotal details={details}/>
        </div>
        <div className="addToCartButtonDiv">
            <Button variant="contained" size='large' color="inherit" classes={{ root: 'add-cart-button' }} onClick={this.backToList}>CONTINUE SHOPPING</Button>
            <Button variant="contained" size='large' color="inherit" classes={{ root: 'buy-cart-button' }} onClick={this.goToCheckout}>CHECKOUT</Button>
          </div>
      </div> : 
      <div className="cart-empty">
      <span>There are no product in cart </span>
      <a href="#/productList">Add New</a></div>

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
