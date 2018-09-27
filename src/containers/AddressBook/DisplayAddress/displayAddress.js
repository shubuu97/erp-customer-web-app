import React from 'react';
import { SIGABRT } from 'constants';

const displayAddress = (props) => {
    return (
        <div>
        <h3 style={addressTypeStyle}>ShippingAddress</h3>
            <div style={addressContainerStyle}>
                <div style={defaultBoxStyle}>
                    Default:&nbsp;&nbsp;&nbsp;<span style={brandName}>Amazon</span>
                </div>
                
                <div style={addressBoxStyle}>
                    <p style={addressFieldStyle}>{props.address}</p>
                    <p style={addressFieldStyle}>{props.city}</p>
                    <p style={addressFieldStyle}>{props.state}</p>
                    <p style={addressFieldStyle}>{props.country}</p>
                    <p style={addressFieldStyle}>{props.zip}</p>
                </div>

                <div style={buttonContainerStyle}>
                    <a style={editButtonStyle} href="#">Edit</a>
                    <a style={deleteButtonStyle} href="#">Delete</a>
                </div>
            </div>
        </div>
    )
}

const addressTypeStyle = {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '20px'
}

const addressContainerStyle = {
    border: '1px solid #C6C6C6',
    boxShadow: '0 1px 1px 0 #b5b5b5',
    borderRadius: '5px'
}

const defaultBoxStyle = {
    borderBottom: '1px solid #C6C6C6',
    padding: '10px',
    paddingRight: '100px',
}

const brandName = {
    fontWeight: 'bold'
}

const addressBoxStyle = {
    margin: '10px',
    paddingRight: '100px'
}

const addressFieldStyle = {
    lineHeight: '10px'
}

const buttonContainerStyle = {
    margin: '35px 100px 12px 10px ',
}

const editButtonStyle = {
    paddingRight: '10px',
    borderRight: '2px solid rgb(84,84,84)',
    lineHeight: '12px'
}

const deleteButtonStyle = {
    marginLeft: '10px',
    lineHeight: '12px'
}

export default displayAddress;