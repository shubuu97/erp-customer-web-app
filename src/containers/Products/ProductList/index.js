
import React from 'react';
import { connect } from 'react-redux';
import ProductList from './products';

const productDataList = [{
  id:"1",
  itemCode: "ASD",
  price: 56,
  description: "This is a hot case",
  name: "hot1",
  image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
},
{
  id:"2",
  itemCode: "PUO",
  price: 687,
  description: "This is another one",
  name: "TOp2",
  image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
},
{
  id:"3",
  itemCode: "UOUO",
  price: 989,
  description: "This is is kijek theresd",
  name: "hot cokkoi",
  image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
},
{
  id:"4",
  itemCode: "YHK",
  price: 89,
  description: "Please use as well this is ",
  name: "Kooi",
  image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
},
{
  id:"5",
  itemCode: "ASD",
  price: 56,
  description: "This is a hot case",
  name: "hot1",
  image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
},
{
  id:"6",
  itemCode: "PUO",
  price: 687,
  description: "This is another one",
  name: "TOp2",
  image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
},
{
  id:"7",
  itemCode: "UOUO",
  price: 989,
  description: "This is is kijek theresd",
  name: "hot cokkoi",
  image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
},
{
  id:"8",
  itemCode: "YHK",
  price: 89,
  description: "Please use as well this is ",
  name: "Kooi",
  image: "https://www.coghlans.com/images/products/products-camp-kitchen-thumb.jpg"
}]
class ProductsContainer extends React.Component {
  productDetails(item) {
    console.log("item is",item);
  }
  render() {
    return (
      <div>
        <ProductList productsList={productDataList} onProductClick={(item)=>this.productDetails(item)}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ProductsContainer)
