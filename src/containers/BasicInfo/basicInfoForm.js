import React,{Component} from 'react';
import AddressFormView from  '../../components/AddressFormView';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import ContactDetails from '../../components/ContactDetails';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField'

class BasicInfoForm extends Component
{
submit = (values)=>
{
console.log(values,"collectedValues")
}
    render()
    {
        const {handleSubmit} = this.props;
        return(

            <form onSubmit={handleSubmit(this.submit)}>
            <AddressFormView {...this.props}/>
            <ContactDetails {...this.props}/>
            <Button name="submit" type="submit" variant="contained" color='primary'>Submit</Button>
            </form>
        )
    }
}

const decoratedBasicInfoForm = reduxForm(
    {
        form:'BasicInfo',
        initialValues:{Name:'aman'}
    }
)(BasicInfoForm)



function mapStateToProps(state)
{
    console.log(state)
    return { initialValues:{Name:'aman'}}
    
}

export default connect(mapStateToProps,{})(decoratedBasicInfoForm)

