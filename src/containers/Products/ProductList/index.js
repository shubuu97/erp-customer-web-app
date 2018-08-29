
import React from 'react';
import { connect } from 'react-redux';
import ProductList from './products';
import { fetchInventoryItemData, setSelectedProduct } from '../action/product';
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants';

class ProductsContainer extends React.Component {
  productDetails(item) {
    const {dispatch} = this.props;
    dispatch(setSelectedProduct(item));
    this.props.history.push('/productDetail');
  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(fetchInventoryItemData(`${APPLICATION_BFF_URL}/inventory/items`));
    document.body.classList.add('product-list');
  }
  componentWillUnmount(){
    document.body.classList.remove('product-list');
  }
  render() {
    const {products} = this.props;
    const productDataList = products && products.itemsData;
    return (
      <div>
        <ProductList productsList={productDataList} isLoading={this.props.isLoading} onProductClick={(item)=>this.productDetails(item)}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let products = state.productData.inventoryItemList.data
  let isLoading= state.productData.isFetching
  return {products,isLoading}
}

export default connect(mapStateToProps)(ProductsContainer)
