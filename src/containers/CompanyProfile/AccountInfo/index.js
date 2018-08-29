import CompanyRegistration from '../../../components/Register/CompanyRegistration/companyRegistration';
import {connect} from 'react-redux'
import React,{Component} from 'react';
import {patchUpdateBasicInfo} from '../../../action/updateBasicInfo'
import {reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';
import withLoader from '../../../components/LoaderHoc'
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'
import {showMessage} from '../../../action/common';


class AccountInfo extends Component
{
    updateSubmitHandler=(values)=>
    {
  

    let requestObj={
        basicInfo:values,
        _id:localStorage.getItem('id')
    }
     this.props.dispatch(patchUpdateBasicInfo(requestObj,'',`${APPLICATION_BFF_URL}/businesscustomer/basicinfo`)).then((data)=>{
        if(data.data.message) {
          this.props.dispatch(showMessage("Successful Operation"));
          setTimeout(()=>{
            this.props.dispatch(showMessage(''));
          },6000);
        }
      }, (err)=>{
        if(err.message) {
          this.props.dispatch(showMessage(err.message));
          setTimeout(()=>{
            this.props.dispatch(showMessage(''));
          },6000);
        }
      });
  
    }
   
    render()
    {
        const {handleSubmit} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <CompanyRegistration/>
            <div className="form-btn-group">
              <Button variant="contained" type='submit' color='primary'>Save</Button>
            </div>
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




      