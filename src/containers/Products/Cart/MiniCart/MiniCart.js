import React from 'react';
import ProductRow from './MiniProductRow';
import {findIndex} from 'lodash';
import Button from '@material-ui/core/Button';

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
  updateQuantity(productId, quantity) {
    
    const {productsData} = this.state;
    let productIndex = findIndex(productsData, {itemId:productId});
    let productList = productsData;
    let productLocal = productList[productIndex];
    
      productLocal.quantity = quantity
   
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
        quantity={product.quantity || ''}
        name={product.itemInfo.itemName}
        image={(product.itemInfo.images && product.itemInfo.images[0].url) || 'https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg'}
        id={product.itemId}
        updateQuantity={this.updateQuantity}
        detail={product}
        remove={removeProduct}
      />);
  return (
    <div className="col-sm-9 cart-table-parent">
    <div className="cart-table">
      
        {products}
      
    </div>
    <div className="addToCartButtonDiv">
      <Button variant="contained" size='large' color="secondary" classes={{ root: 'add-cart-button' }} onClick={this.props.backToList}>View and Edit Cart</Button>
    </div>
    </div>
  );
  }
}
export default ProductsInCart;
