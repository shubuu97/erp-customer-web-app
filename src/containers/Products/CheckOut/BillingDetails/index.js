import React from 'react';
import Button from '@material-ui/core/Button';

export default (props)=>
{
   return(<div>
    <h2 className="cart-heading"> Billing Details</h2>
      
      <Button color='primary' variant='contained'>Add New</Button>
      <Button variant='contained'>Edit</Button>
    </div>)
}