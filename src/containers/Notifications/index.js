import React,{Component} from "react";
import Progress from '../../components/common/Progress'
import profileSideBarHoc from '../../components/profileSideBarHoc'
 class Notification extends Component
{
    render()
    {
        return(
            <div style={{display:'flex',justifyContent:'center'}}>
             <Progress/>
            </div>
        )
    }
}

export default profileSideBarHoc(Notification);