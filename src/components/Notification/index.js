import React from "react";
import checkCircle from "./../../assets/images/check.png";
import comment from "./../../assets/images/comment.png";
import gift from "./../../assets/images/gift.png";
import crossCircle from "./../../assets/images/cross.png";

const notification = (props) => {
    
    return (
        <div>
            <div className="day-notification">                
                <h5>Today</h5>
                <ul className="day-notify-ul">
                    <li>
                        <span><img src={checkCircle} /></span>
                        <p>Your order has been approved.</p>
                    </li>
                    <li>
                        <span><img src={comment} /></span>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </li>
                    <li>
                        <span><img src={comment} /></span>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                    </li>                    
                    <li>
                        <span><img src={gift} /></span>
                        <p>Get Extra 10% Discount on your purchase!.</p>
                    </li>
                </ul>                       
            </div>

            <div className="day-notification">                
                <h5>Yesterday</h5>
                <ul className="day-notify-ul">
                    <li>
                    <span><img src={checkCircle} /></span>
                        <p>Your order has been approved.</p>
                    </li>
                    <li>
                        <span><img src={comment} /></span>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </li>                
                </ul>                       
            </div>

            <div className="day-notification">                
                <h5>03 Oct, 2018</h5>
                <ul className="day-notify-ul">
                    <li>
                        <span><img src={crossCircle} /></span>
                        <p>Your order has been declined.</p>
                    </li>
                    <li>
                        <span><img src={comment} /></span>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </li>                
                    <li>
                        <span><img src={comment} /></span>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                    </li>
                </ul>                       
            </div>
        </div>
    )
}

export default notification;