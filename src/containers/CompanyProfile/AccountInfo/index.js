import CompanyRegistration from '../../../components/Register/CompanyRegistration/companyRegistration';
import {connect} from 'react-redux'
import React,{Component} from 'react';
import {patchUpdateBasicInfo} from '../../../action/updateBasicInfo'
import {reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';
import withLoader from '../../../components/LoaderHoc'
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'


class AccountInfo extends Component
{
    updateSubmitHandler=(values)=>
    {
      console.log(this.props,"props fff")
  
    console.log(values,"aa");

    let requestObj={
        basicInfo:values,
        _id:localStorage.getItem('id')
    }
     this.props.dispatch(patchUpdateBasicInfo(requestObj,'',`${APPLICATION_BFF_URL}/businesscustomer/basicinfo`));
  
    }
   
    render()
    {
        const {handleSubmit} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <CompanyRegistration/>
            <Button variant="contained" color='primary'>Save</Button>
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
 let isLoading = state.basicInfodata.isFetching

 return {initialValues,isLoading}
}

export default connect(mapStateToProps)(withLoader(AccountInfo))




      