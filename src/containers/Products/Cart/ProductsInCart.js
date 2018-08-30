import React from 'react';
import ProductRow from './ProductRow';
import {findIndex} from 'lodash';

class ProductsInCart extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      productsData:[]
    }
    this.updateQuantity = this.updateQuantity.bind(this);
  }
  componentDidMount() {
    const {productsList} = this.props;    
    this.setState({productsData:productsList}, ()=>{
    });
  }
  updateQuantity(productId, type) {
    const {productsData} = this.state;
    let productIndex = findIndex(productsData, {itemId:productId});
    let productList = productsData;
    let productLocal = productList[productIndex];
    if(type === 'add') {
      productLocal.quantity = productLocal.quantity ? productLocal.quantity + 1 : 2;
    } else if(type === 'sub') {
      productLocal.quantity = (productLocal.quantity && productLocal.quantity !== 1) ? productLocal.quantity - 1 : 1;
    }
    productLocal.total = productLocal.quantity * productLocal.itemInfo.price;
    productList[productIndex] = productLocal;
    this.setState({productsData: productList});
    this.props.updateProductList(productList);
  }
  render() {
    const {productsList, removeProduct} = this.props;
    const {productsData} = this.state;
    const products = Array.isArray(productsData) && productsData.length &&
    productsData.map(product =>
      <ProductRow
        key={product.itemId}
        code={product.itemInfo.itemNo}
        price={product.itemInfo.price}
        total={product.total}
        description={product.itemInfo.itemShortDesc}
        quantity={product.quantity || 1}
        name={product.itemInfo.itemName}
        image={(product.itemInfo.images && product.itemInfo.images[0].url) || 'https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg'}
        id={product.itemId}
        updateQuantity={this.updateQuantity}
        detail={product}
        remove={removeProduct}
      />);
  return (
    
    <div className="cart-table col-sm-9">
    <div className="cart-table-head">
      <div className="cart-table-head-item first-col">Product Name</div>
      <div className="cart-table-head-item">Price</div>
      <div className="cart-table-head-item">Qty</div>
      <div className="cart-table-head-item">Sub Total</div>
      <div className="cart-table-head-item">Action</div>
    </div>
      
        {products}
      
    </div>
  );
  }
}
export default ProductsInCart;
