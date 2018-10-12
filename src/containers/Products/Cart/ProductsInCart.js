import React from 'react';
import ProductRow from './ProductRow';
import {findIndex} from 'lodash';
import Button from '@material-ui/core/Button';
import _get from 'lodash/get';
import {showMessage} from '../../../action/common';
import productPlaceholder from './../../../assets/images/product-image-placeholder.jpg';



class ProductsInCart extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      productsData:[],
    }
    this.updateQuantity = this.updateQuantity.bind(this);
  }
  componentDidMount() {
    const {productsList} = this.props;    
    this.setState({productsData:productsList});
  }
  updateQuantity(productId, type) {
    const {productsData} = this.state;
    let productIndex = findIndex(productsData, {itemId:productId});
    let productList = productsData;
    let productLocal = productList[productIndex];
    if(type === 'add') {
      productLocal.quantity = productLocal.quantity ? productLocal.quantity + 1 : 2;
    } else if(type === 'sub') {
      if(productLocal.minQyt<productLocal.quantity)
      productLocal.quantity = (productLocal.quantity && productLocal.quantity !== 1) ? productLocal.quantity - 1 : 1;
    else
    {
      this.props.dispatch(showMessage({ text: `Minimum Quantity to buy this product is ${productLocal.minimumQuantityToBuy}${((productLocal.primaryUomCode && productLocal.primaryUomCode.name) || 'Grams')}`, isSuccess: true }));
    setTimeout(() => {
      this.props.dispatch(showMessage({ text: "", isSuccess: true }));
    }, 6000);
    }
    }
    productLocal.total = productLocal.quantity * productLocal.price;
    productList[productIndex] = productLocal;
    this.setState({productsData: productList});
    this.props.updateProductList(productList);
  }
  weightChanger=(index, item, productId)=>
  {
    let selectedWeight = item.priceDetails[index];
    if(selectedWeight) {
      const {productsData} = this.state;
      let productIndex = findIndex(productsData, {itemId:productId});
      let productList = productsData;
      let productLocal = productList[productIndex];
      productLocal.weight = {label: selectedWeight.unitCount +' '+((item.primaryUomCode && item.primaryUomCode.name) || 'Grams'), value: selectedWeight.price};
      productLocal.price = selectedWeight.price;
      let minQyt = parseInt(productLocal.minimumQuantityToBuy/selectedWeight.unitCount) + (productLocal.minimumQuantityToBuy % selectedWeight.unitCount == 0 ? 0 : 1);
      productLocal.quantity = minQyt;
      productLocal.minQyt = minQyt;
      productLocal.total = productLocal.quantity * productLocal.price;
      productList[productIndex] = productLocal;
      this.setState({productsData: productList});
      this.props.updateProductList(productList);
    }
  }
  render() {
    const {productsList, removeProduct} = this.props;
    const {productsData, selectedWeight} = this.state;
    const products = Array.isArray(productsData) && productsData.length &&
    productsData.map(product =>
      <ProductRow
        key={product.itemId}
        code={product.itemNo}
        price={product.price}
        currency={product.currency && product.currency.code || ''}
        weight={product.weight}
        total={product.total}
        description={product.itemShortDesc}
        quantity={product.quantity || 1}
        name={product.aliasName || product.itemName}
        image={_get(product.images && product.images.find(img => img.isDefault ), 'url',productPlaceholder)}
        id={product.itemId}
        updateQuantity={this.updateQuantity}
        weightChanger={this.weightChanger}
        detail={product}
        remove={removeProduct}
      />);
  return (
    <div className="col-md-9 cart-table-parent">
    <div className="cart-table">
    <div className="cart-table-head">
      <div className="cart-table-head-item first-col">Product Name</div>
      <div className="cart-table-head-item">Weight</div>
      <div className="cart-table-head-item">Price</div>
      <div className="cart-table-head-item">Quantity</div>
      <div className="cart-table-head-item">Sub Total</div>
      
    </div>
      
        {products}
      
    </div>
    <div className="addToCartButtonDiv">
      <Button variant="contained" size='large' color="secondary" classes={{ root: 'small-btn' }} onClick={this.props.backToList}>Continue Shopping</Button>
      <Button variant="contained" size='large' color="secondary" classes={{ root: 'small-btn' }} onClick={this.props.clearCart}>Clear Cart</Button>
    </div>
    </div>
  );
  }
}
export default ProductsInCart;
