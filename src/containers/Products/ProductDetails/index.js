
import React from 'react';
import { connect } from 'react-redux';
import ProductDetails from './productDetails';
import { addToCart } from '../action/product';
import {findIndex} from 'lodash';
import {showMessage} from '../../../action/common';

class ProductDetailsContainer extends React.Component {
  componentDidMount(){
    const {selectedProduct} = this.props;
    if(Object.keys(selectedProduct).length === 0) {
      this.props.history.push('/productList')
    }
  }
  addToCart() {
    const {selectedProduct, cartProductList, dispatch} = this.props;
    let cartList = cartProductList || [];
    if(findIndex(cartList, {itemId: selectedProduct.itemId}) == -1) {
      cartList.push(selectedProduct);
      dispatch(addToCart(cartList));
    }
    this.props.dispatch(showMessage("Product successfully added to cart"));
    setTimeout(()=>{
      this.props.dispatch(showMessage(''));
    },6000);
  }
  buyProduct() {
  }

  render() {
    const {selectedProduct} = this.props;
    return (
      <div>
        {selectedProduct.itemInfo && <ProductDetails detail={selectedProduct} addToCart={() => this.addToCart()} buyProduct={() => this.buyProduct()} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  let selectedProduct = state.productData.selectedProduct;
  let cartProductList = state.productData.cartProductList;
  return {selectedProduct, cartProductList}
}

export default connect(mapStateToProps)(ProductDetailsContainer)
