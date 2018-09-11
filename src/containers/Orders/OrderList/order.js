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
  constructor (props) {
    super(props);
    this.state = {
   
    }
 
  }


  render() {
let itemLists =  this.props.saleProducts.map((saleProduct,index)=>
{
  return ([<ItemList
  saleProduct = {saleProduct}
  key={index}
  imgSrc={_get(saleProduct, 'images[0].url', '')}
  name={saleProduct.aliasName || saleProduct.itemName}
  price={_get(saleProduct, 'price.price', '')}
  quantity={_get(saleProduct, 'quantity', '')}
  />,
  
])
})
    return (
      <div className="order-card">
        <div className="order-card-header">
          <div style={{width:'100%'}} className="card-header-left">
            <div className="track-item"><label className="track-status">Order Id</label><span className="track-id">{this.props.id}</span></div>
            <div className="track-item"><label className="track-status">{this.props.status}</label><span className="order-track-date">{moment(this.props.placedDate).format('DD MMMM YYYY')}</span></div>
            <div className="track-item"><label className="track-status">Order Total</label><span className="order-track-date">$123</span> <div className="p-status"><PaymentStatus payment={this.props.payment}/></div></div>
           
           {/* <div className="track-item"><label className="track-status">Logistics Partner</label><span className="track-id">{this.props.shipper}</span></div>
          <div className="track-item"><label className="track-status">Tracking Number</label><span className="track-id">{this.props.trackingNumber}</span></div> */}

          </div>
          <div className="card-header-right">
            {/* <div className="orderStatus">
              <span><img src={greenCheck} /></span>
              <div className="o-status">
                <label>Delivered</label>
                <span>Sun, Apr 8<sup>th</sup> 2018</span>
              </div>
            </div> */}
            <Button color='secondary' variant='contained'>Cancel Order</Button>
    <Button color='secondary' onClick={()=>this.props.handleTrack(this.props.order)} variant='contained'><i className="fa fa-map-marker"></i> &nbsp;Track</Button>
          </div>
        </div>
        <div className="order-card-content">        
          {itemLists}      
        </div>

      </div>
    )
  }
}


