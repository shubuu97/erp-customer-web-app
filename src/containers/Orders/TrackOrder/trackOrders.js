import React from 'react';
import { connect } from 'react-redux';
import TrackOrder from './trackOrder';


export default class TrackOrders extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
     
      }
   
    }
  
  
    render() {
        

       let TrackOrderdata
     if ( Array.isArray(this.props.trackData))
       {
        TrackOrderdata=  this.props.trackData.map((track)=>
        {
            return (<div>
    
                <TrackOrder/>
            </div>)
        })
       }

       else{
        TrackOrderdata = <div>No history yet    </div>
       }
      
  
    return (<div>
        <h2 className="cart-heading">Track Order</h2>
      {TrackOrderdata}
    </div>)
  
} 
    
  }
