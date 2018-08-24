
import React from 'react';
import { connect } from 'react-redux';
import CartProductList from './ProductsInCart';
import CartTotal from './CartTotal';

class CartContainer extends React.Component {
  productDetails(item) {
    console.log("item is", item);
  }
  render() {
    const productDataList = [{
      id: "1",
      itemCode: "ASD",
      price: 56,
      description: "This is a hot case",
      name: "hot1",
      quantity: 1,
      image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
    },
    {
      id: "2",
      itemCode: "PUO",
      price: 687,
      description: "This is another one",
      name: "TOp2",
      quantity: 1,
      image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
    },
    {
      id: "3",
      itemCode: "UOUO",
      price: 989,
      description: "This is is kijek theresd",
      name: "hot cokkoi",
      quantity: 1,
      image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
    }];
    return (
      <div className="cart-container">
        <CartProductList productsList={productDataList}/>
        <CartTotal />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(CartContainer)
