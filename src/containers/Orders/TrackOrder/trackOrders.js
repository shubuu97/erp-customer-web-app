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
  

       let TrackOrderdata =  this.props.trackData.map((track)=>
    {
        return (<div>

            <TrackOrder/>
        </div>)
    })
  
    return (<div>
      {TrackOrderdata}
    </div>)
  
} 
    
  }
