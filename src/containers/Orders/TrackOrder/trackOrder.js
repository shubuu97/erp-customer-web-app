import React from 'react';
import { connect } from 'react-redux';
export default class TrackOrder extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
     
      }
   
    }
  
  
    render() {
  
  
    return (<div>
        <div>
    orderPlaced = "03/09/2018"
    </div>
    <div>
    orderAccepted="03/09/2018"
    </div>
    <div>
    
    orderProcessing="03/09/2018"
    </div>
    <div>
    orderReadyToDispatch="03/09/2018"
    </div>
    <div>
        orderShipped="03/09/2018"
    </div>
    </div>)
  
} 
    
  }