import CompanyRegistration from '../../../components/Register/CompanyRegistration/companyRegistration';
import {fetchBasicInfoData} from '../../../action/basicInfoActions';
import {connect} from 'react-redux'

import React,{Component} from 'react';

import {reduxForm} from 'redux-form';
import {fetchProfileFormData} from '../../../action/profileFormData'


class AccountInfo extends Component
{
    componentDidMount()
    {
        console.log("came")
        this.props.dispatch(fetchProfileFormData(`${process.env.APPLICATION_BFF_URL}/businesscustomer/register`));
        this.props.dispatch(fetchBasicInfoData({_id: "5b7514dfab851a001b83452a"},'',`${process.env.APPLICATION_BFF_URL}/businesscustomer/basicinfo/search`))
    }
    render()
    {
        return(
            <div>
            <CompanyRegistration/>
            </div>
        )
    }
}

AccountInfo = reduxForm({
    form:'AccountInfo'}
)(AccountInfo);

function mapStateToProps(state)
{
 let initialValues = {};
 initialValues =  state.basicInfodata.basicInfoData

 return {initialValues}
}

export default connect(mapStateToProps)(AccountInfo)




      