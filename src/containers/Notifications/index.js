import React,{Component} from "react";
import Notify from '../../components/Notification/index'
import profileSideBarHoc from '../../components/profileSideBarHoc'
 class Notification extends Component
{
    render()
    {
        return(
            <div className="staticProfile-box">
                <h2 className="cart-heading">My Notifications</h2>
                <Notify/>
            </div>
        )
    }
}

export default profileSideBarHoc(Notification);