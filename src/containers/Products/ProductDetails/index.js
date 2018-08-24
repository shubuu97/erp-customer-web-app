
import React from 'react';
import { connect } from 'react-redux';
import ProductDetails from './productDetails';

class ProductDetailsContainer extends React.Component {
  addToCart() {
  }
  buyProduct() {
  }

  render() {
    return (
      <div>
        <ProductDetails addToCart={() => this.addToCart()} buyProduct={() => this.buyProduct()} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ProductDetailsContainer)
