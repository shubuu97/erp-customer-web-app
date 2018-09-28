import React from 'react';
// import withLoader from '../../../components/LoaderHoc';
import addressEdit from '../../../assets/images/edit.png';
import checkGreen from '../../../assets/images/check-green.jpg';


const displayAddress = (props) => {
    let addType = ''
    if(props.addressType === 'shipping') {
        addType = "Shipping Address"
    } else if(props.addressType === 'billing') {
        addType = "Billing Address"
    }
    return (
        <div>
        <h3 className="addressbook-title">{addType}</h3>
            <div className="address-detail selected">                
                <h5>Idris Shaikh</h5>
                <p>{props.address}, {props.city}, {props.state}, {props.country}, {props.zip}</p>
                <img src={checkGreen}  className="address-select-img" />
                <img src={addressEdit} className="address-edit-img" />            
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