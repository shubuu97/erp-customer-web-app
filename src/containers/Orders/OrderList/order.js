import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ItemList from './itemList';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import greenCheck from './../../../assets/images/green-check.png';
import mapicon from './../../../assets/images/map-marker.png';
import PaymentStatus from './paymentStatus';
import _get from 'lodash/get';


export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const orderedProduct = (productList) => (
      productList.map((saleProduct, index) => {
        return ([<ItemList
          saleProduct={saleProduct}
          key={index}
          imgSrc={_get(saleProduct, 'images[0].url', '')}
          name={saleProduct.aliasName || saleProduct.itemName}
          currency={_get(saleProduct, 'price.currencyCode', '')}
          weight={_get(saleProduct, 'weight.weight', '')}
          weightUom={_get(saleProduct, 'weight.uom', '')}
          price={_get(saleProduct, 'price.price', '')}
          quantity={_get(saleProduct, 'quantity', '')}
          goToProductDetails={this.props.goToProductDetails}
        />
        ])
      })
    );

    const salesProductBox = (packagedData, list) => (
      packagedData.map((item, index) => {
        return (<div className="order-card-content">
          <div className="order-box">
            <div className="order-left">
              {orderedProduct(list ? list : item.products)}
            </div>
            {!list && <div className="order-right">
              <div>
                <div className="package-id">Package Id : <label>{item.displayId}</label></div>
                {item.trackingNumber && <div className="track-order-desc">Logistics Partner: <a href={_get(item, 'shipper.url', '')} target="_blank">{_get(item, 'shipper.name', '')}</a></div>}
                {item.trackingNumber && <div className="tracking-number">Tracking Number: <label>#{item.trackingNumber}</label></div>}
                <div className="package-id">Package Status : <label>{item.status}</label></div>
              </div>
            </div>}
          </div>
        </div>)
      })
    )
    return (
      <div className="order-card">
        <div className="order-card-header">
          <div style={{ width: '100%' }} className="card-header-left">
            <div className="track-item"><label className="track-status">Order Id</label><span className="track-id">{this.props.id}</span></div>
            <div className="track-item"><label className="track-status">{this.props.status}</label><span className="order-track-date">{moment(this.props.placedDate).format('DD MMMM YYYY')}</span></div>
            <div className="track-item"><label className="track-status">Order Total</label><span className="order-track-date">USD {this.props.orderTotal}</span> <div className="p-status"><PaymentStatus payment={this.props.payment} order={this.props.order} orderTotal={this.props.orderTotal} /></div></div>
          </div>
          <div className="card-header-right">
            {/* <div className="orderStatus">
              <span><img src={greenCheck} /></span>
              <div className="o-status">
                <label>Delivered</label>
                <span>Sun, Apr 8<sup>th</sup> 2018</span>
              </div>
            </div> */}
            {this.props.status == 'CANCELLED' ? null : null}
            {this.props.status == 'INCOMING' ? <Button color='secondary' variant='contained' onClick={() => this.props.onCancelOrder(this.props.order)}>Cancel Order</Button> : null}
            {(this.props.status != 'INCOMING' && this.props.status != 'REJECTED' && this.props.status != 'CANCELLED') ? <Button color='secondary' onClick={() => this.props.handleTrack(this.props.order)} variant='contained'><i className="fa fa-map-marker"></i> &nbsp;History Details</Button> : null}
          </div>
        </div>
        <div >
        {salesProductBox(this.props.packages)}
        {salesProductBox([0], this.props.saleProducts)}
        </div>

      </div>
    )
  }
}


