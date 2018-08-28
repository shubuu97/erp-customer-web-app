
import React from 'react';
import { connect } from 'react-redux';
import ProductDetails from './productDetails';

class ProductDetailsContainer extends React.Component {
  componentDidMount(){
    const {selectedProduct} = this.props;
    console.log(selectedProduct);
    if(Object.keys(selectedProduct).length === 0) {
      this.props.history.push('/productList')
    }
  }
  addToCart() {
  }
  buyProduct() {
  }

  render() {
    const {selectedProduct} = this.props;
    console.log(selectedProduct);
    return (
      <div>
        {selectedProduct.itemInfo && <ProductDetails detail={selectedProduct} addToCart={() => this.addToCart()} buyProduct={() => this.buyProduct()} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  let selectedProduct = state.productData.selectedProduct
  return {selectedProduct}
}

export default connect(mapStateToProps)(ProductDetailsContainer)
