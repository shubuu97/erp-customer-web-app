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
  imgSrc={''}
  name={saleProduct.itemName}
  price={saleProduct.Price}
  quantity={saleProduct.quantity}
  />,
  <div className="ot-button">
    <Button color='secondary' variant='contained'>Cancel Order</Button>
    <Button color='secondary' onClick={()=>this.props.handleTrack(this.props.id)} variant='contained'><i className="fa fa-map-marker"></i> &nbsp;Track</Button>
  </div>
])
})
    return (
      <div className="order-card">
        <div className="order-card-header">
          <div className="card-header-left">
            <div className="track-item"><label className="track-status">Order Id</label><span className="track-id">{this.props.id}</span></div>
            <div className="track-item"><label className="track-status">{this.props.status}</label><span className="order-track-date">{moment(this.props.placedDate).format('DD MMMM YYYY')}</span></div>
            <div className="track-item"><label className="track-status">Order Total</label><span className="order-track-date">$123</span> <span className="p-status">Payment Status</span></div>
          </div>
          <div className="card-header-right">
            <div className="orderStatus">
              <span><img src={greenCheck} /></span>
              <div className="o-status">
                <label>Delivered</label>
                <span>Sun, Apr 8<sup>th</sup> 2018</span>
              </div>
            </div>
          </div>
        </div>
        <div className="order-card-content">        
          {itemLists}      
        </div>

      </div>
    )
  }
}


