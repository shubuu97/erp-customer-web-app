import React from 'react';
import ProductRow from './MiniProductRow';
import {findIndex} from 'lodash';
import Button from '@material-ui/core/Button';
import _get from 'lodash/get';
import {showMessage} from '../../../../action/common';



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
      if(productLocal.minQyt<productLocal.quantity)
      productLocal.quantity = (productLocal.quantity && productLocal.quantity !== 1) ? productLocal.quantity - 1 : 1;
    else
    {
      this.props.dispatch(showMessage({ text: "Can not buy less than minimum quantity", isSuccess: true }));
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
  render() {
    const {productsList, removeProduct} = this.props;
    const {productsData} = this.state;
    const products = Array.isArray(productsData) && productsData.length &&
    productsData.map(product =>
      <ProductRow
        key={product.itemId}
        code={product.itemNo}
        price={product.price}
        weight={product.weight && product.weight.label || ''}
        total={product.total}
        description={product.itemShortDesc}
        quantity={product.quantity || ''}
        name={product.aliasName || product.itemName}
        image={_get(product,'images[0].url','https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg')}
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
