import React from 'react';

export default (props) => {
    return (
        <div className="order-row">
            <div className="order-image"><img src={props.imgSrc} /></div>
            <div className="order-detail">
                <span>
                    {props.name}
                </span>
                <label>
                    {props.currency} {props.price} per {props.weight}{props.weightUom}
                </label>
            </div>
            <div className="order-detail">
                <span>Quantity</span>
                <label>{props.quantity}</label>
            </div>
            <div className="order-detail">
                <span>Sub Total</span>
                <label>{parseFloat(props.quantity)*parseFloat(props.price)}</label>
            </div>
        </div>
    )
}



