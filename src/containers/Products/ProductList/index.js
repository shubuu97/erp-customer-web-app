
import React from 'react';
import { connect } from 'react-redux';
import ProductList from './products';
import SideBar from './sideBar';
import { fetchInventoryItemData, setSelectedProduct, setSelectedCategoryType } from '../action/product';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import productPlaceholder from '../../../assets/images/product-image-placeholder.jpg';

class ProductsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      openItemInfo: false,
      popupItemInfo: {},
      mainImageUrl: {}
    }
  }
  productDetails(item) {
    const { dispatch } = this.props;
    dispatch(setSelectedProduct(item));
    this.props.history.push('/productDetail');
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchInventoryItemData(`${APPLICATION_BFF_URL}/inventory/items`));
    document.body.classList.add('product-list');
  }
  componentWillUnmount() {
    document.body.classList.remove('product-list');
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
  }
  render() {
    console.log("Product Data with type", this.props.categoryTypeAndItems);
    const { products, categoryTypeAndItems, selectedCategoryType } = this.props;
    const { openItemInfo, popupItemInfo } = this.state;
    const productDataList = selectedCategoryType.products ||  (categoryTypeAndItems.itemTypes && categoryTypeAndItems.itemTypes[0].products);
    return (
      <div className="container">
        <ul className="breadcrumb">
          <li>Home</li>
          <li>Indica</li>

        </ul>
        <div className="row">
          <div className="col-sm-3">
            <SideBar types={categoryTypeAndItems.itemTypes} selectedType={selectedCategoryType} selectCategoryType={this.selectCategoryType}/>
          </div>
          <div className="col-sm-9">
            <ProductList productsList={productDataList} isLoading={this.props.isLoading} showInfo={this.showInfo} onProductClick={(item) => this.productDetails(item)} />
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
  let selectedCategoryType = state.productData && state.productData.selectedCategoryType;
  return { products, isLoading, customerStatus, categoryTypeAndItems, selectedCategoryType }
}

export default connect(mapStateToProps)(ProductsContainer)
