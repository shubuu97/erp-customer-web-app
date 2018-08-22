import React,{Component} from 'react';
import AddressFormView from  '../../components/AddressFormView';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import ContactDetails from '../../components/ContactDetails';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'

class BasicInfoForm extends Component
{
submit = (values)=>
{
}
    render()
    {
        const {handleSubmit} = this.props;
        return(

            <form onSubmit={handleSubmit(this.submit)}>
            <AddressFormView {...this.props}/>
            <ContactDetails {...this.props}/>
            <RaisedButton  label ="submit" name="submit" type="submit"/>
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
    return { initialValues:{Name:'aman'}}
    
}

export default connect(mapStateToProps,{})(decoratedBasicInfoForm)

