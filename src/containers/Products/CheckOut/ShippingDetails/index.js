import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import DetailForm from '../BillingDetails/detailForm';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button'

 class ShippingDetailsForm extends Component
{
    render()
    {
        return(
            <div>
                <DetailForm/>
                <Button color="primary" variant='contained'>Submit </Button>
            </div>
        )
    }
}

ShippingDetailsForm = reduxForm({
    form:'ShippingForm'
})(ShippingDetailsForm)


function mapStateToProps(state)
{
    return {}
}

export default connect(mapStateToProps)(ShippingDetailsForm)