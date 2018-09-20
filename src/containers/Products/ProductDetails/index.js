
import React from 'react';
import { connect } from 'react-redux';
import ProductDetails from './productDetails';
import { addToCart } from '../action/product';
import { findIndex } from 'lodash';
import { showMessage } from '../../../action/common';
import productPlaceholder from '../../../assets/images/product-image-placeholder.jpg';
import { debug } from 'util';
import _get from 'lodash/get';

class ProductDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: {},
      mainImageUrl: {},
      updatedPrice: '',
      selectedWeight: ''
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
    let mainImageUrl = (selectedProduct.images && selectedProduct.images[0]) || { url: productPlaceholder };
    this.setState({ productInfo, mainImageUrl });
    document.body.classList.add('product-details')
  }
  componentWillUnmount() {
    document.body.classList.remove('product-details');
  }
  addToCart() {
    const { cartProductList, dispatch } = this.props;
    let { productInfo, selectedWeight } = this.state;
    productInfo.price = parseFloat(this.state.updatedPrice) || parseFloat(productInfo.basePrice && productInfo.basePrice.price);
    productInfo.weight = selectedWeight || { label: productInfo.basePrice && (productInfo.basePrice.unitCount + ' ' + (productInfo.primaryUomCode && productInfo.primaryUomCode.name)), value: productInfo.basePrice && productInfo.basePrice.price };
    let cartList = Object.assign([], cartProductList);
    if (findIndex(cartList, { itemId: productInfo.itemId }) == -1) {
      cartList.push(productInfo);
      dispatch(addToCart(cartList));
    }
    else {
      let index = findIndex(cartList, { itemId: productInfo.itemId });
      cartList[index].quantity = cartList[index].quantity + productInfo.quantity;
    }
    this.props.dispatch(showMessage({ text: "Product successfully added to cart", isSuccess: true }));
    setTimeout(() => {
      this.props.dispatch(showMessage({ text: "", isSuccess: true }));
    }, 6000);
  }
  buyProduct() {
  }

  weightChanger = (index, item) => {
    console.log("On weight change", index);
    console.log("item", item);
    let selectedWeight = item.priceDetails[index];
    if (selectedWeight) {
      this.setState({ updatedPrice: selectedWeight.price, selectedWeight: {label: selectedWeight.unitCount +' '+((item.primaryUomCode && item.primaryUomCode.name) || 'Grams'), value: selectedWeight.price} });
    }
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
    this.setState({ mainImageUrl: image });
  }
  gotoList = () => {
    this.props.history.push('productList');
  }

  render() {
    const { productInfo, mainImageUrl, selectedWeight, updatedPrice } = this.state;
    const { selectedCategoryType,selectedCategory } = this.props;
    return (
      <div>
        {productInfo && <ProductDetails selectedCategoryType={selectedCategoryType} detail={productInfo}
          mainImageUrl={mainImageUrl} updateMainImage={this.updateMainImage}
          addToCart={() => this.addToCart()} buyProduct={() => this.buyProduct()}
          updateQuantity={this.updateQuantity} gotoList={this.gotoList}
          weightChanger={this.weightChanger}
          updatedPrice={updatedPrice}
          selectedCategory={selectedCategory}
          selectedWeight={selectedWeight} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  let selectedProduct = state.productData.selectedProduct;
  let cartProductList = state.productData.cartProductList;
  let selectedCategory = _get(state,'categoryData.selectedCategory.displayName','')
  let selectedCategoryType = (state.productData && state.productData.selectedCategoryType) || {};
  return { selectedProduct, cartProductList, selectedCategoryType,selectedCategory }
}

export default connect(mapStateToProps)(ProductDetailsContainer)
