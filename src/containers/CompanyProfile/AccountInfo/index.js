import CompanyRegistration from '../../../components/Register/CompanyRegistration/companyRegistration';
import {postBasicInfoData} from '../../../action/basicInfoActions';
import {connect} from 'react-redux'

import React,{Component} from 'react';
import {patchUpdateBasicInfo} from '../../../action/updateBasicInfo'
import {reduxForm} from 'redux-form';
import {fetchProfileFormData} from '../../../action/profileFormData'
import RaiseButton from 'material-ui/RaisedButton';


class AccountInfo extends Component
{
    updateSubmitHandler=(values)=>
    {
      console.log(this.props,"props fff")
  
    console.log(values,"aa");

    let requestObj={
        basicInfo:values,
        _id:"5b7514dfab851a001b83452a"
    }
     this.props.dispatch(patchUpdateBasicInfo(requestObj,'',`${process.env.APPLICATION_BFF_URL}/businesscustomer/basicinfo`));
  
    }
    componentDidMount()
    {
        console.log("came")
        this.props.dispatch(fetchProfileFormData(`${process.env.APPLICATION_BFF_URL}/businesscustomer/register`));
        this.props.dispatch(postBasicInfoData({_id: "5b7514dfab851a001b83452a"},'',`${process.env.APPLICATION_BFF_URL}/businesscustomer/basicinfo/search`))
    }
    render()
    {
        const {handleSubmit} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <CompanyRegistration/>
            <RaiseButton type={'submit'} primary={true} label="Save"/>
            </form>
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




      