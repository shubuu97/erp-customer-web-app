import React from 'react';
import ProductRow from './ProductRow';

class ProductsInCart extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const {productsList, onProductClick} = this.props;
    const productsData = Array.isArray(productsList) && productsList.length &&
    productsList.map(product =>
      <ProductRow
        key={product.id}
        code={product.itemCode}
        price={product.price}
        description={product.description}
        name={product.name}
        image={product.image}
        id={product.id}
        click={onProductClick}
        detail={product}
      />);
  return (
    <div className="cart-table">
    <div className="cart-table-head">
      <div>PRODUCT</div>
      <div>PRICE</div>
      <div>QUANTITY
      <div>TOTAL</div>
      </div>
    </div>
      <div className="cart-table-body">
        {productsData}
      </div >
    </div>
  );
  }
}
export default ProductsInCart;
