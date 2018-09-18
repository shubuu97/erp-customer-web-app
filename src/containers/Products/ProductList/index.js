
import React from 'react';
import { connect } from 'react-redux';
import ProductList from './products';
import SideBar from './sideBar';
import { fetchInventoryItemData, setSelectedProduct, setSelectedCategoryType, applyFilter } from '../action/product';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import productPlaceholder from '../../../assets/images/product-image-placeholder.jpg';
import list from '../../../assets/images/list.png';
import grid from '../../../assets/images/grid.png';
import placehold from '../../../assets/images/waste-plant.png';
import info from '../../../assets/images/info.png';
import { isEmpty } from 'lodash';
import { addToCart } from '../action/product';
import { findIndex } from 'lodash';
import { showMessage } from '../../../action/common';
import _orderBy from 'lodash/orderBy'

class ProductsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      openItemInfo: false,
      popupItemInfo: {},
      mainImageUrl: {},
      priceFilterObject: {},
      filteredData: [],
      isGridView: true,
      sortingKey:'numerical'
    }
  }
  productDetails(item) {
    const { dispatch } = this.props;
    dispatch(setSelectedProduct(item));
    this.props.history.push('/productDetail');
  }
  componentDidMount() {
    document.body.classList.add('product-list');
  }
  componentWillUnmount() {
    document.body.classList.remove('product-list');
  }
  componentWillReceiveProps(nextProps) {
    console.log("In product list recieve props", nextProps);
  }
  handleClose = () => {
    this.setState({ openItemInfo: false });
  }
  showInfo = (item) => {
    let popupItemInfo = item;
    popupItemInfo.mainImageUrl = (popupItemInfo.images && popupItemInfo.images[0]) || { url: productPlaceholder }
    console.log(popupItemInfo);
    this.setState({ openItemInfo: true, popupItemInfo });
  }
  updateMainImage = (image) => {
    let popupItemInfo = this.state.popupItemInfo;
    popupItemInfo.mainImageUrl = image;
    this.setState({ popupItemInfo });
  }
  selectCategoryType = (data) => {
    console.log("Show selected type", data);
    this.props.dispatch(setSelectedCategoryType(data));
    this.state.priceFilterObject = {}
    this.props.dispatch(applyFilter(data.products, this.state.priceFilterObject,this.state.sortingKey));
    this.setState({priceFilterObject:this.state.priceFilterObject})
  }
  applyPriceRangeFilter = (type, value) => {
    const { categoryTypeAndItems, selectedCategoryType } = this.props;
    const productDataList = (selectedCategoryType && !isEmpty(selectedCategoryType) && selectedCategoryType.products) || (categoryTypeAndItems.itemTypes && categoryTypeAndItems.itemTypes[0] && categoryTypeAndItems.itemTypes[0].products) || [];
    let priceFilterObject = this.state.priceFilterObject;
    priceFilterObject[type] = value;
    this.setState({ priceFilterObject: priceFilterObject });
    this.props.dispatch(applyFilter(productDataList, priceFilterObject,this.state.sortingKey));
  }
  changeView() {
    this.setState({ isGridView: !this.state.isGridView });
  }
  addToCart = (productInfo) => {
    const { cartProductList, dispatch } = this.props;
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
  handleSorting=(e)=>
  {
    const { categoryTypeAndItems, selectedCategoryType } = this.props;
    const productDataList = (selectedCategoryType && !isEmpty(selectedCategoryType) && selectedCategoryType.products) || (categoryTypeAndItems.itemTypes && categoryTypeAndItems.itemTypes[0] && categoryTypeAndItems.itemTypes[0].products) || [];


  if(e.target.value=='a-z')
  {

    this.props.dispatch(applyFilter(productDataList, this.state.priceFilterObject,'a-z'));
    this.setState({sortingKey:'a-z'});
  }
  if(e.target.value=="z-a")
  {
    this.props.dispatch(applyFilter(productDataList, this.state.priceFilterObject,'z-a'));
    this.setState({sortingKey:'z-a'});

  }
  if(e.target.value=="numerical")
  {
    this.props.dispatch(applyFilter(productDataList, this.state.priceFilterObject,'numerical'));
    this.setState({sortingKey:'numerical'});

  }
  }
  render() {
    const { categoryTypeAndItems, selectedCategoryType, filteredDataSet } = this.props;
    console.log("Product Data with type", selectedCategoryType);
    const { openItemInfo, popupItemInfo, filteredData, isGridView } = this.state;
    console.log("filteredDataSet==", filteredDataSet);
    const NoProduct = () => (
      <div className="no-product-text">
        There are no product in this category
      </div>)
    return (
      <div className="container">
        <ul className="breadcrumb">
          <li>Home</li>
          {selectedCategoryType.itemType && <li>{selectedCategoryType.itemType || ''}</li>}
        </ul>
        <div className="row">
          <div className="col-md-3 col-sm-4">
            {filteredDataSet.filterObj && <SideBar filteredDataSet={filteredDataSet} types={categoryTypeAndItems.itemTypes} applyPriceRangeFilter={this.applyPriceRangeFilter} selectedType={selectedCategoryType} selectCategoryType={this.selectCategoryType} />}
          </div>
          <div className="col-md-9 col-sm-8">
            <div className="filter-bar">
              <ul className="list-grid hidden-xs">
                <li className={isGridView ? `active` : ''} onClick={() => this.changeView()}><img src={grid} /></li>
                <li className={!isGridView ? `active` : ''} onClick={() => this.changeView()}><img src={list} /></li>
              </ul>
              <div className="sort-by">
                <span>Sort By</span>
                <select value={this.state.sortingKey} className="form-control" onChange={this.handleSorting}>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="numerical">Numerical</option>
                </select>
              </div>
            </div>
            {filteredDataSet.filteredData && filteredDataSet.filteredData.length ? <ProductList productsList={filteredDataSet.filteredData}
              isLoading={this.props.isLoading} showInfo={this.showInfo}
              onProductClick={(item) => this.productDetails(item)} isGridView={isGridView} addToCart={this.addToCart} /> : null}
            {filteredDataSet.filteredData && !filteredDataSet.filteredData.length &&
              <NoProduct />
            }
            {openItemInfo && <Dialog
              open={openItemInfo}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              className="dialogbox-ui"
            >
              <DialogContent>
                <h2 className="modal-title">Product Details <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button></h2>
                <div className="productDetails-container">
                  <div className="detailsContent">
                    <div className="imageContent">
                      <div className="mainImage">
                        <img className="img-responsive" src={popupItemInfo.mainImageUrl.url} alt={popupItemInfo.itemName} />
                      </div>
                      <div className="subImages">
                        {popupItemInfo.images && popupItemInfo.images.map((image, key) => (
                          <img key={key} onClick={() => this.updateMainImage(image)} className={`img-responsive ${popupItemInfo.mainImageUrl.url == image.url ? 'active': ''}`} src={image.url || productPlaceholder} alt={popupItemInfo.itemName} />
                        ))}
                      </div>
                    </div>
                    <div className="descriptionContent">
                      <div className="namePriceDiv">
                        <h2 className="p-name">{popupItemInfo.aliasName || popupItemInfo.itemName}</h2>
                        <p className="ic text-uppercase">Item Code: <span>{popupItemInfo.itemNo}</span></p>
                        {/* <p className="ic">Unit Count: <span>{popupItemInfo.unitCount}</span></p> */}
                        <div className="price-text-css">
                          <h3 className="p-price">$ {popupItemInfo.price}</h3><p>Per Quantity</p>
                        </div>
                      </div>
                      <div className="addToCartButtonDiv">
                        <p className="p-desc"><b>Description</b>{popupItemInfo.itemDesc} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
              <DialogActions className="m-footer">

              </DialogActions>
            </Dialog>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let products = state.productData.inventoryItemList.data
  let isLoading = state.productData.isFetching;
  let cartProductList = state.productData.cartProductList;
  let customerStatus = state.basicInfodata && state.basicInfodata.customerStatus;
  let categoryTypeAndItems = state.categoryTypeAndItems && state.categoryTypeAndItems.categoryTypeAndItems;
  let selectedCategoryType = (state.productData && state.productData.selectedCategoryType) || {};
  let filteredDataSet = (state.productData && state.productData.filteredDataSet) || {};
  return { products, isLoading, customerStatus, categoryTypeAndItems, selectedCategoryType, filteredDataSet, cartProductList }
}

export default connect(mapStateToProps)(ProductsContainer)
