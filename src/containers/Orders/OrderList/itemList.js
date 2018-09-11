import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import orderImage from './../../../assets/images/waste-plant.png';

    export default (props)=>
    {
        return (
            <div className="order-row">
                <div className="order-image"><img src={`https://s3.ap-south-1.amazonaws.com/aob-deverp/${props.imgSrc}`} /></div>
                <div className="order-detail">
                    <span>
                        {props.name}
                    </span>
                    <label>
                        ${props.price}
                    </label>
                </div>
                <div className="order-detail">
                    <span>Quantity</span>
                    <label>{props.quantity}</label>
                </div>
            </div>            
        )
    }



