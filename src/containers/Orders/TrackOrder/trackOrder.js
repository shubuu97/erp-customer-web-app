import React from 'react';
import { connect } from 'react-redux';
import placedOn from './../../../assets/images/to1.png';
import confirmationStatus from './../../../assets/images/to2.png';
import processing from './../../../assets/images/to3.png';
import dispatch from './../../../assets/images/to4.png';
import shipped from './../../../assets/images/to5.png';
import transit from './../../../assets/images/to6.png';
import deleivered from './../../../assets/images/to7.png';
export default class TrackOrders extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
     
      }
   
    }
  
  
    render() {
  
return (<div className="trackorder-container">
        <div className="track-order-detail">
            <div className="track-d trackorder-id">
                <label>Order Id :</label>
                <span>#407-8545827-2950766</span>
            </div>
            <div className="track-d trackorder-num">
                <label>Tracking Number :</label>
                <span>#407-8545827-2950766</span>
            </div>
            <div className="track-order-desc">
                <p>You can track your order from <a href="">Fedex</a> website with your tracking number. Or you can also use the <a href="">17Track</a> website for tracking.</p>
            </div>
        </div>
        <div className="to-content">
            <div className="to-content-box">
                <div className="to-content-row">
                    <div className="to-content-img">
                        <img src={placedOn} />
                    </div>
                    <div className="to-border"></div>
                    <div className="to-status">
                        <label>Placed On</label>
                        <span>15 Oct, 2018</span>
                    </div>
                </div>
                <div className="to-content-row">
                    <div className="to-content-img">
                        <img src={confirmationStatus} />
                    </div>
                    <div className="to-border"></div>
                    <div className="to-status">
                        <label>Confirmation Status</label>
                        <span>Approved</span>
                    </div>
                </div>
                <div className="to-content-row">
                    <div className="to-content-img">
                        <img src={processing} />
                    </div>
                    <div className="to-border"></div>
                    <div className="to-status">
                        <label>Processing</label>
                        <span>15 Oct, 2018</span>
                    </div>
                </div>
                <div className="to-content-row">
                    <div className="to-content-img">
                        <img src={dispatch} />
                    </div>
                    <div className="to-border"></div>
                    <div className="to-status">
                        <label>Ready to Dispatch</label>
                        <span>16 Oct, 2018</span>
                    </div>
                </div>
                <div className="to-content-row">
                    <div className="to-content-img">
                        <img src={shipped} />
                    </div>
                    <div className="to-border"></div>
                    <div className="to-status">
                        <label>Shipped</label>
                        <span>17 Oct, 2018</span>
                    </div>
                </div>
                <div className="to-content-row">
                    <div className="to-content-img">
                        <img src={transit} />
                    </div>
                    <div className="to-border"></div>
                    <div className="to-status">
                        <label>In Transit</label>
                        <span>18 Oct, 2018</span>
                    </div>
                </div>
                <div className="to-content-row">
                    <div className="to-content-img">
                        <img src={deleivered} />
                    </div>
                    <div className="to-border"></div>
                    <div className="to-status">
                        <label>Deleivered</label>
                        <span>19 Oct, 2018</span>
                    </div>
                </div>
            </div>
            
        </div>        
    </div>)
  
} 
    
  }
