import React,{Component} from "react";
import Notify from '../../components/Notification/index'
import profileSideBarHoc from '../../components/profileSideBarHoc'
 class Notification extends Component
{
    render()
    {
        return(
            <div style={{display:'flex',justifyContent:'center'}}>
             <Notify/>
            </div>
        )
    }
}

export default profileSideBarHoc(Notification);