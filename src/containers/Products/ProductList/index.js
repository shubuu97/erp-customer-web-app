
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

class ProductsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      openItemInfo: false,
      popupItemInfo: {},
      mainImageUrl: {},
      priceFilterObject: {
        lessThan50: false,
        from50To100: false,
        from100To200: false,
        above200: false 
      },
      filteredData: []
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
  componentWillReceiveProps(nextProps){
    console.log("In product list recieve props",nextProps);
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
    this.props.dispatch(applyFilter(data.products, this.state.priceFilterObject));
  }
  applyPriceRangeFilter = (type, value) => {
    const { categoryTypeAndItems, selectedCategoryType } = this.props;
    const productDataList = (selectedCategoryType && !isEmpty(selectedCategoryType) && selectedCategoryType.products) || (categoryTypeAndItems.itemTypes && categoryTypeAndItems.itemTypes[0] && categoryTypeAndItems.itemTypes[0].products) || [];
    let priceFilterObject = this.state.priceFilterObject;
    priceFilterObject[type] = value;
    this.setState({priceFilterObject: priceFilterObject});
    this.props.dispatch(applyFilter(productDataList, priceFilterObject));
  }
  
  render() {
    const { categoryTypeAndItems, selectedCategoryType, filteredDataSet } = this.props;
    console.log("Product Data with type", selectedCategoryType);
    const { openItemInfo, popupItemInfo, filteredData } = this.state;
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
          <div className="col-sm-3">
            {filteredDataSet.filterObj && <SideBar filteredDataSet={filteredDataSet} types={categoryTypeAndItems.itemTypes} applyPriceRangeFilter={this.applyPriceRangeFilter} selectedType={selectedCategoryType} selectCategoryType={this.selectCategoryType} />}
          </div>
          <div className="col-sm-9">
            <div className="filter-bar">
              <ul className="list-grid">
                <li className="active"><img src={grid} /></li>
                <li><img src={list} /></li>
              </ul>
              <div className="sort-by">
                <span>Sort By</span>
                <select className="form-control">
                  <option>Alphabetically, A-Z</option>
                  <option>Alphabetically, Z-A</option>
                  <option>Numerical</option>
                </select>
              </div>
            </div>
            <div className="product-list-box">
              <div className="product-list-img">
                <img className="img-responsive" src={placehold} />
              </div>
              <div className="product-list-content">
                <div className="pro-head">
                  <h4 className="product-name">Brownie Cookies</h4>
                  <div className="pc-2">
                    <img className="info-icon" src={info}/>
                  </div>
                </div>
                <div className="product-price">$54</div>
                <p class="p-desc">This mostly indica strain is a mix of Afghani and Blackberry strains and has beautiful dark purple buds with orange hairs. Plants will flower at 7-8 weeks and are not particularly high yielders, but the dense, hard nugs have crystals throughout...</p>
                <Button color='primary' variant='contained'>Add to Cart</Button>
              </div>
            </div>
            <div className="product-list-box">
              <div className="product-list-img">
                <img className="img-responsive" src={placehold} />
              </div>
              <div className="product-list-content">
                <div className="pro-head">
                  <h4 className="product-name">Brownie Cookies</h4>
                  <div className="pc-2">
                    <img className="info-icon" src={info}/>
                  </div>
                </div>
                <div className="product-price">$54</div>
                <p class="p-desc">This mostly indica strain is a mix of Afghani and Blackberry strains and has beautiful dark purple buds with orange hairs. Plants will flower at 7-8 weeks and are not particularly high yielders, but the dense, hard nugs have crystals throughout...</p>
                <Button color='primary' variant='contained'>Add to Cart</Button>
              </div>
            </div>
            {filteredDataSet.filteredData && filteredDataSet.filteredData.length ? <ProductList productsList={filteredDataSet.filteredData} isLoading={this.props.isLoading} showInfo={this.showInfo} onProductClick={(item) => this.productDetails(item)} /> : null}
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
                <h2 className="modal-title">Product Details</h2>
                <div className="productDetails-container">
                  <div className="detailsContent">
                    <div className="imageContent">
                      <div className="mainImage">
                        <img className="img-responsive" src={popupItemInfo.mainImageUrl.url} alt={popupItemInfo.itemName} />
                      </div>
                      <div className="subImages">
                        {popupItemInfo.images && popupItemInfo.images.map((image, key) => (
                          <img key={key} onClick={() => this.updateMainImage(image)} className="img-responsive" src={image.url || productPlaceholder} alt={popupItemInfo.itemName} />
                        ))}
                      </div>
                    </div>
                    <div className="descriptionContent">
                      <div className="namePriceDiv">
                        <h2 className="p-name">{popupItemInfo.itemName}</h2>
                        <p className="ic text-uppercase">Item Code: <span>{popupItemInfo.itemNo}</span></p>
                        {/* <p className="ic">Unit Count: <span>{popupItemInfo.unitCount}</span></p> */}
                        <h3 className="p-price">$ {popupItemInfo.price}</h3>
                      </div>
                      <div className="addToCartButtonDiv">
                        <p className="p-desc"><b>Description</b>{popupItemInfo.itemDesc} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
              <DialogActions className="m-footer">
                <Button variant="contained" classes={{ root: 'modal-close' }} onClick={this.handleClose} color="secondary"></Button>
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
  let customerStatus = state.basicInfodata && state.basicInfodata.customerStatus;
  let categoryTypeAndItems = state.categoryTypeAndItems && state.categoryTypeAndItems.categoryTypeAndItems;
  let selectedCategoryType = (state.productData && state.productData.selectedCategoryType) || {};
  let filteredDataSet = (state.productData && state.productData.filteredDataSet) || {};
  return { products, isLoading, customerStatus, categoryTypeAndItems, selectedCategoryType, filteredDataSet }
}

export default connect(mapStateToProps)(ProductsContainer)
