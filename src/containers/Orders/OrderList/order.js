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
      <div>
      <Card style={{marginTop:'5px'}}>
      <CardContent>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <div>{this.props.id}</div>
      <div>{moment(this.props.placedDate).format('DD MMMM YYYY')}</div>
      <div>{this.props.status}</div>
      <div><Button onClick={()=>this.props.handleTrack(this.props.id)} color='primary' variant='contained'> Track Order</Button></div>
    
      </div>
      <div>{itemLists}</div>
     
      </CardContent>

      </Card>
      </div>
    )
  }
}


