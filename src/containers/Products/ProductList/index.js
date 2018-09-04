
import React from 'react';
import { connect } from 'react-redux';
import ProductList from './products';
import SideBar from './sideBar';
import { fetchInventoryItemData, setSelectedProduct } from '../action/product';
import { APPLICATION_BFF_URL } from '../../../constants/urlConstants';
import Dialog from '@material-ui/core/Dialog';
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
    popupItemInfo.mainImageUrl = popupItemInfo.itemInfo.images[0] || { url: productPlaceholder }
    console.log(popupItemInfo);
    this.setState({ openItemInfo: true, popupItemInfo });
  }
  updateMainImage = (image) => {
    let popupItemInfo = this.state.popupItemInfo;
    popupItemInfo.mainImageUrl = image;
    this.setState({ popupItemInfo });
  }
  render() {
    const { products } = this.props;
    const { openItemInfo, popupItemInfo } = this.state;
    const productDataList = products && products.itemsData;
    return (
      <div className="container">
        <ul className="breadcrumb">
          <li>Home</li>
          <li>Indica</li>

        </ul>
        <div className="row">
          <div className="col-sm-3">
            <SideBar />
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
                <div className="productDetails-container container">
                  <div className="detailsContent">
                    <div className="imageContent">
                      <div className="mainImage">
                        <img className="img-responsive" src={popupItemInfo.mainImageUrl.url} alt={popupItemInfo.itemInfo.itemName} />
                      </div>
                      <div className="subImages">
                        {popupItemInfo.itemInfo.images && popupItemInfo.itemInfo.images.map((image, key) => (
                          <img key={key} onClick={() => this.updateMainImage(image)} className="img-responsive" src={image.url || productPlaceholder} alt={popupItemInfo.itemInfo.itemName} />
                        ))}
                      </div>
                    </div>
                    <div className="descriptionContent">
                      <div className="namePriceDiv">
                        <h2 className="p-name">{popupItemInfo.itemInfo.itemName}</h2>
                        <p className="ic text-uppercase">Item Code: <span>{popupItemInfo.itemInfo.itemNo}</span></p>
                        {/* <p className="ic">Unit Count: <span>{popupItemInfo.itemInfo.unitCount}</span></p> */}
                        <h3 className="p-price">$ {popupItemInfo.itemInfo.price}</h3>
                        <div className="d-flex wq-bar">
                          <label>Weight</label>
                          <span>{popupItemInfo.itemInfo.unitCount} Grams</span>
                        </div>
                      </div>
                      <div className="addToCartButtonDiv">
                        <p className="p-desc"><b>Description</b>{popupItemInfo.itemInfo.itemDesc} </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let products = state.productData.inventoryItemList.data
  let isLoading = state.productData.isFetching
  return { products, isLoading }
}

export default connect(mapStateToProps)(ProductsContainer)
