import React from "react";

const notification = (props) => {
    
    return (
        <div>
            <div>                
                <h5>Today</h5>
                <p> {props.children}</p>
                       
            </div>
        </div>
    )
}

export default notification;