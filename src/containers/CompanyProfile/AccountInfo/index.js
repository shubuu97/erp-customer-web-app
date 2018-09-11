import AccountInfoComponent from '../../../components/CompanyProfile/AccountInfo/AccountInfo';
import {connect} from 'react-redux'
import React,{Component} from 'react';
import {patchUpdateBasicInfo} from '../../../action/updateBasicInfo'
import {reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';
import withLoader from '../../../components/LoaderHoc'
import {APPLICATION_BFF_URL} from '../../../constants/urlConstants'
import {showMessage} from '../../../action/common';
import asyncValidate from './validate';
import {postBasicInfoData} from '../../../action/basicInfoActions';
import CircularProgress from '@material-ui/core/CircularProgress'
import _get from 'lodash/get'

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
        
          setTimeout(()=>{
            this.props.handleTabSwitch(1);
          },2000);

          this.props.dispatch(showMessage({text: "Successfully Saved", isSuccess: true}));
          
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: true}));
          },2000);
        }
      }, (err)=>{
        if(err.message) {
          this.props.dispatch(showMessage({text: err.message, isSuccess: false}));
          setTimeout(()=>{
            this.props.dispatch(showMessage({text: "", isSuccess: false}));
          },6000);
        }
      });
  
    }
   componentWillMount()
   {
    this.props.dispatch(postBasicInfoData({  email: localStorage.getItem('email')  }, '', `${APPLICATION_BFF_URL}/user/logindata`))

   }
    render()
    {
        const {handleSubmit,submitting} = this.props;
        return(
            <div>
            <form onSubmit={handleSubmit(this.updateSubmitHandler)}>
            <AccountInfoComponent {...this.props} />
            <div className="form-btn-group">
              <Button disabled={this.props.isSaving} variant="contained" type='submit' color='primary' disabled={this.props.isSaving}>{!this.props.isSaving && 'SAVE AND CONTINUE'}{this.props.isSaving && <CircularProgress size={24} />}</Button>
            </div>
            </form>
            </div>
        )
    }
}

AccountInfo = reduxForm({
    form:'AccountInfo',
    enableReinitialize:true,
    keepDirtyOnReinitialize:true,
  asyncValidate}
)(AccountInfo);

function mapStateToProps(state)
{
 let initialValues = {};
 initialValues =  state.basicInfodata.basicInfoData
 let isLoading = state.basicInfodata.isFetching;
 let isSaving =   _get(state,'updateBasicInfo.isFetching',false)

 return {initialValues,isLoading,isSaving}
}

export default connect(mapStateToProps)(AccountInfo)




      