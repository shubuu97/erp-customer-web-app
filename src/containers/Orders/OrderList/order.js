import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ItemList from './itemList';
import Button from '@material-ui/core/Button';
import moment from 'moment'

 
export default class Order extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
   
    }
 
  }


  render() {
let itemLists =  this.props.saleProducts.map((saleProduct,index)=>
{
  return (<ItemList
  saleProduct = {saleProduct}
  key={index}
  imgSrc={''}
  name={saleProduct.itemName}
  price={saleProduct.Price}
  quantity={saleProduct.quantity}
  />)
})
    return (
      <div className="order-card">
        <div className="order-card-header">
          <div className="card-header-left">
            <div className="track-item"><span className="track-id">{this.props.id}</span></div>
            <div className="track-item"><label className="track-status">{this.props.status}</label><span className="order-track-date">{moment(this.props.placedDate).format('DD MMMM YYYY')}</span></div>
            <div className="track-item"><label className="track-status">Order Total</label><span className="order-track-date">$123</span></div>
          </div>
          <div className="card-header-right">
            <Button color='secondary' variant='contained'><i className="fa fa-map-marker"></i> &nbsp;Track</Button>
          </div>
        </div>
        <div className="order-card-content">        
          {itemLists}      
        </div>

      </div>
    )
  }
}


