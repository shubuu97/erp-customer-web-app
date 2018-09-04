
import React from 'react';
import { connect } from 'react-redux';
import ProductDetails from './productDetails';
import { addToCart } from '../action/product';
import { findIndex } from 'lodash';
import { showMessage } from '../../../action/common';
import productPlaceholder from '../../../assets/images/product-image-placeholder.jpg';

class ProductDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      mainImageUrl: {}
    }
  }
  componentDidMount() {
    const { selectedProduct } = this.props;
    let productInfo = selectedProduct;
    if (Object.keys(selectedProduct).length === 0) {
      this.props.history.push('/productList');
      return;
    }
    productInfo.quantity = 1;
    let mainImageUrl = (selectedProduct.images && selectedProduct.images[0]) || {url:productPlaceholder};
    this.setState({ productInfo, mainImageUrl });
    document.body.classList.add('product-details')
  }
  componentWillUnmount() {
    document.body.classList.remove('product-details');
  }
  addToCart() {
    const { cartProductList, dispatch } = this.props;
    const { productInfo } = this.state;
    let cartList = cartProductList || [];
    if (findIndex(cartList, { itemId: productInfo.itemId }) == -1) {
      cartList.push(productInfo);
      dispatch(addToCart(cartList));
    }
    this.props.dispatch(showMessage({ text: "Product successfully added to cart", isSuccess: true }));
    setTimeout(() => {
      this.props.dispatch(showMessage({ text: "", isSuccess: true }));
    }, 6000);
  }
  buyProduct() {
  }
  updateQuantity = (type) => {
    const { productInfo } = this.state;
    let productLocal = productInfo;
    if (type === 'add') {
      productLocal.quantity = productLocal.quantity ? productLocal.quantity + 1 : 2;
    } else if (type === 'sub') {
      productLocal.quantity = (productLocal.quantity && productLocal.quantity !== 1) ? productLocal.quantity - 1 : 1;
    }
    this.setState({ productInfo: productLocal });
  }
  updateMainImage = (image) => {
    this.setState({mainImageUrl: image});
  }

  render() {
    const { productInfo, mainImageUrl } = this.state;
    return (
      <div>
        {productInfo && <ProductDetails detail={productInfo} mainImageUrl={mainImageUrl} updateMainImage = {this.updateMainImage} addToCart={() => this.addToCart()} buyProduct={() => this.buyProduct()} updateQuantity={this.updateQuantity} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  let selectedProduct = state.productData.selectedProduct;
  let cartProductList = state.productData.cartProductList;
  return { selectedProduct, cartProductList }
}

export default connect(mapStateToProps)(ProductDetailsContainer)
