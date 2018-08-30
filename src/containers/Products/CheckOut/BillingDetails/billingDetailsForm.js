import React,{Component} from 'react';
import {reduxForm} from 'redux-form';
import DetailForm from './detailForm';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button'

 class BillingDetailsForm extends Component
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

 BillingDetailsForm = reduxForm({
    form:'BillingAddress'
})(BillingDetailsForm)


function mapStateToProps(state)
{
    return {}
}

export default connect(mapStateToProps)(BillingDetailsForm)